const express = require('express')
const AdminController = require('../controllers/admin/AdminController')
const BlogController = require('../controllers/admin/BlogController')
const CategoryController = require('../controllers/admin/CategoryController')
const AboutController = require('../controllers/admin/AboutController')
const FrontController = require('../controllers/FrontController')
const ContactController = require('../controllers/admin/ContactController')
const auth = require('../middleware/auth')
const router = express.Router()

//front controller
router.get('/',FrontController.home)
router.get('/about',FrontController.about)
router.get('/blog',FrontController.blog)
router.get('/contact',FrontController.contact)

router.get('/blogdetail/:id',FrontController.blogdetail)
router.get('/login',FrontController.login)

//admin contoller
router.get('/dashboard',auth,AdminController.dashboard)
router.get('/register',AdminController.register)
router.post('/verifylogin',AdminController.verifylogin)
router.get('/logout', AdminController.logout)

router.post('/admininsert',AdminController.admininsert)
//changepasswprd
router.get('/changepassword',auth,AdminController.changepassword)
router.post('/updatepassword',auth,AdminController.updatepassword)
router.get('/user',auth,AdminController.userdisplay)

router.get('/changeprofile',auth,AdminController.changeprofile)
router.post('/updateprofile',auth,AdminController.updateprofile)
router.post('/update_approve/:id',auth,AdminController.update_approve)



//blog controller
router.get('/displayblog',auth,BlogController.displayBlog)
router.post('/insertblog',auth,BlogController.insertblog)
router.get('/blogview/:id',auth,BlogController.blogview)
router.get('/blogedit/:id',auth,BlogController.blogedit)
router.post('/blogupdate/:id',auth,BlogController.blogupdate)
router.get('/blogdelete/:id',auth,BlogController.blogdelete)
router.get('/userblog',auth,BlogController.userblog)

//category controller
router.get('/displaycategory',auth,CategoryController.displaycategory)
router.post('/insertcategory',auth,CategoryController.insertcategory)
router.get('/viewcategory/:id',auth,CategoryController.viewcategory)
router.get('/editcategory/:id',auth,CategoryController.editcategory)
router.post('/updatecategory/:id',auth,CategoryController.updatecategory)
router.get('/deletecategory/:id',auth,CategoryController.deletecategory)

//about Controller
router.get('/displayabout',auth,AboutController.displayabout)
router.post('/insertabout',auth,AboutController.insertabout)
router.get('/editabout/:id',auth,AboutController.editabout)
router.post('/updateabout/:id',auth,AboutController.updateabout)
router.get('/viewabout/:id',auth,AboutController.viewabout)
router.get('/deleteabout/:id',auth,AboutController.deleteabout)



//contact controller
router.post('/insertcontact',ContactController.insertcontact)
router.get('/displaycontact',auth,ContactController.displaycontact)
router.get('/deletecontact/:id',ContactController.deletecontact)




module.exports = router