const express = require('express');
const app = express();
const path = require('path');

const indexRouter = require('./Routes/index.router');
const datatableRouter = require('./Routes/datatable.router');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(__dirname + "/public"));

app.use('/', indexRouter);
app.use('/datatable', datatableRouter);

app.listen(3000);