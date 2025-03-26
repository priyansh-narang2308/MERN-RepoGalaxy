import express from "express"
import { getProfileAndRepos } from "../controllers/userController.js";

const router=express.Router()

router.get("/profile/:username",getProfileAndRepos)
// TODO:=>GET LIKES(LIKE WHO IS LIKING OUT PROFILE)
//TODO=>POST  like a profile


export default router