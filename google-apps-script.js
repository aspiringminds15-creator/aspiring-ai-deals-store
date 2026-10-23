/*
  Paste this into Extensions > Apps Script inside the "Aspiring AI Deals Subscribers"
  Google Sheet, then deploy it as a Web App. Put the resulting Web App URL in
  subscriberEndpoint inside script.js.
*/
const SHEET_NAME = 'Subscribers';

function doPost(event) {
  const email = String(event.parameter.email || '').trim().toLowerCase();
  const source = String(event.parameter.source || 'Aspiring AI Deals website');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return response({ ok: false, message: 'Please provide a valid email address.' });
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const emails = sheet.getRange(5, 1, Math.max(sheet.getLastRow() - 4, 1), 1).getDisplayValues().flat();
  if (!emails.includes(email)) {
    sheet.appendRow([email, new Date(), 'Subscribed', source]);
  }

  return response({ ok: true });
}

function response(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
