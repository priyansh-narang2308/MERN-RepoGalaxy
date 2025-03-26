// COPIED FROM THE PASSPORT JS GIRHUB APP.JS

import passport from "passport";
import dotenv from "dotenv";
import UserModel from "../models/userModel.js";
import { Strategy as GitHubStrategy } from "passport-github2";

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.



dotenv.config();
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "https://mern-repogalaxy.onrender.com/api/auth/github/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        const user = await UserModel.findOne({ username: profile.username });

        // for signing up
        if (!user) {
            // for login 
            const newUser = new UserModel({
                name: profile.displayName,
                username: profile.username,
                profileUrl: profile.profileUrl,
                avatarUrl: profile.photos[0].value,
                likedProfiles: [],
                likedBy: [],
            });
            await newUser.save();
            done(null, newUser);
        }
        else {
            done(null, user);
        }

    }
));
