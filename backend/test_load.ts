import { loadPopulationData, getPopulationData } from "./src/services/population.services";
import { GROUPS } from "./src/constants/groups";
console.log("GROUPS length:", Object.keys(GROUPS).length);
console.log("ALL_VALID_COUNTRIES size:", new Set(Object.values(GROUPS).flat()).size);

loadPopulationData().then(() => {
    const data = getPopulationData({ countries: "India" });
    console.log(JSON.stringify(data));
});
