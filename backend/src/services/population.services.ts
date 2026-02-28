import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { PopulationRecord, PopulationQueryParams, PopulationResponse } from "../types/population.types";
import { GROUPS } from "../constants/groups";

let populationData: PopulationRecord[] = [];

/**
 * Load CSV once at server startup
 */
export const loadPopulationData = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, "../../data/population.csv");
        console.log("Reading CSV from:", filePath);
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                // Ignore invalid rows

                if (row["Population"] === "None" || !row["Population"]) return;

                const popNum = Number(row["Population"]);
                if (isNaN(popNum)) return;

                if (row["Region"] === "WORLD") return;

                populationData.push({
                    country: row["Region"],
                    countryCode: row["Country Code"],
                    year: Number(row["Year"]),
                    population: popNum,
                });
            })
            .on("end", () => {
                console.log("CSV Loaded Successfully");                
                resolve();
            })
            .on("error", (error) => reject(error));
    });
};

/**
 * Main filtering function
 */

export const getPopulationData = (
    query: PopulationQueryParams
): PopulationResponse => {

    const {
        group,
        countries,
        startYear,
        endYear,
        limit,
        sort
    } = query;

    let selectedCountries: string[] = [];


    // Countries priority

    if (countries) {

        selectedCountries = countries.split(",");

    }
    else if (group && GROUPS[group]) {

        selectedCountries = [...GROUPS[group]];

    }
    else {

        selectedCountries = [
            ...new Set(
                populationData
                    .map(d => d.country)
                    .filter(Boolean)
            )

        ] as string[];

    }


    // Safe year calculation

    const allYears =
        populationData.map(d => d.year);

    const start =
        startYear
            ? Number(startYear)
            : Math.min(...allYears);

    const end =
        endYear
            ? Number(endYear)
            : Math.max(...allYears);


    // Filtering

    const filtered =
        populationData.filter(record =>

            record.country &&
            selectedCountries.includes(record.country) &&

            record.year >= start &&
            record.year <= end

        );


    // Pie Chart logic

    if (limit || sort) {

        const year = end;

        let countryValues =
            selectedCountries.map(country => {

                const found =
                    populationData.find(d =>

                        d.country === country &&
                        d.year === year

                    );

                return {

                    country,

                    value: found
                        ? found.population
                        : 0

                };

            });


        if (sort === "asc") {

            countryValues.sort(
                (a, b) => a.value - b.value
            );

        }

        if (sort === "desc") {

            countryValues.sort(
                (a, b) => b.value - a.value
            );

        }


        const limited =
            limit
                ? countryValues.slice(
                    0,
                    Number(limit)
                )
                : countryValues;


        return {

            years: [year],

            series:

                limited.map(d => ({

                    name: d.country,

                    data: [d.value]

                }))

        };

    }


    // Normal chart

    const years =
        [...new Set(filtered.map(d => d.year))]
            .sort((a, b) => a - b);


    const series =
        selectedCountries.map(country => {

            const countryData =
                years.map(year => {

                    const found =
                        filtered.find(d =>

                            d.country === country &&
                            d.year === year

                        );

                    return found
                        ? found.population
                        : 0;

                });


            return {

                name: country,

                data: countryData

            };

        });


    return { years, series };

};