import { Request, Response } from "express";
import { getPopulationData } from "../services/population.services";
import { PopulationQueryParams } from "../types/population.types";

export const fetchPopulation = (req: Request, res: Response) => {
  try {
    const query = req.query as PopulationQueryParams;

    const result = getPopulationData(query);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching population data",
    });
  }
};