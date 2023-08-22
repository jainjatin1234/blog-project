const ContactModel = require('../../models/Contact')
const nodemailer = require('nodemailer')
class ContactController{

    static insertcontact=async(req,res)=>{
       try{
      const {  email, name } = req.body;

      const insert = await new ContactModel({

            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            message:req.body.message
        })
        await insert.save()
        // console.log(insert)
        req.flash("success", "Adding Your Contact Details Succesfully");
      this.sendEmail(name, email);
        res.redirect('/contact')
       }catch(err){
        console.log(err)
       }
    }


    static displaycontact = async(req,res)=>{
        try{
      const {verified,_id} = req.admin
      const data = await ContactModel.find()
            console.log(data)
            res.render('admin/contact/displaycontact', {d:data, ver:verified})

        }catch(err){
            console.log(err)
        }
    } 

    static deletecontact = async (req, res) => {
        try {
      const {verified,_id} = req.admin
      const id = req.params.id
            const data = await ContactModel.findByIdAndDelete(id)
            res.redirect('/displaycontact')

            
        } catch (error) {
            console.log(error);
        }
    }


      static sendEmail = async (name, email) => {
        // console.log("email sending")
        // console.log("Product name")
        // console.log(name, email);
    
        // connect with the smtp server
    
        let transporter = await nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
    
          auth: {
            user: "jainjatin748@gmail.com",
            pass: "gitnxxquzpzssoka",
          },
        });
    
        let info = await transporter.sendMail({
          from: "test@gmail.com", // sender address
          to: email, // list of receivers
          subject: "Your messsage is reached to the admin Successfully", //Subject line
          text: "hello", //plain text body
          html: `<b>${name}</b> Your Message Is Send Succesfully To The Admin !`, // html body 
        });
        console.log("Message sent: %s", info.messageId);
      };

}
module.exports  = ContactController