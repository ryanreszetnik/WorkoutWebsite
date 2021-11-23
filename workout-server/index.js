const express = require('express');
const members = require('./Members');
const { urlencoded } = require('body-parser');
var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// app.use("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
//   });



app.get('/', (req, res) => {
    res.json(members);
})



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));