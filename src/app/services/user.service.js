angular.module('myApp.common.service', [])
.factory('userService',function(){
  var obj = {};
	return obj;
})
.factory('auth',function(){
  var serviceObj = {};
  serviceObj.getToken = getToken;
  serviceObj.setToken = setToken;

  function getToken() {

  }

  function setToken(token) {

  }
	return serviceObj;
})
.factory('injector',function (auth) {
  // config.url = httpService.baseUrl + config.url;
  return {
    request: function(httpConfig) {
      if (auth.getToken()) {
        httpConfig.headers.Authorization = "Bearer " + auth.getToken();
      }

      var rest_request_regex = new RegExp('^.*?/api/(.*)$');
      httpConfig.url = httpConfig.url.replace(rest_request_regex,config.host+'/$1');

      return httpConfig;
    }
  };
})
.config(function($httpProvider) {
  $httpProvider.interceptors.push('injector');
});
