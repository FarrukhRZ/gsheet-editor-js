const { google } = require("googleapis");
const { SHEET_ID, SERVICE_EMAIL, ACCESS_SCOPES, EMAIL_PKEY } = require("./constants");

const authenticateGoogleSheetsClient = async () => {
    const client = new google.auth.JWT(
        SERVICE_EMAIL,
        null,
        EMAIL_PKEY,
        ACCESS_SCOPES,
        null
    );
    await client.authorize();
    return google.sheets({
        version: "v4",
        auth: client,
    });
};

const readFromCellInSpreadsheet = async (
    client,
    spreadsheetId = SHEET_ID,
    range
) => {
    return await client.spreadsheets.values.get({ spreadsheetId, range });
};

const writeToCellInSpreadsheet = async (
    client,
    spreadsheetId = SHEET_ID,
    range,
    value
) => {
    return await client.spreadsheets.values.update({
        spreadsheetId: spreadsheetId,
        range: range,
        resource: { values: value },
        valueInputOption: "USER_ENTERED",
    });
};

const batchWriteToCellInSpreadsheet = async (
    client,
    spreadsheetId = SHEET_ID,
    range,
    value
) => {
    for (let i = 0; i < range.length; i++) {
        await writeToCellInSpreadsheet(client, spreadsheetId, range[i], value[i]);
    }
};


const clearSheetCells = async (
    client,
    spreadsheetId = SHEET_ID,
    range
) => {
    try {
        const response = await client.spreadsheets.values.clear({
            spreadsheetId: spreadsheetId,
            range: range,
        });
        console.log(`Cleared range: ${range}`);
        return response;
    } catch (error) {
        console.error(`Error clearing range: ${range}`, error);
        throw error;
    }
};

module.exports = {
    authenticateGoogleSheetsClient,
    readFromCellInSpreadsheet,
    writeToCellInSpreadsheet,
    batchWriteToCellInSpreadsheet,
    clearSheetCells,
};
