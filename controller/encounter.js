const axios= require('axios');
const getAccessToken = require('../token');


const encounterData= async(req,res)=>{
    const {practiceid,patient,departmentid}=req.query;

    if(!practiceid|!patient|!departmentid){
        return res.status(404).json({error:'practiceid,patientid,departmentid required'})
    }

    try {
        const accessToken = await getAccessToken();
        console.log('Access:',accessToken);
        
        const url = `https://api.preview.platform.athenahealth.com/v1/${practiceid}/${departmentid}/fhir/dstu2/Encounter`

        console.log('url:',url)
        const params={
            patient:patient
        }
        const response = await axios.get(url,{
            headers:{
                Authorization : `Bearer ${accessToken}`
            },
            params
        })
        res.json(response.data);
    } catch (error) {
        res.status(500).json({error:'failed to fetch patient encounter data'})        
    }
}



module.exports={encounterData};