var express = require('express');
var router = express.Router();
var upload = require('express-fileupload')
var path = require('path');
// var multer = require('multer');
var profileController = require("../controllers").pictureController;
var userController = require("../controllers").usersController;

// multer Object
// var storage = multer.diskStorage({
// 	destination: function(req, file, callback) {
// 		callback(null, './uploads')
// 	},
// 	filename: function(req, file, callback) {
// 		console.log(file)
// 		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
// 	}
// });

/* POST */
router.post('/addEmployee' , userController.addEmployeeValidator , userController.addEmployee);
router.delete("/deleteEmployee" , userController.commonValidator , userController.deleteEmployee);
router.get("/readEmployee" , userController.commonValidator , userController.readEmployee);
router.put("/updateEmployee" , userController.commonValidator , userController.updateEmployee);
router.get("/readAllEmployee" , userController.readAllEmployee);

router.post("/uploadUserPicture",upload(),userController.commonValidator,userController.userIdMiddleWare,profileController.uploadUserPicture);
// router.put("/updateUserPicture",upload(),profileController.updateUserPicture);
// router.delete("/deleteUserPicture",profileController.deleteUserPicture);
router.get("/readUserPictures" ,userController.commonValidator ,
                                userController.userIdMiddleWare,profileController.readUserPictures);
router.get("/readAllUserPictures",profileController.readAllUserPictures);

module.exports = router;

// Using multer
// function imageUploadingMiddleWare(req,res,next){
//     var upload = multer({
//         storage: storage,
//         fileFilter: function(req, file, callback) {
//             var ext = path.extname(file.originalname)
//             if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
//                 return callback(next({msg:'Only images are allowed'}), null)
//             }
//             callback(null, true)
//         }
//     }).single('image');
    
//     upload(req, res, function(err) {
//         next(err);
//     })
// }