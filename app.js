const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express(); 
const PORT = 5000;
const patientRoutes = require('./router/route');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
app.use(cors());
app.use(express.json()); 
app.use(bodyParser.json());

app.use('/api', patientRoutes); 
app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));
app.use((err, req, res, next) => {
  console.error('Unhandled error middleware:', err.stack || err.message);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => console.log(`Server Running On: ${PORT}`));
