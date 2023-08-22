const ContactModel = require('../../models/Contact')
class ContactController{

    static insertcontact=async(req,res)=>{
       try{
      const {verified,_id} = req.admin
      const insert = await new ContactModel({

            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            message:req.body.message
        })
        await insert.save()
        console.log(insert)
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
module.exports  = ContactController