const BlogModel = require("../../models/Blog");
const CategoryModel = require("../../models/Category")
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dcppdjsyp",
  api_key: "414816748386289",
  api_secret: "UhpbWnq98zfU0iTzbNY7m7wwMFk",
});

class BlogController {
  static displayBlog = async (req, res) => {
    try {
      const {verified,_id} = req.admin
      const data = await BlogModel.find({user_id:_id}).sort({_id:-1});
      // console.log(data)
    const category = await CategoryModel.find()

      res.render("admin/blog/display", { d: data, c:category, ver:verified });
    } catch (error) {
      console.log(error);
    }
  };

  static insertblog = async (req, res) => {
    try {
      // console.log(req.files.image)
      const {verified,_id} = req.admin
      const file = req.files.image;
      const myImage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "blogimage",
      });
      console.log(myImage);
      // const result = await BlogModel.create(req.body)
      const result = new BlogModel({
        title: req.body.title,
        description: req.body.description,
        author_name:req.admin.name,
        user_id:_id,

        image: {
          public_id: myImage.public_id,
          url: myImage.secure_url,
        },
        category: req.body.category
      });
      await result.save();
      console.log(result);
      res.redirect("/displayblog");
    } catch (error) {
      console.log(error);
    }
  };

  static blogview = async (req, res) => {
    try {
      // console.log(req.params.id)
      const {verified,_id} = req.admin
      const data = await BlogModel.findById(req.params.id);
      // console.log(data)
      res.render("admin/blog/view", { view: data, ver:verified });
    } catch (err) {
      console.log(err);
    }
  };

  static blogedit = async (req, res) => {
    try {
      const {verified,_id} = req.admin
      const data = await BlogModel.findById(req.params.id);
      res.render("admin/blog/edit", { edit: data, ver:verified });
    } catch (err) {
      console.log(err);
    }
  };

  
  
  static blogupdate = async (req, res) => {
    try {
      const {verified,_id} = req.admin
      // console.log(req.files.image)
        if (req.files) {

          //deleting the image
            const blog = await BlogModel.findById(req.params.id)
            const imageid = blog.image.public_id

            // console.log(imageid)

            await cloudinary.uploader.destroy(imageid)



            //second update,age

            const imagefile = req.files.image
            //image upload code
            const myImage = await cloudinary.uploader.upload(imagefile.tempFilePath, {   
                folder: "blogimage"
            })


            var data = {
                name: req.body.name,
                title: req.body.title,
                description: req.body.description,
                image: {
                    public_id: myImage.public_id,
                    url: myImage.secure_url
                }

            }

        } else {
            var data = {
               
              name: req.body.name,
              title: req.body.title,
              description: req.body.description

            }
        }
        const id = req.params.id
        await BlogModel.findByIdAndUpdate(id, data)
        res.redirect('/displayblog')

    } catch (error) {
        console.log(error)
    }

}

  static blogdelete = async (req, res) => {
    try {
      //code of deleteing the image
      const {verified,_id} = req.admin
      const blog = await BlogModel.findById(req.params.id)
      const image_id = blog.image.public_id
      // console.log(image_id)
      await cloudinary.uploader.destroy(image_id)
    

      await BlogModel.findByIdAndDelete(req.params.id);
      res.redirect("/displayblog");
      // console.log(req.params.id);
    } catch (err) {
      console.log(err);
    }
  };

static userblog = async (req, res) => {
  try {
    const {verified,_id} = req.admin
    const data = await BlogModel.find().sort({_id:-1});
    // console.log(data)

    res.render("admin/blog/userblog", { d: data,  ver:verified });
  } catch (error) {
    console.log(error);
  }
};
}
module.exports = BlogController;
