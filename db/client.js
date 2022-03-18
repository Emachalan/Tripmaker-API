require("dotenv").config();
const Pool = require("pg").Pool;
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const db = "postgres://uuefwaxyjzxkaq:5c0f217373a57270c9bb55941038ee232e2fa9783b19bdcd118d016e773937dc@ec2-18-214-238-28.compute-1.amazonaws.com:5432/d4ldorb3bnubtj"

const client = new Pool({
    connectionString: isProduction ? db : connectionString,
    ssl: isProduction ? { rejectUnauthorized: false } : false
});

client.connect();

module.exports = client;