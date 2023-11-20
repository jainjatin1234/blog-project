const mongoose = require("mongoose");
const local_url = "mongodb://127.0.0.1:27017/blogproject";
const live_url ='mongodb+srv://jainjatin748:jatin123@cluster0.j2ibsii.mongodb.net/blogger?retryWrites=true&w=majority'

const connectdb = () => {
  return mongoose.connect(live_url)

  .then(()=>{
    console.log("Database connected....")
  })
  .catch((error)=>{
    console.log(error)
  })
}
module.exports = connectdb;
 