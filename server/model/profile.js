
'use strict';
var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId,
    extend = require('mongoose-schema-extend');
var BaseModel = require("./base");


const ProfileSchema = BaseModel.extend({ 
        profileUrl: String,
        likes : {
            type:Number,
            default : 0
        },
        userId : {
            ref : "User",
            type : ObjectId,
            required : true
        }
    });
    
    ProfileSchema.set('toJSON', {
        virtuals: true,
        transform: function(doc, ret, field) {
            ret.profileId = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    /**
     * @description To save user
     **/
    ProfileSchema.statics.saveProfile = function(profileObj,callback){
        var profileObject = new this(profileObj);
        profileObject.save(callback);
    };

    /****
     * @description read Employee Details emailAddress
     ***/
    ProfileSchema.statics.readUserProfile = function(userId,callback){
        this.find({userId : userId , isDeleted : false},callback);
    };

    /****
     * @description to update Employee Details by emailAddress
     ***/
    ProfileSchema.statics.updateProfile = function(profileObj,callback){
        if(profileObj.profileId){
            return callback("profileId is required for update");
        }
        this.update({_id : profileObj.profileId , isDeleted : false},
            { $set: profileObj },callback);
    };


    /****
     * @description to remove Employee Details by emailAddress
     ***/
    ProfileSchema.statics.removeProfile = function(profileId,callback){
        if(userObj.emailAddress){
            return callback("profileId is required for update");
        }
        this.update({ _id : profileId , isDeleted : false },
            {$set : { isDeleted : true }},callback);
    };
    // ProfileSchema.methods.
var ProfileModel = mongoose.model('Profile', ProfileSchema);

module.exports = ProfileModel; 