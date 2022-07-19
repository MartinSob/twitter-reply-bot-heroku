import { Client, auth } from "twitter-api-sdk";
import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: './config.env' })

const app = express();

const authClient = new auth.OAuth2User({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    // Localhost URLs are valid as callbacks as long as they are added in the allowed callback URLs
    callback: "http://127.0.0.1:3000/callback",
    // Both tweet.read and users.read are mandatory for OAuth2 authentication to work
    scopes: ["tweet.read", "tweet.write", "users.read"],
});

let client = new Client(authClient);

const STATE = "callback-state";

app.get("/callback", async function (req, res) {
    try {
        const { code, state } = req.query;
        /**
         * code: 'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB'
         * state: 'callback-state'
         */
        if (state !== STATE) return res.status(500).send("State isn't matching");
        const response = await authClient.requestAccessToken(code);
        /**
         * response: {
         *      token: {
         *          token_type: 'bearer',
         *          access_token: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
         *          scope: 'tweet.write tweet.read',
         *          expires_at: '2022 - 07 - 20T00: 06: 15.965Z'
         *      }
         * }
        */

        res.redirect("/tweets");
    } catch (error) {
        console.log(error);
    }
});

app.get("/login", async function (req, res) {
    const authUrl = authClient.generateAuthURL({
        state: STATE, // Used to validate in the callback
        code_challenge_method: "s256",
    });
    res.redirect(authUrl);
});

app.get("/tweets", async function (req, res) {
    await client.tweets.createTweet({
        text: 'Thanks for logging in!'
    })
});

app.listen(3000, () => {
    console.log(`Go here to login: http://127.0.0.1:3000/login`);
});