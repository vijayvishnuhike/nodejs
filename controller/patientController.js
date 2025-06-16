const axios = require('axios');
const getAccessToken = require('../token');

const getPatientData = async (req, res) => {
  const {
    givenName,
    familyName,
    dob,
    gender,
    practiceid,
    departmentid
  } = req.query;

  if (!givenName || !familyName || !dob || !practiceid || !departmentid) {
    return res.status(400).json({
      error: 'givenName, familyName, dob, practiceid, and departmentid are required query parameters'
    });
  }

  try {
    const accessToken = await getAccessToken();

    const url = `https://api.preview.platform.athenahealth.com/v1/${practiceid}/${departmentid}/fhir/dstu2/Patient`;

    const params = {
      given: givenName,
      family: familyName,
      birthdate: dob
    };
    if (gender) {
      params.gender = gender;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching patient data:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch patient data' });
  }
};

module.exports = { getPatientData };
