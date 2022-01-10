const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');
require("dotenv").config();
const { auth, requiresAuth } = require('express-openid-connect');

app.use(
  auth({
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    authRequired: false,
    auth0Logout: true,
  })
);

const indexRouter = require('./Routes/index.router');
const datatableRouter = require('./Routes/datatable.router');
const apiRouter = require('./Routes/api.router');
const profileRouter = require('./Routes/profile.router');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/public", express.static(__dirname + "/public"));

app.use('/', indexRouter);
app.use('/datatable', datatableRouter);
app.use('/api', apiRouter);
app.use('/profile', profileRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("listening on port " + port);
});