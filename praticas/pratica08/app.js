require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const usuariosRouter = require('./routes/usuariosRouter');
const produtosRouter = require('./routes/produtosRouter');


app.use('/usuarios', usuariosRouter);
app.use('/produtos', produtosRouter);

module.exports = app;