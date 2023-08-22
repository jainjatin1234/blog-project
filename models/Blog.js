const mongoose = require('mongoose')

//define schema
const blogschema = new mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    user_id:{
        type:String,
        required:true
},
author_name:{
    type:String,
    required:true
},
    image:{
        public_id:{
            type:String
        },
        url:{
            type:String
        }
    },
    category:{
        type: String,
        required: true
    }
},{timestamps:true})

// create collection
// blog is the name of collection
//blogchema is the field of collecion
const blogmodel = mongoose.model('blog',blogschema)
module.exports = blogmodel