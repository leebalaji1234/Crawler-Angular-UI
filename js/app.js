$appconfig = {"host":"http://localhost:3000"}; 
angular
.module('btProduct', ['ngRoute','ngAnimate','tab-directives','project-directives'])
.config(function ($routeProvider) {
    $routeProvider
      .when('/projects', { 
        // templateUrl: 'partials/projects/projects.html'
         
       }) 
      .otherwise({
        redirectTo: '/'
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
});
