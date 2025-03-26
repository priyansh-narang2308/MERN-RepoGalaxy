import express from "express";
import { explorePopREpos } from "../controllers/exploreController.js";
import { ensureAuthenticated } from "../middleware/ensureAuth.js";

const router = express.Router();

router.get("/repos/:language", ensureAuthenticated, explorePopREpos);

export default router;