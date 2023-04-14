const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const routes = require('./routes/index');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/',routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
