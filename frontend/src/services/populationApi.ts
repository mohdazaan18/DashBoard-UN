import type { PopulationResponse } from "../types/population.types";

const BASE_URL = "http://localhost:5000/api/population";

export const fetchPopulation = async (
  group?: string,
  limit?: number | "",
  sort?: "asc" | "desc" | "",
  aggregate?: boolean
): Promise<PopulationResponse> => {
  const params = new URLSearchParams();
  if (group) params.append("group", group);
  if (limit) params.append("limit", limit.toString());
  if (sort) params.append("sort", sort);
  if (aggregate === false) params.append("aggregate", "false");

  const res = await fetch(`${BASE_URL}${params.toString() ? `?${params.toString()}` : ""}`);
  return res.json();
};

export const fetchCountries = async (
  countries: string[],
  group?: string,
  limit?: number | "",
  sort?: "asc" | "desc" | ""
): Promise<PopulationResponse> => {
  const params = new URLSearchParams();
  if (countries.length > 0) params.append("countries", countries.join(","));
  if (group) params.append("group", group);
  if (limit) params.append("limit", limit.toString());
  if (sort) params.append("sort", sort);

  const res = await fetch(`${BASE_URL}${params.toString() ? `?${params.toString()}` : ""}`);
  return res.json();
};

// fetchTopCountries removed since it is redundant