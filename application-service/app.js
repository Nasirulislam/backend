'use strict';

const express = require('express');
const dotenv = require('dotenv');

// Config
dotenv.config();

// App
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.disable('x-powered-by');

// Routes
const accountControllers = require('./accounts/controllers');
const accountRoutes = require('./accounts/routes')(express.Router(), accountControllers);

const itemsControllers = require('./items/controllers');
const itemsRoutes = require('./items/routes')(express.Router(), itemsControllers);

const generalRoutes = require('./generalRoutes.js')(express.Router());

app.use('/api', accountRoutes);
app.use('/api', itemsRoutes);
app.use('/', generalRoutes);

// Let's go...
const server = app.listen(process.env.PORT, process.env.HOST);
console.log(`Running on http://${process.env.HOST}:${process.env.PORT}`);

module.exports = server;
