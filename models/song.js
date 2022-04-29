var mongoose = require('mongoose')
var songSchema = new mongoose.Schema({
        title:{
            type:String,
            required:true
        },
        words:{
            type:String,
            required:true
        },
        subWords:{
            type:String,
        },
        isSelected:{
            type:Boolean,

        },
        video:{
            type:String,

        }
})

module.exports =  mongoose.model('Song',songSchema)    // "@angular/cli": "~13.2.5",
// "@angular/compiler-cli": "~13.2.0",