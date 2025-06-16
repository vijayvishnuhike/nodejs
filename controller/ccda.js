const axios = require('axios');
const getAccessToken= require('../token');

getExportData= async(req, res)=>{
    const {practiceid,patientid,inpatient,departmentid,documenttype}=req.query;
    
if (!practiceid ||!patientid ||!departmentid ||!documenttype){
    return res.status(404).json()({
        error:'practiceid,patientid,inpatient,departmentid,documenttype'
    });
}

try {
    
    const accesstoken = await getAccessToken();

     const url = `https://api.preview.platform.athenahealth.com/v1/${practiceid}/ccda/${patientid}/ccdaexport`;

     const params={
        inpatient:inpatient,
        departmentid:departmentid,
        documenttype:documenttype
     }
     const response = await axios.get(url,{
        headers:{
            Authorization:` Bearer ${accesstoken}`
        },
        params
     });
     res.json(response.data);

} catch (error) {
    console.log('Error fetching patient data:', error.response?.data || error.message);
    
    res.status(500).json({error:'failed to fetch CCDA export data'})
}
}


module.exports= {getExportData};