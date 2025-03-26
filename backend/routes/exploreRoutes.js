import express from "express"
import { explorePopREpos } from "../controllers/exploreController.js";

const router=express.Router()

router.get("/repos/:language",explorePopREpos)

export default router