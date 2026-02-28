import type { PopulationResponse } from "../types/population.types";

const BASE_URL = "http://localhost:5000/api/population";

export const fetchPopulation = async (
  group?: string,
  limit?: number | "",
  sort?: "asc" | "desc" | ""
): Promise<PopulationResponse> => {
  const params = new URLSearchParams();
  if (group) params.append("group", group);
  if (limit) params.append("limit", limit.toString());
  if (sort) params.append("sort", sort);

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

export const fetchTopCountries = async (
  sort?: "asc" | "desc" | "",
  limit?: number | "",
  group?: string
): Promise<PopulationResponse> => {
  const params = new URLSearchParams();
  // Ensure the top countries pie chart always has a max slice count
  params.append("limit", limit !== "" && limit !== undefined ? limit.toString() : "10");
  // Default to highest population descending if not specified
  params.append("sort", sort !== "" && sort !== undefined ? sort : "desc");
  if (group) params.append("group", group);

  const res = await fetch(`${BASE_URL}?${params.toString()}`);
  return res.json();
};