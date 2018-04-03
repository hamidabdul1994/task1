/**
 * @author Hamid Raza Noori
 * @description To handle piture related request
 */
// var upload = require('express-fileupload');
var config = require("../config");
var profileService = require("../services").pictureService;
var userService = require("../services").userService;
var commonService = require("../services").commonService;

module.exports = {
    "readUserPictures":(req,res,next)=>{
        profileService.readByUserPicture(req.userId,(err,profileList)=>{
            if(err)
                return next(err);
            
            var responseObj = commonService.response;
            responseObj.setStatus(true);
            responseObj.setMessage("Successfully read Profile list");
            responseObj.setData(profileList);
        });
    },
    "readAllUserPictures":(req,res,next)=>{
        profileService.readAllPicture((err,profileList)=>{
            if(err)
                return next(err);
            
            var responseObj = commonService.response;
            responseObj.setStatus(true);
            responseObj.setMessage("Successfully read Profile list");
            responseObj.setData(profileList);
        });
    },
    "uploadUserPicture" : (req,res,next)=>{
        var responseObj = commonService.response;
        responseObj.setStatus(true);
        responseObj.setMessage("Successfully uploaded");
        responseObj.setData();
        //image Would be part
            if (req.files && req.files.image) {
            if (profileService.isImage(profileService.convertToHexCode(req.files.image.data))) {
                var file = req.files.image;
                filename = file.name
                file.mv(config.imageLocation + filename , (err) => {
                if (err) {
                    return next(err);
                } 
                res.send(responseObj);
                });
            } else {
                return next({ msg :"You needs to upload image file!"});
            }
        }else{
            if(req.body.imageUrl){
                profileService.fetchUrlData(req.body.imageUrl,function(err,imageData){
                    if (profileService.isImage(profileService.convertToHexCode(imageData))) {
                        res.send(responseObj);
                    }else{
                        return next({ msg :"You needs to pass image url!"});
                    }
                });
            }else{
                return next({ msg :"You needs to upload image or image Url!"});
            }
        }
    },
    "updateUserPicture":(req,res,next) => {

    }
};