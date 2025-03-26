import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import exploreRoutes from "./routes/exploreRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);


const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});