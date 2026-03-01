import { GROUPS } from "./backend/src/constants/groups";
console.log(Object.values(GROUPS).flat().length);
const allCountries = new Set(Object.values(GROUPS).flat());
console.log("Has India?", allCountries.has("India"));
