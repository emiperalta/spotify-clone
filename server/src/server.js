require('dotenv/config');
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');

const app = express();

const { PORT } = process.env;

app.use(cors());
app.use(express.json());

app.use('/', authRoutes);

app.listen(PORT, () => console.log('sever running at port', PORT));
