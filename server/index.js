require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const apiRoutes = require('./routes/api');

const app = express();

app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('ApexConsult Backend is Running!');
});

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.MONGO_URI;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));