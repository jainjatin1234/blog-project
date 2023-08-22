const mongoose = require('mongoose')

//define schema
const categoryschema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    image:{
        public_id:{
            type:String
        },
        url:{
            type:String
        }
    }
},{timestamps:true})

// create collection
// blog is the name of collection
//blogchema is the field of collecion
const categorymodel = mongoose.model('category',categoryschema)
module.exports = categorymodel