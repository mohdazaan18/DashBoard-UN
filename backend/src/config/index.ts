import dotenv from "dotenv";

dotenv.config();

export const config = {
    PORT : process.env.PORT ? Number(process.env.PORT) : 5000,
    FRONTEND_URL : process.env.FRONTEND_URL || "http://localhost:5173",
}