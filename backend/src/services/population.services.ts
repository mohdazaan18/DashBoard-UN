import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { PopulationRecord, PopulationQueryParams, PopulationResponse } from "../types/population.types";
import { GROUPS } from "../constants/groups";

const ALL_VALID_COUNTRIES = new Set(Object.values(GROUPS).flat());

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

                if (!ALL_VALID_COUNTRIES.has(row["Region"])) return;

                populationData.push({
                    country: row["Region"],
                    countryCode: row["Country Code"],
                    year: Number(row["Year"]),
                    population: popNum,
                });
            })
            .on("end", () => {
                console.log(`CSV Loaded Successfully. Records: ${populationData.length}`);
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
        sort,
        aggregate
    } = query;

    // Safe year calculation (Charts fundamentally only read the latest year)
    const allYears = populationData.map(d => d.year);
    const end = endYear ? Number(endYear) : (allYears.length > 0 ? Math.max(...allYears) : 2020);
    const year = end;

    // Fast-path: If aggregate=false, bypass processing and return a flat list of allowed countries for the UI Dropdown.
    if (aggregate === "false") {
        let allowedCountries = new Set<string>();
        if (group) {
            group.split(",").forEach(gName => {
                if (GROUPS[gName]) {
                    GROUPS[gName].forEach(c => allowedCountries.add(c));
                }
            });
        } else {
            ALL_VALID_COUNTRIES.forEach(c => allowedCountries.add(c));
        }

        const resultSeries = Array.from(allowedCountries).map(country => ({
            name: country,
            data: []
        }));

        return { years: [year], series: resultSeries };
    }

    // Prepare chart values mapping
    let chartValues: { name: string, value: number }[] = [];

    // Mode 1: User explicitly selected Countries
    if (countries) {
        let selectedCountries = countries.split(",");

        // Strict Intersection: Keep it perfectly aligned to the regions
        if (group) {
            const allowedCountries = new Set<string>();
            group.split(",").forEach(gName => {
                if (GROUPS[gName]) GROUPS[gName].forEach(c => allowedCountries.add(c));
            });
            selectedCountries = selectedCountries.filter(c => allowedCountries.has(c));
        }

        chartValues = selectedCountries.map(country => {
            const found = populationData.find(d => d.country === country && d.year === year);
            return { name: country, value: found ? found.population : 0 };
        });
    }
    // Mode 2: User ONLY selected Regions (Filter to Top Countries within those Continents)
    else if (group) {
        const allowedCountries = new Set<string>();
        group.split(",").forEach(gName => {
            if (GROUPS[gName]) GROUPS[gName].forEach(c => allowedCountries.add(c));
        });

        // Get population for all countries in the selected regions
        chartValues = Array.from(allowedCountries).map(country => {
            const found = populationData.find(d => d.country === country && d.year === year);
            return { name: country, value: found ? found.population : 0 };
        });
    }
    // Mode 3: Nothing selected (0 Regions). Return Empty State.
    else {
        return {
            years: [year],
            series: []
        };
    }

    // Apply Sort and Limit universally for Mode 1 & 2
    if (sort === "asc") {
        chartValues.sort((a, b) => a.value - b.value);
    } else {
        // Default to descending (highest population first) to ensure limits grab the most relevant countries
        chartValues.sort((a, b) => b.value - a.value);
    }
    if (limit) chartValues = chartValues.slice(0, Number(limit));

    return {
        years: [year],
        series: chartValues.map(d => ({ name: d.name, data: [d.value] }))
    };
};