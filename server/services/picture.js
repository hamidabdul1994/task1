var request = require('request');
var config = require("../config");
var ProfileModel = require("../model").profileModel;

function PictureService(){
    this.imageHexCode = {
        jpg: 'ffd8ffe0',
        png: '89504e47',
        gif: '47494638'
    };
    this.options = {
        method: 'GET',
        url: "",
        encoding: null // keeps the body as buffer
    };
};

PictureService.prototype.isImage = function(hexCode){
    return ( hexCode == this.imageHexCode.jpg || hexCode == this.imageHexCode.png ||
             hexCode == this.imageHexCode.gif );
};

PictureService.prototype.convertToHexCode = function(stringData){
        return stringData.toString('hex',0,4);
}

PictureService.prototype.fetchUrlData = function(url,callback){
    this.options.url = url;
    request(this.options, function (err, response, body) {
        if(err){
            return callback(err);
        }
        return callback(null,body);
    })
}

/**
 * 
 * @param {*File Object} files 
 * @param {*return err,done along with function execute of callback } callback 
 */
PictureService.prototype.uploadImage = function(files,callback){
    if (this.isImage(this.convertToHexCode(files.filename.data))) {
        var file = files.filename
        filename = file.name
        file.mv(__dirname + config.imageLocation + filename ,callback);
    }else{
        callback("You needs to upload image");
    }
};


module.exports = new PictureService();