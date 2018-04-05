'use strict';
var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    BaseModel = require("./base"),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;


const UserSchema = BaseModel.extend({
        firstName: String,
        lastName: String,
        emailAddress : {
            type:String,
            required:true
            // ,unique:true
        },
        password : {
          type : String

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

    UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
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

    UserSchema.statics.login = function (userObj , callback) {
      this.findOne({ emailAddress:userObj.emailAddress}, function(err, user) {
        if (err) callback(err);
        if (!user)
          return callback("No E-mail exist");

        // test a matching password
        user.comparePassword(userObj.password, function(err, isMatch) {
            if (err) return callback(err);
            if(isMatch)
              return callback(null , user); // -> Password123: true
            callback("No password Match")
        });
    })
  }

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
