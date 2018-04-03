/***
 * @description To handle use request
 * @author Hamid Raza
 ***/
var UserModel = require("../model").userModel;

function UserService(){} 

UserService.prototype.saveUSer = function(userObj,callback){
    UserModel.saveUser(userObj,callback)
}

UserService.prototype.addEmployee = function(userObj,callback){
    this.readUser(userObj.emailAddress,(err,userDoc)=>{
        if(err || userDoc)
            return callback(err || { msg : "User email already exist" });

        this.saveUSer(userObj,callback);
    });
}

UserService.prototype.updateUser = function(userObj,callback){
    UserModel.updateUser(userObj,callback)
}

UserService.prototype.readUser = function(emailAddress,callback){
    UserModel.readUser(emailAddress,callback);
}

UserService.prototype.removeUser = function(emailAddress,callback){
    UserModel.removeUser(emailAddress,callback);
}

UserService.prototype.readAllUser = function(callback){
    UserModel.readAllUser(callback);
}

module.exports = new UserService();