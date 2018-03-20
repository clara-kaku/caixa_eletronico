const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const port = process.env.port || 8080;

//Connect to mongodb
mongoose.connect('mongodb://localhost/atm');
mongoose.Promise = global.Promise;

app.use(express.static('client'));

app.use(bodyParser.json());

//Initialize routes
app.use('/api', require('./routes/api'));

//Error handling middleware
app.use((err, req, res, next) => {
  res.status(422).send({error: err.message});
});

app.listen(port, () => {
  console.log('Server started on port ' + port);
});
