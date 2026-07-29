/**
 * scripts/submit-sitemap.js
 *
 * Programmatically submits sitemaps to the Google Search Console API.
 * Intended to be run post-deployment via CI/CD.
 *
 * Setup:
 * 1. npm install googleapis dotenv
 * 2. Obtain a Service Account JSON key from GCP and place it securely (or in env vars).
 * 3. Ensure the Service Account email is added as an Owner in Google Search Console.
 */

const { google } = require('googleapis');
require('dotenv').config();

// Configuration
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://comicflow.alfo.online';
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '11aa11a111a1111a1111111aa11a11a1';
const fetch = require('node-fetch'); // Assuming node-fetch or native fetch in node 18+
const CREDENTIALS_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS; // Path to your service account JSON

const sitemapsToSubmit = [
  `${SITE_URL}/sitemap.xml`,
  // Future segmented sitemaps can be added here
  // `${SITE_URL}/sitemap-use-cases.xml`,
  // `${SITE_URL}/sitemap-blog.xml`,
];

async function submitSitemaps() {
  if (!CREDENTIALS_PATH && !process.env.GOOGLE_PRIVATE_KEY) {
    console.error('Error: Google Application Credentials are not configured.');
    process.exit(1);
  }

  console.log(`Starting sitemap submission for property: ${SITE_URL}`);

  try {
    // Authenticate using Application Default Credentials
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/webmasters'],
    });

    const webmasters = google.webmasters({ version: 'v3', auth });

    for (const feedpath of sitemapsToSubmit) {
      console.log(`Submitting: ${feedpath}...`);

      try {
        await webmasters.sitemaps.submit({
          siteUrl: SITE_URL,
          feedpath: feedpath,
        });
        console.log(`✅ Successfully submitted: ${feedpath}`);
      } catch (submitError) {
        console.error(`❌ Failed to submit: ${feedpath}`);
        console.error(submitError.message);
      }
    }


    // Trigger IndexNow
    try {
      console.log('Triggering IndexNow API...');
      const response = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          host: new URL(SITE_URL).hostname,
          key: INDEXNOW_KEY,
          keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
          urlList: sitemapsToSubmit // or pass specific URLs
        })
      });
      if (response.ok) {
        console.log('✅ Successfully triggered IndexNow API');
      } else {
        console.error('❌ Failed to trigger IndexNow API:', response.status, await response.text());
      }
    } catch (e) {
      console.error('❌ Failed to trigger IndexNow API:', e.message);
    }

    console.log('Sitemap submission process complete.');
  } catch (error) {
    console.error('Authentication or API failure:', error);
    process.exit(1);
  }
}

submitSitemaps();
