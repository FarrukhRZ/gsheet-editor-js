Sure! Below is the updated README with the added prerequisite instructions for creating a service account in Google Cloud Platform (GCP) and adding it as an editor to your Google Sheet.

# Google Sheets Automation

This module provides functions to interact with Google Sheets using the Google Sheets API. It includes the following functionalities:
- Authentication with Google Sheets API
- Reading data from a cell
- Writing data to a cell
- Batch writing data to multiple cells
- Clearing data from specified cell ranges

## Prerequisites
- Create a service account in Google Cloud Platform (GCP) and download the private key.
- Share your Google Sheet with the service account's email, giving it editor permissions.

### Steps to Create a Service Account in GCP:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Select your project or create a new one.
3. Navigate to the **IAM & Admin** section and click on **Service accounts**.
4. Click **+ CREATE SERVICE ACCOUNT**.
5. Enter the service account name, ID and description, then click **CREATE AND CONTINUE**.
6. Assign the **Editor** role to this service account and click **CONTINUE**.
7. Click **DONE**.
8. Click the newly created service account to open its settings.
9. Navigate to the **KEYS** tab.
10. Click **ADD KEY** and select **Create new key**.
11. Choose the **JSON** key type and click **Create**. This will download the private key file. Store this securely as you will need information from this file to authenticate.

### Steps to Add Service Account as Editor to Your Google Sheet:
1. Open your Google Sheet.
2. Click **Share** in the top-right corner.
3. In the "Share with people and groups" window, enter the service account's email address.
4. Set the permissions to **Editor**.
5. Click **Send**.

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
