Great! Here's the detailed README with the updated `constants.js` configuration:

# Google Sheets Automation

This module provides functions to interact with Google Sheets using the Google Sheets API. It includes the following functionalities:
- Authentication with Google Sheets API
- Reading data from a cell
- Writing data to a cell
- Batch writing data to multiple cells
- Clearing data from specified cell ranges

## Installation

Install the necessary packages using npm:

```bash
npm install googleapis dotenv
```

## Setup

### Environment Variables

Create a `.env` file in your project root directory and add the following environment variables:

```plaintext
SHEET_ID=your-google-sheet-id
SERVICE_EMAIL=your-service-account-email
EMAIL_PKEY=your-private-key
```

### Constants Configuration

Create a `constants.js` file to read your environment variables and store your configuration constants required for Google Sheets API interaction:

```javascript
// constants.js
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
```

## Usage

### 1. Authenticate Google Sheets Client

Authenticate the Google Sheets client using the provided service account details.

```javascript
const { authenticateGoogleSheetsClient } = require('./path-to-your-module');

(async () => {
    const client = await authenticateGoogleSheetsClient();
    // Now you can use the authenticated client
})();
```

### 2. Read Data from a Cell

Reads data from a specified cell range.

```javascript
const { readFromCellInSpreadsheet } = require('./path-to-your-module');

(async () => {
    const client = await authenticateGoogleSheetsClient();
    const response = await readFromCellInSpreadsheet(client, 'your-spreadsheet-id', 'Sheet1!A1');
    console.log(response.data);
})();
```

### 3. Write Data to a Cell

Writes data to a specified cell range.

```javascript
const { writeToCellInSpreadsheet } = require('./path-to-your-module');

(async () => {
    const client = await authenticateGoogleSheetsClient();
    const response = await writeToCellInSpreadsheet(client, 'your-spreadsheet-id', 'Sheet1!A1', [['Hello, World!']]);
    console.log(response.data);
})();
```

### 4. Batch Write Data to Multiple Cells

Writes data to multiple specified cell ranges in a batch process.

```javascript
const { batchWriteToCellInSpreadsheet } = require('./path-to-your-module');

(async () => {
    const client = await authenticateGoogleSheetsClient();
    const ranges = ['Sheet1!A1', 'Sheet1!B1'];
    const values = [['Hello'], ['World']];
    const response = await batchWriteToCellInSpreadsheet(client, 'your-spreadsheet-id', ranges, values);
    console.log(response);
})();
```

### 5. Clear Data from Specified Cell Ranges

Clears data from the specified cell ranges.

```javascript
const { clearSheetCells } = require('./path-to-your-module');

(async () => {
    const client = await authenticateGoogleSheetsClient();
    const response = await clearSheetCells(client, 'your-spreadsheet-id', 'Sheet1!A1:B2');
    console.log(response);
})();
```

## Module Exports

```javascript
module.exports = {
    authenticateGoogleSheetsClient,
    readFromCellInSpreadsheet,
    writeToCellInSpreadsheet,
    batchWriteToCellInSpreadsheet,
    clearSheetCells,
};
```

## Notes

- Ensure the service account used has access to the Google Sheet you are interacting with.
- The `spreadsheetId` parameter can default to the `SHEET_ID` specified in your `constants.js`, or you can provide it explicitly for each function call.
- The `EMAIL_PKEY` should be the private key for the service account, typically provided in JSON format, and should be handled securely.

By properly setting up and using these functions, you can easily automate various tasks related to Google Sheets.