require('dotenv').config();

const prefix ='!!';
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
    prefix,
    MONGODB_URI,
    DISCORD_TOKEN
}