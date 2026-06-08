# Google Sheets & Email Notification Setup

Follow these instructions to connect your Contact Form to Google Sheets and enable email notifications.

## 1. Setup Google Sheets & Apps Script

1. Create a new Google Sheet (or open an existing one).
2. Note the **Spreadsheet ID** from the URL (the long string of characters between `/d/` and `/edit`).
3. Click on **Extensions > Apps Script** in the menu.
4. Delete any code in the script editor and **paste the entire contents** of `google_apps_script.js`.
5. In the script, locate `const sheetIds = "YOUR_SPREADSHEET_ID_HERE";` and replace `YOUR_SPREADSHEET_ID_HERE` with your actual Spreadsheet ID.
6. Still in the script, locate `const recipientEmail = "YOUR_EMAIL@DOMAIN.COM";` and replace it with the email address where you want to receive notifications.
7. Save the script (Ctrl+S or Cmd+S).

## 2. Deploy as Web App

1. Click the blue **Deploy** button in the top right of the Apps Script editor.
2. Select **New deployment**.
3. Next to **Select type**, click the gear icon and choose **Web app**.
4. Under "Execute as", select **Me**.
5. Under "Who has access", select **Anyone**.
6. Click **Deploy**.
7. You will be prompted to authorize access. Click **Review permissions**, select your account, click **Advanced**, and then "Go to... (unsafe)". Allow the permissions (it needs these to read the sheet and send emails on your behalf).
8. Once deployed, copy the **Web app URL**.

## 3. Connect the Webhook to Your React App

1. Open your project's `.env` file (create it if you don't have one, in the root directory).
2. Add the Web app URL you copied:
```env
VITE_GOOGLE_WEBHOOK_URL=your_copied_web_app_url_here
VITE_CALENDLY_URL=https://calendly.com/your-calendly-link
```
3. Save the `.env` file and restart your Vite server if it was running.

Your "Book Strategy Call" form is now fully connected to Google Sheets and will send email notifications!
