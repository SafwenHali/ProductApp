const express = require('express');

const routes = require('./app/routes/router');

require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
