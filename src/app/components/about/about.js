angular.module('myApp.about', [])
.controller('aboutCtrl',[function(){
	this.aboutText = 'This is the about component!';
}])
.service("aboutService",function () {
	this.name = "fdffd";
});
