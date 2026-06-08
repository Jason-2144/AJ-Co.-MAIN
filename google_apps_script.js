function doPost(e) {
  try {
    // Handling CORS preflight just in case, though Web Apps usually handle it.
    // Ensure we parse the body correctly
    const body = JSON.parse(e.postData.contents);
    
    // Create or Open Spreadsheet
    // Replace YOUR_SPREADSHEET_ID_HERE with the ID of your Google Sheet
    // OR, you can open by active spreadsheet if bound to one
    // const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const sheetIds = "YOUR_SPREADSHEET_ID_HERE"; 
    // Example: const sheet = SpreadsheetApp.openById(sheetIds).getActiveSheet();

    // To just create a new sheet dynamically if not exists (for this demo script)
    let ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      // Create a standalone sheet if none is active (this will be in the owner's drive)
      // Usually, you should use SpreadsheetApp.openById('id') here.
       throw new Error("Link a spreadsheet or use SpreadsheetApp.openById('SPREADSHEET_ID')");
    }
    
    let sheet = ss.getSheetByName("Leads");
    if (!sheet) {
      sheet = ss.insertSheet("Leads");
      // Add Headers
      sheet.appendRow([
        "Timestamp",
        "Lead ID",
        "Full Name",
        "Work Email",
        "Company Name",
        "Company Size",
        "Situation",
        "Challenge",
        "Status"
      ]);
      // Freeze header
      sheet.setFrozenRows(1);
    }
    
    // Generate Lead ID
    // Count rows to generate ID (e.g., if there are 2 rows, next is 2)
    const lr = sheet.getLastRow();
    const currentNumber = lr === 0 ? 1 : lr;
    const leadId = `AJC-${currentNumber.toString().padStart(4, '0')}`;
    
    // Current Timestamp
    const timestamp = new Date();
    
    // Default Status
    const status = "NEW LEAD";
    
    // Add row
    sheet.appendRow([
      timestamp,
      leadId,
      body.fullName,
      body.workEmail,
      body.companyName,
      body.companySize,
      body.situation,
      body.challenge,
      status
    ]);
    
    // Send Email
    // Replace with your actual email address
    const recipientEmail = "YOUR_EMAIL@DOMAIN.COM"; // <-- SET YOUR EMAIL HERE
    
    const subject = `🚀 New AJ & Co Strategy Call Request`;
    const message = `New Strategy Call Submission

Lead ID:
${leadId}

Full Name:
${body.fullName}

Work Email:
${body.workEmail}

Company:
${body.companyName}

Company Size:
${body.companySize}

Situation:
${body.situation}

Challenge:
${body.challenge}

Submitted At:
${timestamp}
`;

    MailApp.sendEmail({
      to: recipientEmail,
      subject: subject,
      body: message
    });
    
    // Return Success Response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', leadId: leadId }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Needed to open the web app to options/GET requests sometimes, helps debugging:
function doGet(e) {
  return ContentService.createTextOutput("Webhook is active. Please send POST requests.");
}
