/**
 * Google Apps Script — Servicer Information Update Collector
 * ─────────────────────────────────────────────
 * SETUP INSTRUCTIONS:
 *
 * 1. Go to https://script.google.com and create a new project.
 * 2. Paste this entire file into the editor (replacing any existing code).
 * 3. Click "Save".
 * 4. Click "Deploy" → "New deployment".
 *    - Type: "Web app"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"  ← required so your form can POST to it
 * 5. Click "Deploy" and copy the Web App URL.
 * 6. Paste that URL into index.html where it says YOUR_APPS_SCRIPT_URL_HERE.
 *
 * GOOGLE SHEET SETUP:
 * - Open a new Google Sheet.
 * - Rename "Sheet1" to "Responses" (or update SHEET_NAME below).
 * - Copy the Sheet ID from its URL:
 *     https://docs.google.com/spreadsheets/d/SHEET_ID_IS_HERE/edit
 * - Paste that ID into SPREADSHEET_ID below.
 * - The script will auto-create headers on the first run.
 * ─────────────────────────────────────────────
 */

// ─── CONFIG ───────────────────────────────────────────────────
const SHEET_NAME    = 'Responses';
const SPREADSHEET_ID = '';  // Paste your Google Sheet ID here (the long string in the sheet's URL)
                            // e.g. '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms'
                            // Required if this is a standalone script (created at script.google.com)
const NOTIFY_EMAIL  = '';   // Optional: your email address to get notified on each submission
                            // Leave as '' to disable notifications
// ──────────────────────────────────────────────────────────────

const HEADERS = [
  'Timestamp',
  'Submitted At (ISO)',
  // Company info
  'Company Name',
  'Address 1',
  'Address 2',
  'City',
  'State',
  'ZIP',
  'Phone (Main)',
  'Phone (Secondary)',
  'Email — Work Orders',
  'Email — Work Orders CC',
  'Contact 1',
  'Contact 2',
  // Network
  'Continue in Network',
  '# Additional Locations',
  'Location 1 Address',
  'Location 1 Email',
  'Location 2 Address',
  'Location 2 Email',
  'Geographic Area Served',
  // Products
  'Product: Power Scooters',
  'Product: Electric Wheelchairs',
  'Product: Lift Recliners',
  'Product: Vehicle Lifts',
  'Product: Residential Ramps',
  'Product: Stair Lifts',
  'Product: Rx Power Mobility (rcv/assem/deliver)',
  'Product: Rx Lift Recliners (rcv/assem/deliver)',
  'Product: Aging-in-Place Install',
  'Product: Other',
  'Handles Oversized Freight',
  // Brands
  'Brand: Amramp',
  'Brand: Bruno',
  'Brand: Drive Medical',
  'Brand: Feather',
  'Brand: Golden Technology',
  'Brand: Harmar',
  'Brand: Invacare',
  'Brand: Merits',
  'Brand: Permobile',
  'Brand: Pride Mobility',
  'Brand: Other',
  // Operations
  'Years in Business',
  'Service Type',
  'Business Hours',
  'Shop Rate / Hour ($)',
  'Shop Rate Increment',
  'Home Trip Rate ($)',
  'Home Rate / Hour ($)',
  'Home Rate Increment',
  'Additional Fees',
  // Qualifications
  'Industry Certifications',
  '# Technicians',
  'Technician Certifications',
  'Insurance',
  // Partnership
  'Partner Interest',
  'Partner Contact',
  'Additional Info',
];

/**
 * doPost — called when the form submits via fetch()
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    appendRow(data);

    if (NOTIFY_EMAIL) {
      sendNotification(data);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log('Error in doPost: ' + err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * doGet — simple health-check endpoint
 * Visit the Web App URL in a browser to confirm it's deployed.
 */
function doGet() {
  return ContentService
    .createTextOutput('✓ Form collector is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * appendRow — writes one submission to the sheet
 */
function appendRow(data) {
  const ss    = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

  // Auto-create headers if the sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#0f0e0d')
      .setFontColor('#f5f2ec');
    sheet.setFrozenRows(1);
  }

  const row = [
    new Date(),                              // Timestamp (server local time)
    data.submittedAt          || '',         // ISO timestamp from browser
    // Company info
    data.companyName          || '',
    data.address1             || '',
    data.address2             || '',
    data.city                 || '',
    data.state                || '',
    data.zip                  || '',
    data.phoneMain            || '',
    data.phoneSecondary       || '',
    data.emailWorkOrders      || '',
    data.emailWorkOrdersCC    || '',
    data.contact1             || '',
    data.contact2             || '',
    // Network
    data.continueNetwork      || '',
    data.numLocations         || '',
    data.loc1                 || '',
    data.loc1_email           || '',
    data.loc2                 || '',
    data.loc2_email           || '',
    data.geoArea              || '',
    // Products
    data.prod_scooter         || '',
    data.prod_ewheelchair     || '',
    data.prod_liftchair       || '',
    data.prod_vehiclelift     || '',
    data.prod_ramp            || '',
    data.prod_stairlift       || '',
    data.prod_rxpower         || '',
    data.prod_rxlift          || '',
    data.prod_aginplace       || '',
    data.prod_other           || '',
    data.oversized            || '',
    // Brands
    data.brand_amramp         || '',
    data.brand_bruno          || '',
    data.brand_drive          || '',
    data.brand_feather        || '',
    data.brand_golden         || '',
    data.brand_harmar         || '',
    data.brand_invacare       || '',
    data.brand_merits         || '',
    data.brand_permobile      || '',
    data.brand_pride          || '',
    data.brand_other          || '',
    // Operations
    data.yearsInBusiness      || '',
    data.serviceType          || '',
    data.hours                || '',
    data.shopRatePerHour      || '',
    data.shopRateIncrement    || '',
    data.homeTrip             || '',
    data.homeRatePerHour      || '',
    data.homeRateIncrement    || '',
    data.additionalFees       || '',
    // Qualifications
    data.industryCerts        || '',
    data.numTechnicians       || '',
    data.techCerts            || '',
    data.insurance            || '',
    // Partnership
    data.partnerInterest      || '',
    data.partnerContact       || '',
    data.additionalInfo       || '',
  ];

  sheet.appendRow(row);

  // Auto-resize columns for readability
  sheet.autoResizeColumns(1, HEADERS.length);
}

/**
 * sendNotification — emails you when a new response arrives
 */
function sendNotification(data) {
  const subject = `New servicer update from ${data.companyName || 'Unknown Company'}`;
  const body = `
New servicer information update received:

Company:          ${data.companyName       || '—'}
Address:          ${[data.address1, data.address2, data.city, data.state, data.zip].filter(Boolean).join(', ') || '—'}
Phone (Main):     ${data.phoneMain         || '—'}
Work Orders Email:${data.emailWorkOrders   || '—'}
Contact 1:        ${data.contact1          || '—'}
Continue Network: ${data.continueNetwork   || '—'}
Service Type:     ${data.serviceType       || '—'}
Years in Biz:     ${data.yearsInBusiness   || '—'}
Partner Interest: ${data.partnerInterest   || '—'}
Submitted:        ${data.submittedAt       || '—'}

View all responses in your Google Sheet.
  `.trim();

  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}
