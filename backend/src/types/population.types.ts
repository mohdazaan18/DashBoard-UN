import { GroupKey } from "../constants/groups";

export interface PopulationRecord {

  country: string;

  countryCode: string;

  year: number;

  population: number;

}

export interface PopulationQueryParams {

  group?: GroupKey;

  countries?: string;

  startYear?: string;

  endYear?: string;

  limit?: string;

  sort?: "asc" | "desc";

  aggregate?: string;

}

export interface PopulationResponse {
  years: number[];
  series: {
    name: string;
    data: number[];
  }[];
}