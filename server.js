const express = require('express');

const routes = require('./app/routes/router');

require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.text({ type: 'application/xml' }));

app.use('/', routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});



