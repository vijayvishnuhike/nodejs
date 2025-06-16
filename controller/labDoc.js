const axios = require('axios');
const getAccessToken = require('../token');

const labDoc = async (req, res) => {
    const { practiceid, patientid, departmentid } = req.query;

    if (!practiceid || !patientid || !departmentid) {
        return res.status(400).json({ error: 'practiceid, patientid, and departmentid are required' });
    }

    try {
        const accesstoken = await getAccessToken();
console.log(' Access Token:', accesstoken);
        const url = `https://api.preview.platform.athenahealth.com/v1/${practiceid}/chart/${patientid}/labresults`;

        const params = { departmentid };

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accesstoken}`
            },
            params
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching lab results:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch patient Labresults' });
    }
};

module.exports = {labDoc};
