require('angular');
require('angular-ui-router');
require('angular-aria');
require('angular-animate');
require('angular-material');
require('./components/home/home.js');
require('./components/about/about.js');
require('./components/login/login.js');
require("./services/user.service.js");

var app = angular.module('myApp', ['ui.router','ngMaterial','myApp.home','myApp.about' ,'myApp.login','myApp.user.service']);

app.config(function($stateProvider, $urlRouterProvider) {
console.log(config);

	$stateProvider

	.state('login', {
		url: "/login",
		templateUrl : "app/components/login/login.html"
	})
	.state('signup', {
		url: "/signup",
		templateUrl : "app/components/signup/signup.html"
	})
	.state('home', {
		url: "/",
		views : {
			"" : {
				templateUrl:"app/components/home/home.html"
			},
			"header@home":{
				templateUrl:"app/shared/header/header.html"
			}
		}
	})
	.state('about', {
		url: "/about",
		views : {
			"" : {
				templateUrl:"app/components/about/about.html"
			},
			"header@about":{
				templateUrl:"app/shared/header/header.html"
			}
		}
	});
	$urlRouterProvider.otherwise("/");
});
