require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require("cors");


mongoose
  .connect(process.env.DBURL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app = express();

// Cross Domain CORS whitlist
const whitelist = [process.env.BACK_URL, process.env.FRONT_URL];
const corsOptions = {
  origin: function (origin, callback) {
    console.log(`Origin: ${origin}`);
    if (!origin) return callback(null, true);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};



// Middleware Setup
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const filmIdx = require('./routes/film');
app.use('/', filmIdx);

module.exports = app;
