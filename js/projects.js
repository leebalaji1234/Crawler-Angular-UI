angular.module('project-directives', ['angularUtils.directives.dirPagination','ngResource'])
.directive("projects", function() {
  return {
    restrict: 'E',
    templateUrl: "partials/projects/projects-list.html",
    controller:function($scope,$http,ProjectsFactory,ProjectFactory,$location){
    	 $scope.projects = [];
       $scope.currentPage = 1;
       $scope.pageSize = 2;
       $scope.domains = [];
    	 // $http.get('js/projects.json').success(function(data){
      //          $scope.projects = data;
      //   });
        $scope.projects = ProjectsFactory.query(); 
       $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
       };

       $scope.editProject = function (projectId) {
            // $location.path('/project-detail/' + projectId);

            $scope.project = ProjectFactory.show({id: projectId});
            $scope.projectForm.project_name.$setValidity('duplicate',true);
       };
       $scope.newProject = function () {
            // $location.path('/project-detail/' + projectId);
            $scope.project = {};
       };

    }
  };
})
.directive("project", function() {
  return {
    restrict: 'E',
    templateUrl: "partials/projects/project.html",
    controller:function($scope,$http,ProjectsFactory,ProjectFactory){
       $scope.project= {};
         
        $scope.reset = function() {
            if($scope.projectForm) {  
              $scope.projectForm.$setPristine();
              // $scope.projectForm.$setUntouched();
            } 
        };

        $scope.updateProject = function () {
           
          if($scope.projectForm.$valid){
            if($scope.project.id == "" || $scope.project.id == undefined){
              ProjectsFactory.create($scope.project,function(response){ 
                 $scope.projects = ProjectsFactory.query();
                 $scope.project={};
                 $scope.reset();
              });
            }else{
              ProjectFactory.update($scope.project,function(response){ 
                 $scope.project={};
                 $scope.reset();
                 $scope.projects = ProjectsFactory.query();
              });

            }
          }
            // $location.path('/user-list');
        }
        $scope.verifyDuplicate = function() {
           var sorted,isDuplicate, i; 
            sorted = $scope.projects;  
            for(i = 0; i < $scope.projects.length; i++) {  
              
              if(($scope.project.id == "" || $scope.project.id != undefined) && ($scope.project.id != sorted[i].id)){ 
                isDuplicate = ((sorted[i] && sorted[i].project_name == $scope.project.project_name));
              }else{
                isDuplicate = ((sorted[i] && sorted[i].project_name == $scope.project.project_name));
              }
             $scope.projectForm.project_name.$setValidity('duplicate',!isDuplicate);
             if (isDuplicate == true){return false;}
           }
        }

    }
  };
}).factory('ProjectFactory', function ($resource) {
    return $resource($appconfig.host + '/projects/:id.json', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
}).factory('ProjectsFactory', function ($resource) { 
    return $resource($appconfig.host + '/projects.json', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
}).factory('$exceptionHandler', function() {
  return function(exception, cause) {
    exception.message += ' (caused by "' + cause + '")'; 
    throw exception;
  } 
}).directive("projectdata", function() {
  return {
    restrict: 'E',
    templateUrl: "partials/projects/project-data.html",
    controller:function(){
      
    }
  };
}).directive("projectdatawebform", function() {
  return {
    restrict: 'E',
    templateUrl: "partials/projects/project-data-web.html",
    controller:function(){
      
    }
  };
}).directive("projectdataweblist", function() {
  return {
    restrict: 'E',
    templateUrl: "partials/projects/project-data-web-list.html",
    controller:function(){
      
    }
  };
}).directive("projectdatafbform", function() {
  return {
    restrict: 'E',
    templateUrl: "partials/projects/project-data-facebook.html",
    controller:function(){
      
    }
  };
}).directive("projectdatafblist", function() {
  return {
    restrict: 'E',
    templateUrl: "partials/projects/project-data-facebook-list.html",
    controller:function(){
      
    }
  };
}).directive("projectdatatwitterform", function() {
  return {
    restrict: 'E',
    templateUrl: "partials/projects/project-data-twitter.html",
    controller:function(){
      
    }
  };
}).directive("projectdatatwitterlist", function() {
  return {
    restrict: 'E',
    templateUrl: "partials/projects/project-data-twitter-list.html",
    controller:function(){
      
    }
  };
}).directive("projectdatainstagramform", function() {
  return {
    restrict: 'E',
    templateUrl: "partials/projects/project-data-instagram.html",
    controller:function(){
      
    }
  };
}).directive("projectdatainstagramlist", function() {
  return {
    restrict: 'E',
    templateUrl: "partials/projects/project-data-instagram-list.html",
    controller:function(){
      
    }
  };
});

