const express = require('express');
const consign = require('consign');

const db = require('./config/db');

const app = express();

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app);

app.db = db;

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))