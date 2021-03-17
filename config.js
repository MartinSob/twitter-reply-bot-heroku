const path = require('path')
const dotenv = require('dotenv')
require('dotenv').config();

dotenv.config({ path: './config.env' })

module.exports = {
    consumer_key : process.env.API_KEY,
    consumer_secret : process.env.API_SECRET_KEY,
    access_token : process.env.ACCESS_TOKEN,
    access_token_secret : process.env.ACCESS_TOKEN_SECRET
}