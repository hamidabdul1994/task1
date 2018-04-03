'use strict';
var mongoose = require('mongoose'),
extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;

var BaseSchema = new Schema({
      updatedAt: Date,
      isDeleted:{
        type:String,
        default:false
      },
      createdAt:{
          type:Date,
          default : Date.now
      }
    });
  module.exports = BaseSchema; 