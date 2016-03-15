$appconfig = {
  "host":"http://52.74.156.37:3000",
  "ssoserver":"http://52.74.156.37:7777/",
  "ssoclient":"http://52.74.156.37/btinfoactivweb/home.html",
  "ssologout":"http://52.74.156.37:7777/logout?service=http://52.74.156.37/btinfoactivweb/home.html",

}; 
 var tabname;
angular
.module('btProduct', ['ngRoute','ngAnimate','ngCookies','tab-directives','project-directives']).config(function ($routeProvider) {
    $routeProvider
      .when('/projects', { 
        template: function($scope){ $scope.projecttab = 'project';  return '<projectscontainer></projectscontainer>' },
        resolve: {
        load: function (httpauth) {
                 return httpauth;
                }
          } 
       })
       .when('/data-sources', { 
        template: "<projectdata ng-show=\"checkProjectTab('data')\"  ></projectdata>",
        resolve: {
        load: function (httpauth) {
                 return httpauth;
                }
          } 
         
       }).when('/ontologies', { 
        template: "<ontologies></ontologies><projectlist></projectlist>",
        resolve: {
        load: function (httpauth) {
                 return httpauth;
                }
          } 
         
       }).when('/domains', { 
        template: "<domains></domains><projectlist></projectlist>",
        resolve: {
        load: function (httpauth) {
                 return httpauth;
                }
          } 
         
       }).when('/tools', { 
        template: "<tools></tools><projectlist></projectlist>",
        resolve: {
        load: function (httpauth) {
                 return httpauth;
                }
          } 
         
       })   
      .otherwise({
        redirectTo: '/',
        resolve: {
        load: function (httpauth) {
                 return httpauth;
                }
          } 
      });
})
.config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]).directive("projectscontainer", function() {
  return {
    restrict: 'E',
    templateUrl: "partials/projects/projects.html",
    controller:function($scope){ 
       
    }
  };
}).run(run).factory('httpauth', function ($http) {
      var data = {};
      var promise = $http.get($appconfig.host + '/users/auth', { cache: true }).then(function (response) {
                data = response.data;
            });
      return data;
});


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    url = url.toLowerCase(); // This is just to avoid case sensitiveness  
    name = name.replace(/[\[\]]/g, "\\$&").toLowerCase();// This is just to avoid case sensitiveness for query parameter name
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getUser(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
    }

    return false;
 }


run.$inject = ['$rootScope' ,'$location' , '$cookieStore', '$timeout', '$http','$window'];
    function run($rootScope, $location, $cookieStore, $timeout, $http,$window) {

              var currentlocation = $location.host();              
              var tgt =  getUser('tgt');            
              var paramValue = getParameterByName('ticket')||"";
    
  if((angular.isUndefined(tgt) || tgt ===false) && tgt.length !=33){
     $window.location.href = $appconfig.ssoserver +'login?service='+$appconfig.ssoclient;
  }

  if(!angular.isUndefined(paramValue) && paramValue!="" && paramValue.length ==32){
    var paramValue = getParameterByName('ticket');
   // alert(paramValue);
    $cookieStore.put('bttoken', paramValue);
    $http.defaults.headers.common['x-auth'] = paramValue;
  }

                var xauth =  decodeURI(getUser('bttoken')); 
                xauth =  xauth.slice(1, -1); 
            //    alert(xauth);
                if(!angular.isUndefined(xauth) || xauth ===false){
                  $http.defaults.headers.common['x-auth'] = xauth;

                }
          

}
 