const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


exerciseList = []

updateData = () =>{
    exerciseList = JSON.parse(fs.readFileSync(path.join(__dirname, 'exercise-data.json'),'utf8', err =>{
        if (err) throw err;
    }));
}

router.get('/', (req, res) => {//get request
    updateData();
    res.json(exerciseList);
})
router.get('/images/:id', (req,res) =>{
    res.sendFile(__dirname+'/Images'+'/'+req.params.id+'.png');
})

module.exports=router;