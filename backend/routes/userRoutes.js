import express from "express"
import { getLikes, getProfileAndRepos, likeProfile } from "../controllers/userController.js";
import {ensureAuthenticated} from "../middleware/ensureAuth.js"

const router=express.Router()

router.get("/profile/:username",getProfileAndRepos)
// TODO:=>GET LIKES(LIKE WHO IS LIKING OUT PROFILE)

router.get("/likes",ensureAuthenticated,getLikes)
//TODO=>POST  like a profile

router.post("/like/:username",ensureAuthenticated,likeProfile)


export default router