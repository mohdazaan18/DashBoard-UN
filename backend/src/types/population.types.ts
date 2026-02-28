import { GroupKey } from "../constants/groups";

// Raw row coming from CSV
export interface PopulationRecord {
  country: string;     // from "Region" column
  countryCode: string; // from "Country Code"
  year: number;
  population: number;
}

// Query parameters supported by API
export interface PopulationQueryParams {
  group?: GroupKey;
  countries?: string;
  startYear?: string;
  endYear?: string;
}

// Response format sent to frontend (Highcharts-ready)
export interface PopulationResponse {
  years: number[];
  series: {
    name: string;
    data: number[];
  }[];
}