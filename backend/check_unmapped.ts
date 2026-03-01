import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { GROUPS } from "./src/constants/groups";

const ALL_VALID = new Set(Object.values(GROUPS).flat());
const csvCountries = new Set<string>();

fs.createReadStream(path.join(__dirname, "data/population.csv"))
    .pipe(csv())
    .on("data", (row) => {
        if (row["Population"] === "None" || !row["Population"]) return;
        const popNum = Number(row["Population"]);
        if (isNaN(popNum)) return;
        csvCountries.add(row["Region"]);
    })
    .on("end", () => {
        const unmapped = [...csvCountries].filter(c => !ALL_VALID.has(c));
        const missingInCsv = [...ALL_VALID].filter(c => !csvCountries.has(c));
        console.log("Unmapped in CSV:", unmapped);
        console.log("Missing from CSV:", missingInCsv);

        console.log("Is India in CSV?", csvCountries.has("India"));
        console.log("Is India in GROUPS?", ALL_VALID.has("India"));
        console.log("Is China in CSV?", csvCountries.has("China"));
        console.log("Is China in GROUPS?", ALL_VALID.has("China"));
    });
