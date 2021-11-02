const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SujetSchema = new Schema({
    titre:{
        type:String,
        required:[true,'Titre field is required']
    },
    description:{
        type:String,
        required:[true,'description field is required']
    },
    choix:{
        type:String,
        required:[true,'choix field is required']
    }
  
});

const Sujet = mongoose.model('Sujet', SujetSchema);

module.exports=Sujet;