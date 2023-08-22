const AdminModel = require("../../models/Admin");
const cloudinary = require("cloudinary").v2;
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//cloudinary setup
cloudinary.config({
  cloud_name: "dlfiha3il",
  api_key: "298518693242975",
  api_secret: "T_6T7Lm0qY047jiiCKnH-VqvkwA",
});

class AdminController {
  static dashboard = async (req, res) => {
    try {
      const { name, email, image,verified } = req.admin;
      res.render("admin/dashboard", { n: name, e: email, img: image, ver:verified });
    } catch (err) {}
  };

  static register = async (req, res) => {
    try {
      
      res.render("admin/register", { message: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };

  static admininsert = async (req, res) => {
    try {
      // console.log(req.files.image)
      // console.log(req.body)
      const imagefile = req.files.image;
      //image upload code
      const image_upload = await cloudinary.uploader.upload(
        imagefile.tempFilePath,
        {
          folder: "admin",
        }
      );
      // console.log(image_upload)
      // console.log(req.body)
      const { name, email, password, cpassword, address, phone } = req.body;
      const admin = await AdminModel.findOne({ email: email });
      //console.log(admin);
      if (admin) {
        req.flash("error", "email already exists");
        res.redirect("/register");
      } else {
        if (name && email && password && cpassword && phone && address) {
          if (password == cpassword) {
            try {
              const hashpassword = await bcrypt.hash(password, 10);
              const result = new AdminModel({
                name: name,
                email: email,
                password: hashpassword,
                address: address,
                phone: phone,

                image: {
                  public_id: image_upload.public_id,
                  url: image_upload.secure_url,
                },
              });
              await result.save();
              req.flash("success", "registeration succesfull");
              res.redirect("/login");
            } catch (error) {
              console.log(error);
            }
          } else {
            req.flash("error", "password & confirm password not found");
            res.redirect("/register");
          }
        } else {
          req.flash("error", "All feilds are required");
          res.redirect("/register");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  static verifylogin = async (req, res) => {
    try {
      // console.log(req.body)
      const { email, password } = req.body;
      if (email && password) {
        const admin = await AdminModel.findOne({ email: email });

        if (admin != null) {
          const ismatched = await bcrypt.compare(password, admin.password);
          if (ismatched) {
            // generate jwt token
            var token = jwt.sign({ ID: admin._id }, "jatin12345");
            // console.log(token)
            // res.cookie('token',token)
            // res.redirect('/dashboard')
            if (admin.verified === "Admin") {
              res.cookie("token", token);
              res.redirect("/dashboard");
            } else if (admin.verified === "Approved") {
              res.cookie("token", token);
              res.redirect("/dashboard");
            } else if (admin.verified === "pending") {
              req.flash("error", "YOU ARE NOT APPROVED! Plz Wait....");
              res.redirect("/login");
            }
          } else {
            req.flash("error", "Email or password is incorrect");
            res.redirect("/login");
          }
        } else {
          req.flash("error", "you are not registere user");
          res.redirect("/login");
        }
      } else {
        req.flash("error", "All fields are required");
        res.redirect("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("login");
    } catch (err) {
      console.log(err);
    }
  };

  static userdisplay = async (req, res) => {
    try {
      const { name, email, image,verified } = req.admin;

      const data = await AdminModel.find();
      // console.log(data)

      res.render("admin/user", { d: data,ver:verified });
    } catch (error) {
      console.log(error);
    }
  };

  static changepassword = async (req, res) => {
    try {
      const { name, email, image,verified } = req.admin;

      res.render("admin/changepassword", {
        ver:verified,
        message3: req.flash("success"),
        message4: req.flash("error"),
      });
    } catch (err) {
      console.log(err);
    }
  };

  static updatepassword = async (req, res) => {
    try {
      const { email, password, id,verified } = req.admin;
      const { oldpassword, newpassword, cpassword } = req.body;
      if (oldpassword && newpassword && cpassword) {
        const user = await AdminModel.findById(id);
        const ismatch = await bcrypt.compare(oldpassword, user.password);
        if (!ismatch) {
          req.flash("error", "oldpassword is incorrect.");
          return res.redirect("/changepassword");
        } else {
          if (newpassword != cpassword) {
            req.flash("error", "Pasword and confirm password do not match");
            return res.redirect("/changepassword");
          } else {
            const newHashpassword = await bcrypt.hash(newpassword, 10);
            await AdminModel.findByIdAndUpdate(id, {
              $set: { password: newHashpassword },
            });
            req.flash(
              "success",
              "password cahnged succesfully.please login with new password"
            );
          }
          return res.redirect("/logout");
        }
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  static changeprofile = async (req, res) => {
    try {
      const { name, image, email,verified } = req.admin;
      // console.log(image)
      res.render("admin/changeprofile", {
        n: name,
        i: image,
        e: email,
        ver:verified,
        error: req.flash("error"),
      });
    } catch (err) {
      console.log(err);
    }
  };

  static updateprofile = async (req, res) => {
    try {
      // console.log(req.files.image)
      if (req.files) {
        //deleting the image
        const admin = await AdminModel.findById(req.admin.id);
        const imageid = admin.image.public_id;

        // console.log(imageid)

        await cloudinary.uploader.destroy(imageid);

        //second update,age

        const imagefile = req.files.image;
        //image upload code
        const myImage = await cloudinary.uploader.upload(
          imagefile.tempFilePath,
          {
            folder: "adminimage",
          }
        );

        var data = {
          name: req.body.name,
          email: req.body.email,
          image: {
            public_id: myImage.public_id,
            url: myImage.secure_url,
          },
        };
      } else {
        var data = {
          name: req.body.name,
          email: req.body.email,
        };
      }
      const id = req.admin.id;
      await AdminModel.findByIdAndUpdate(id, data);
      res.redirect("/changeprofile");
    } catch (err) {
      console.log(err);
    }
  };

  static update_approve = async (req, res) => {
    try {
      console.log(req.body);
      const { verified, email, name } = req.body;
      const update = await AdminModel.findByIdAndUpdate(req.params.id, {
        verified: req.body.verified,
        comment: req.body.comment,
      });
      this.sendEmail(email, name, verified);
      res.redirect("/user");
    } catch (err) {
      console.log(err);
    }
  };

  static sendEmail = async (email, name, verified) => {
    let transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,

      auth: {
        user: "jainjatin748@gmail.com",
        pass: "gitnxxquzpzssoka",
      },
    });

    let info = await transporter.sendMail({
      from: "test@gmail.com",
      to: email,
      subject: `Create Blog Registeration ${verified} Succesfully`,
      text: "heelo",
      html: `<b>${name}</b> Registeration is <b>${verified}</b> succesful!`,
    });
  };
}
module.exports = AdminController;
