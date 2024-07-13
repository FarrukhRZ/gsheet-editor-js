require("dotenv").config();

const SHEET_ID = process.env.SHEET_ID;
const SERVICE_EMAIL = process.env.SERVICE_EMAIL;
const EMAIL_PKEY = process.env.EMAIL_PKEY;
const ACCESS_SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

module.exports = {
    SHEET_ID,
    SERVICE_EMAIL,
    ACCESS_SCOPES,
    EMAIL_PKEY,
};