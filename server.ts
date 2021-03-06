import express = require('express');
import cors = require('cors');
import path = require('path');
import mongoose = require('mongoose');
import OrderRouter from './routes/order.routes';
import ProductsRouter from './routes/products.routes';
import { Response, Request, Application } from 'express/index';

const app: Application = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname + '/client/build')));

/* API ENDPOINTS */
app.use('/products', ProductsRouter);
app.use('/order', OrderRouter);

app.use(express.static(path.join(__dirname + '/public')));

/* REACT WEBSITE */
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'), err => {
    if (err) res.status(500).send(err);
  });
});

app.use((req, res) => {
  res.status(404).send({ message: 'not found...' });
});

/* MONGOOSE */
process.env.NODE_ENV === "production" ?
  mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0-314sb.mongodb.net/NaturalBeauty?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }) :
  mongoose.connect('mongodb://localhost:27017/natural-beauty', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});

module.exports = server;
