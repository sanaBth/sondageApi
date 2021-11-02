const express = require('express');
const router =  express.Router();
const Sujet = require('../models/sujet');


//getting all sujet
router.get('/sujets', (req, res) => {
    console.log('getting all votes');
    Sujet.find({})
    .then(result =>res.status(200).json(result) )
    .catch(err => res.status(500).json(err)); 
  });


  //get one sujet
  router.get('sujet/:id', (req, res) =>
  Sujet.findOne({
    _id: req.params.id
    }) .then(result =>res.status(200).json(result) )
    .catch(err => res.status(500).json(err))
    );


  //post sujet
  router.post('/sujet', (req, res) => {
    let newSujet = new Sujet();
    newSujet.titre = req.body.titre;
    newSujet.description = req.body.description;
    newSujet.choix = req.body.choix;
  //console.log(newSujet);
   newSujet.save()
      .then(result =>res.status(201).json(result) )
      .catch(err => res.status(500).json(err)); 
  
  });


module.exports = router;