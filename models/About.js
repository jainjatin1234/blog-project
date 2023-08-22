const mongoose = require('mongoose')
const aboutschema = new mongoose.Schema({
    description:{
        type:String,
        require:true
    },
    image:{
        public_id:{
            type:String,
        },
        url:{
        type:String
        }
    }

},{timestamps:true})

const aboutmodel = mongoose.model('about',aboutschema)
module.exports  = aboutmodel