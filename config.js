/** Shared config for application; can be req'd many places. */

require("dotenv").config();

const SECRET = process.env.SECRET_KEY || "test";

const BCRYPT_WORK_FACTOR = 10;

const PORT = 3001;

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = `${process.env.DATABASE_URL}/agility_test`;
} else {
  DB_URI = `${process.env.DATABASE_URL}` || "agility";
}

console.log("Using database", DB_URI);

module.exports = {
  SECRET,
  PORT,
  DB_URI,
  BWF:BCRYPT_WORK_FACTOR
};
