const { google } = require('googleapis');
require('dotenv').config();
const fs = require('fs');

async function submitIndexing() {
  const keyFile = '/tmp/gcp-key.json';
  if (!fs.existsSync(keyFile)) {
    console.error('Error: GCP key file not found at /tmp/gcp-key.json');
    process.exit(1);
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: keyFile,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  const indexing = google.indexing({ version: 'v3', auth: await auth.getClient() });

  const urls = process.argv.slice(2);

  for (const url of urls) {
    console.log(`Submitting URL to Indexing API: ${url}`);
    try {
      const res = await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED',
        },
      });
      console.log(`✅ Successfully submitted: ${url}`);
    } catch (err) {
      console.error(`❌ Failed to submit: ${url}`, err.message);
    }
  }
}

submitIndexing();
