require('dotenv/config');
const express = require('express');

const app = express();

const { PORT } = process.env;

app.get('/', (req, res) => res.send('hello world!'));

app.listen(PORT, () => console.log('sever running at port', PORT));
