const express = require('express');
const app = express();
const db = require('./config/db');
const productsRouter = require('./routes/products.routes');
require('dotenv').config();

const port = process.env.PORT;

app.use(express.json());
app.use(productsRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
