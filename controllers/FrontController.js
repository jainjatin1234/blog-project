const BlogModel = require('../models/Blog')
const CategoryModel = require('../models/Category')
const AboutModel = require('../models/About')
class FrontController{

    static home =async (req,res)=>{
     try{
        const blogs = await BlogModel.find().sort({_id:-1}).limit(6)
        // const blogs = await BlogModel.find()

       // console.log(blogs)
        res.render('home', {b:blogs})

     }catch(err){
        console.log(err)
     }
    }
   


    static about = async(req,res)=>{
        try{
      const about = await AboutModel.findOne()
            // console.log(about)
            res.render('about',{a:about})

        }catch(err){
            console.log(err)
        }
    }

    static contact = (req,res)=>{

        res.render('contact', {message5: req.flash('success')})
    }


    static blogdetail = async(req,res)=>{
        try{
            
            const detail = await BlogModel.findById(req.params.id)
            // console.log(data)
            const recentblogs  = await BlogModel.find().sort({_id:-1}).limit(6) 
            const category = await CategoryModel.find()
           // console.log(category)
            res.render('blogdetail',{d:detail, r:recentblogs, c:category})

        }catch(error){
            console.log(error)
        }
    }

    static blog = async (req,res)=>{
        try{
            const blogs = await BlogModel.find().sort({_id:-1})
            // console.log(blogs)
            res.render('blog', {b:blogs})
        }catch(err){
            console.log(err)
        }
    }
   
    
    static login = async(req,res)=>{
        try{
            res.render('login',{ message1: req.flash('success'), message2: req.flash('error')})
        }catch(err){
            console.log(err)
        }
    }



}
module.exports=FrontController