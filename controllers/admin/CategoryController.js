const CategoryModel = require('../../models/Category')
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dcppdjsyp",
  api_key: "414816748386289",
  api_secret: "UhpbWnq98zfU0iTzbNY7m7wwMFk",
});
class CategoryController{

    static displaycategory = async (req,res)=>{
try{
    const {verified,_id} = req.admin

    const data = await CategoryModel.find()
    // console.log(data)

    res.render('admin/category/displaycategory', {d:data, ver:verified})

} catch(err){
    console.log(err)
}  
 }

    static insertcategory = async(req,res)=>{
        // console.log(req.body)

        try{
            // const result = await CategoryModel.create(req.body)
            // console.log(result)
            // console.log(req.files.image)

      const {verified,_id} = req.admin
      //upload image
            const file = req.files.image
            const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
                folder:"categoryimage",
            })

            const result = new CategoryModel({
                name:req.body.name,
                image:{
                    public_id:myimage.public_id,
                    url:myimage.secure_url
                },
            })
            await result.save()
            // console.log(result)
            res.redirect('/displaycategory')
        }catch(err){
            console.log(err)
        }
    }

    static viewcategory = async(req,res)=>{
      const {verified,_id} = req.admin
      // console.log(req.params.id)
        try{
            const data = await CategoryModel.findById(req.params.id)
            console.log(data)
        res.render('admin/category/viewcategory', {view:data, ver:verified})
            
        }catch(err){
            console.log(err)
        }
    }
    static editcategory= async(req,res)=>{
        try {
      const {verified,_id} = req.admin
      const data = await CategoryModel.findById(req.params.id);
            res.render("admin/category/editcategory", {edit:data, ver:verified});
            console.log(data)
          } catch (err) {
            console.log(err);
          }
    }

    static updatecategory = async(req,res)=>{
        try{
      const {verified,_id} = req.admin
      if(req.files){

             //code of deleting the image
         const category = await CategoryModel.findById(req.params.id)
         const image_id = category.image.public_id
         // console.log(image_id)
         await cloudinary.uploader.destroy(image_id)

         //inserting the image
         const file = req.files.image;
         //image upload code
         const myImage = await cloudinary.uploader.upload(file.tempFilePath, {
           folder: "categoryimage",
         });
            
               var data = { 
                name:req.body.name,
                image:{
                    public_id: myImage.public_id,
          url: myImage.secure_url
                }
            }
            }else{

                var data = {
                    name:req.body.name,
                }
            }
                const id = req.params.id
                await CategoryModel.findByIdAndUpdate(id, data)
                res.redirect('/displaycategory')
              
             } catch(err){
            console.log(err)
              }
    
}


    static deletecategory= async(req,res)=>{
        try{
                  //code of deleting the image
      const {verified,_id} = req.admin
      const category = await CategoryModel.findById(req.params.id)
         const image_id = category.image.public_id
         // console.log(image_id)
         await cloudinary.uploader.destroy(image_id)

         await CategoryModel.findByIdAndDelete(req.params.id)
         res.redirect('/displaycategory')

        }catch(err){
            console.log(err)
        }
    }

}
module.exports = CategoryController