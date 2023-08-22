const mongoose = require('mongoose')
const adminschema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    verified:{
        type:String,
        default:"pending"
    },
    comment:{
        type:String
    },
    role:{
        type:String,
        default:"user"
    },
    image:{
        public_id:{
            type: String, 
        },
        url: {
            type: String
        }
    }
},{timestamps:true})

const adminmodel = mongoose.model('admin',adminschema)
module.exports  = adminmodel