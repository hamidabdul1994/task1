/***
 * @description Purpose to handle common services
 * @author Hamid Raza Noori
 ***/
function CommonService(){

}

CommonService.prototype.response = new Response();

module.exports = new CommonService() ;




//function Hoisting
function Response(status,message,data){
    this.status = status || false;
    this.message = message || "";
    this.data = data || {};
}

Response.prototype.setStatus = function(status){
    this.status = status;
}

Response.prototype.setMessage = function(message){
    this.message = message;
}

Response.prototype.setData = function(data){
    this.data = data;
}