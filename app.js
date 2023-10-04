const express = require('express')
const FrontController = require('./controllers/FrontController')
// console.log(express)
const app = express()
const port = 5000
const web = require('./routes/web')
const connectdb = require('./db/dbconnect')
const fileupload = require('express-fileupload')
var cloudinary = require('cloudinary')
var flash = require('connect-flash')
var session = require('express-session')
//databse connect
connectdb()

//to convert url data in json form
app.use(express.urlencoded({extended:false}))


//cookieparser
const cookieParser = require('cookie-parser')
app.use(cookieParser())


// for file upload
app.use(fileupload({useTempFiles: true}))

// for flash mesaage
app.use(session({
    secret: 'secret',
    cookie: {maxAge:60000},
    resave: false,
    saveUninitialized: false,
  }));
  
  app.use(flash());

  //static files
app.use(express.static('public'))

//ejs set html
app.set('view engine', 'ejs')

// router load
app.use('/',web)




  

// /server create 
app.listen(port,()=>{
    console.log('server start ')
})
