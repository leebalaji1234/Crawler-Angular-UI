$appconfig = {"host":"http://localhost:3000"}; 
 var tabname;
angular
.module('btProduct', ['ngRoute','ngAnimate','tab-directives','project-directives'])
.config(function ($routeProvider) {
    $routeProvider
      .when('/projects', { 
        template: function($scope){ $scope.projecttab = 'project';  return '<projectscontainer></projectscontainer>' },

         
       })
       .when('/data-sources', { 
        template: "<projectdata ng-show=\"checkProjectTab('data')\"  ></projectdata>"
         
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
 