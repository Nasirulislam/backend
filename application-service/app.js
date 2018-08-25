'use strict';

const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql');

// Config
dotenv.config();

// App
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.disable('x-powered-by');

// Routes
const itemsControllers = require('./items/controllers');
const itemsRoutes = require('./items/routes')(express.Router(), itemsControllers);

const generalRoutes = require('./generalRoutes.js')(express.Router());

app.use('/api', itemsRoutes);
app.use('/', generalRoutes);

// Database
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

db.connect(function(err) {
    if (err) throw err;

    // Listen
    app.listen(process.env.PORT, process.env.HOST);
    console.log(`Running on http://${process.env.HOST}:${process.env.PORT}`);
});