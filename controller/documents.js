const axios = require ('axios');

const getAccessToken = require('../token');

const documents = async(req,res)=>{
    const {practiceid,patientid,departmentid}=req.query;

    if (!practiceid|!patientid|!departmentid){
        return res.status(404).json({error:'practiceid,patientid,departmentid is required'})
    };

    try {
        const accessToken = await getAccessToken();
        const url = `https://api.preview.platform.athenahealth.com/v1/${practiceid}/patients/${patientid}/documents`

        const params= {
            departmentid:departmentid
        }
        const response = await axios.get(url,{
            headers:{
                Authorization: `Bearer ${accessToken}`
            },
            params
        })
        res.json(response.data);
    } catch (error) {
        res.status(500).json({error:'failed to fetch the data patient clinical data'})
    }
}
module.exports= {documents};