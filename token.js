const axios = require('axios');
const qs = require('qs');
require('dotenv').config();

const getAccessToken = async () => {
  const url = 'https://api.preview.platform.athenahealth.com/oauth2/v1/token';

  const data = qs.stringify({
    grant_type: 'client_credentials',
    scope: process.env.SCOPE,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
  });

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Token fetch failed:', error.response?.data || error.message);
    throw new Error('Unable to obtain access token');
  }
};

module.exports = getAccessToken;
