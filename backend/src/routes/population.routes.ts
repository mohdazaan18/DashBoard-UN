import { Router } from "express";
import { fetchPopulation } from "../controllers/population.controller";

const router = Router();

router.get("/population", fetchPopulation);

export default router;