const axios = require('axios');

const  getAccessToken = require ('../token');

const clinicalDoc = async (req,res)=>{
    const {practiceid,patientid,departmentid}=req.query;

    if(!practiceid|!patientid|!departmentid){
        return res.status(404).json({error:'practiceid,patientid,departmentid is required'})
    };

    try {
        const accessToken = await getAccessToken();
        console.log('Access:',accessToken);
        
        const url = `https://api.preview.platform.athenahealth.com/v1/${practiceid}/patients/${patientid}/documents/clinicaldocument`
        
        const params={
        departmentid:departmentid
        };
        const response = await axios.get(url,{
            headers:{
                Authorization:` Bearer ${accessToken}`
            },
            params
        })
        res.json(response.data);
        console.log('resr',response.data);
        
    } catch (error) {
        res.status(500).json({error:'failed to fetch patient clinical Document'})
    }
}

module.exports= {clinicalDoc};