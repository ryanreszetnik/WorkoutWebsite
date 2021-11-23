const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

clients = []

saveData = () =>{
    console.log('trying to save');
    fs.writeFile(path.join(__dirname, 'client-data.json'),JSON.stringify(clients), err =>{
        if (err) throw err;
    });
}
updateData = () =>{
    clients = JSON.parse(fs.readFileSync(path.join(__dirname, 'client-data.json'),'utf8', err =>{
        if (err) throw err;
    }));
}

router.get('/', (req, res) => {//get request
    updateData();
    res.json(clients);
})

router.get('/:id', (req, res) => {
    //req.params.id to access id var
    updateData();
    const found = clients.some(client => client.id === parseInt(req.params.id));
    if(found){
        clients.forEach(client => {
            if(client.id === parseInt(req.params.id)){
                res.json(client);
            }
          });
    }else{
        res.status(400).json({msg:`No user with id ${req.params.id}`})
    }
})
router.put('/:id', (req, res) => {
    updMember = req.body;
    updateData();
    const found = clients.some(client => client.id === parseInt(req.params.id));
    if(found){
        clients.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.firstName =updMember.firstName?updMember.firstName:member.firstName;
                member.lastName =updMember.lastName?updMember.lastName:member.lastName;
                member.email =updMember.email?updMember.email:member.email;
                member.age =updMember.age?updMember.age:member.age;
                member.workoutPlan =updMember.workoutPlan?updMember.workoutPlan:member.workoutPlan;
                res.json({msg:`Updated ${member.firstName} ${member.lastName}`})
                saveData();
            }
        });
        
    }else{
        res.status(400).json({msg:`No Member Found With Id ${req.params.id}`})
    }
})
router.post('/', (req, res) => {
    updateData();
    updMember = req.body;
    if(clients.length>0){
        updMember.id = clients[clients.length-1].id+1;
    }else{
        updMember.id=1;
    }
    clients.push(updMember);
    res.json(updMember);
    saveData();
})

router.delete('/:id', (req, res) => {
    updateData();
    const found = clients.some(client => client.id === parseInt(req.params.id));
    if(found){
        clients = clients.filter(member =>{
            return member.id !== parseInt(req.params.id);
        });
        res.json(clients);
    }else{
        res.status(400).json({msg:`No Member Found With Id ${req.params.id}`})
    }
    saveData();
});

module.exports = router;