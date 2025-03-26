import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport"
import session from "express-session"

import "./passport/githubAuth.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js";
import exploreRoutes from "./routes/exploreRoutes.js";

import connectDb from "./config/connectDb.js";

dotenv.config();
const app = express();

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes)
app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);


const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    connectDb();
    console.log(`Server is listening on PORT: ${PORT}`);
});