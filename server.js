#!/usr/bin/env node

const dotenv = require('dotenv')
dotenv.config();

/**
 * Module dependencies.
 */
const {app} = require('./app');

const port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});