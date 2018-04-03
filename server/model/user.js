'use strict';
var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
var BaseModel = require("./base");


const UserSchema = BaseModel.extend({ 
        firstName: String, 
        lastName: String, 
        emailAddress : {
            type:String,
            required:true
            // ,unique:true
        },
        phoneNumber : {
            type:String,
            required:true
            // ,unique:true    
        }
    });
    
    UserSchema.set('toJSON', {
        virtuals: true,
        transform: function(doc, ret, field) {
            ret.userId = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    /**
     * @description To save user
     **/
    UserSchema.statics.saveUser = function(userObj,callback){
        var userObject = new this(userObj);
        userObject.save(callback);
    };

    /****
     * @description read Employee Details emailAddress
     ***/
    UserSchema.statics.readUser = function(emailAddress,callback){
        this.findOne({emailAddress : emailAddress , isDeleted : false},{
            createdAt : 1,firstName : 1,lastName : 1,emailAddress : 1,phoneNumber : 1
        },callback);
    };

    /****
     * @description to update Employee Details by emailAddress
     ***/
    UserSchema.statics.updateUser = function(userObj,callback){
        if(!userObj.emailAddress){
            return callback("emailAddress is required for update");
        }
        this.update({emailAddress : userObj.emailAddress , isDeleted : false},
            { $set: userObj },callback);
    };


    /****
     * @description to remove Employee Details by emailAddress
     ***/
    UserSchema.statics.removeUser = function(emailAddress,callback){
        if(!emailAddress){
            return callback({msg:"emailAddress is required for update"});
        }
        this.update({ emailAddress : emailAddress , isDeleted : false },
            {$set : { isDeleted : true }},callback);
    };

    UserSchema.statics.readAllUser = function(callback){
        this.find({isDeleted:false},{
            createdAt : 1,firstName : 1,lastName : 1,emailAddress : 1,phoneNumber : 1
        },callback);
    }
    // UserSchema.methods.
var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel; 