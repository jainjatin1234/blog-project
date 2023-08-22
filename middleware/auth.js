const jwt = require('jsonwebtoken')
const AdminModel  = require('../models/Admin')

const checkAdminAuth = async(req,res,next)=>{

    // console.log('hello')
    const {token} = req.cookies
    // console.log(token)
    if(!token){
        req.flash('error', 'unauthorized admin, please login')
    res.redirect('/login')
    }else{
        const verify_token = jwt.verify(token,'jatin12345')
        // console.log(data)

        const admin = await AdminModel.findOne({_id: verify_token.ID})
        // console.log(admin)
        req.admin = admin
        next()

    }
}

module.exports = checkAdminAuth