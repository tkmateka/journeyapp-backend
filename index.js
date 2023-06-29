require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Routes
const routes = require('./routes/routes');
app.use(routes);

app.listen(process.env.PORT || PORT, () => {
    console.log('listening on 3000')
})