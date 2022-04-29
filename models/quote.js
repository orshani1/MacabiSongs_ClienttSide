const mongoose = require('mongoose');
const quotesSchema = new mongoose.Schema({

    content:{
        type:String,
        required:true
    }

})
module.exports = mongoose.model('Quote',quotesSchema);