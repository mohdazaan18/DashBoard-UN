import express from "express";
import cors from "cors";
import populationRoutes from "./routes/population.routes";
import { loadPopulationData } from "./services/population.services";
import { config } from "./config";

const app = express();
const PORT = config.PORT;

app.use(cors({
    origin: config.FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());

app.use("/api", populationRoutes);

const startServer = async () => {
    try {
        await loadPopulationData();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();