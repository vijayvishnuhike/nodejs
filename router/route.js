const express = require('express');
const router = express.Router();

const PatientData = require('../controller/patientController');
const ccdaexportdata = require('../controller/ccda');
const labResult = require('../controller/labDoc');
const encounderData = require('../controller/encounter');
const imageResults = require('../controller/imageresult');
const clinicalDocs = require('../controller/clinicaldoc');
const documents = require('../controller/documents');


router.get('/patientdata', PatientData.getPatientData);

router.get('/ccdaexport', ccdaexportdata.getExportData);

router.get('/labresult', labResult.labDoc);

router.get('/encounter', encounderData.encounterData);

router.get('/imageresult', imageResults.imageResult);

router.get('/clinicaldocument', clinicalDocs.clinicalDoc);

router.get('/documents', documents.documents);

module.exports = router;
