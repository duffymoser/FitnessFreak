
//dot env to set environment variables
require('dotenv').config();

//configure server/listener port
const { PORT = 8080 } = process.env;
const express = require('express');
const server = express();
const { JWT_SECRET } = process.env;


//enable body parsing and jsonification

const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(express.urlencoded({ extended:true }));


//morgan to make pretty logging text
const morgan = require('morgan');
server.use(morgan('dev'));

//start (and stop) body logging
server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

//ship the request off to api to get routed

const apiRouter = require('./api');
server.use('/api', apiRouter);

//open a connection into postgres
const { client } = require('./db');
client.connect();

//start our TCP listener - I think I would have to add dgram for udp - not sure
server.listen(PORT, 'localhost', () => {
  console.log("The server is up on port", PORT);
});