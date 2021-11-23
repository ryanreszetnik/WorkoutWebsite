
const express = require('express');
const cors = require('cors');
var app = express();

app.use(express.json());// allows handling of json in body
app.use(express.urlencoded({extended: false}));// allows url encoded data
app.use(cors());

app.use('/api/clients',require('./Components/client-info'));
app.use('/api/exercises',require('./Components/exercises'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));