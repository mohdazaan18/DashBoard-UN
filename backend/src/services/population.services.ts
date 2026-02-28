import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { PopulationRecord, PopulationQueryParams, PopulationResponse } from "../types/population.types.ts";
import { GROUPS } from "../constants/groups.ts";

let populationData: PopulationRecord[] = [];

/**
 * Load CSV once at server startup
 */
export const loadPopulationData = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, "../../data/population.csv");

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        // Ignore invalid rows
        if (row["Population"] === "None") return;
        if (row["Region"] === "WORLD") return;

        populationData.push({
          country: row["Region"],
          countryCode: row["Country Code"],
          year: Number(row["Year"]),
          population: Number(row["Population"]),
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
  const { group, countries, startYear, endYear } = query;

  let selectedCountries: string[] = [];

  // Priority: countries > group > all
  if (countries) {
    selectedCountries = countries.split(",");
  } else if (group && GROUPS[group]) {
    selectedCountries = [...GROUPS[group]];
  } else {
    selectedCountries = [...new Set(populationData.map((d) => d.country))];
  }

  const start = startYear ? Number(startYear) : Math.min(...populationData.map(d => d.year));
  const end = endYear ? Number(endYear) : Math.max(...populationData.map(d => d.year));

  // Filter data
  const filtered = populationData.filter(
    (record) =>
      selectedCountries.includes(record.country) &&
      record.year >= start &&
      record.year <= end
  );

  // Get unique sorted years
  const years = [...new Set(filtered.map((d) => d.year))].sort(
    (a, b) => a - b
  );

  // Group by country
  const series = selectedCountries.map((country) => {
    const countryData = years.map((year) => {
      const found = filtered.find(
        (d) => d.country === country && d.year === year
      );
      return found ? found.population : 0;
    });

    return {
      name: country,
      data: countryData,
    };
  });

  return { years, series };
};