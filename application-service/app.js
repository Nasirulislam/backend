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

const contactControllers = require('./contact/controllers');
const contactRoutes = require('./contact/routes')(express.Router(), contactControllers);

const locationsControllers = require('./locations/controllers');
const locationsRoutes = require('./locations/routes')(express.Router(), locationsControllers);

const imagesControllers = require('./images/controllers');
const imagesRoutes = require('./images/routes')(express.Router(), imagesControllers);

const generalRoutes = require('./generalRoutes.js')(express.Router());

const apiVersion = '/v1';
app.use(apiVersion, accountRoutes);
app.use(apiVersion, itemsRoutes);
app.use(apiVersion, contactRoutes);
app.use(apiVersion, locationsRoutes);
app.use(apiVersion, imagesRoutes);
app.use('/', generalRoutes);

// Let's go...
const server = app.listen(process.env.PORT, process.env.HOST);
console.log(`Running on http://${process.env.HOST}:${process.env.PORT}`);

module.exports = server;
