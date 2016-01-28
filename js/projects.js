angular.module('project-directives', ['angularUtils.directives.dirPagination','ngResource'])
.directive("projectlist", function() {
  return {
    restrict: 'E', 
    templateUrl: "partials/projects/projects-list.html",
    controller:function($scope,$http,ProjectsFactory,ProjectFactory,$location){
    	 $scope.projects = [];
       $scope.currentPage = 1;
       $scope.pageSize = 2;
       $scope.domains = [];
       $scope.projects = ProjectsFactory.query(); 
        
    	  
       $scope.sort = function(keyname){
        $scope.sortKey = keyname;   
        $scope.reverse = !$scope.reverse;  
       };

       $scope.editProject = function (projectId) {
             
            $scope.project = ProjectFactory.show({id: projectId});
            $scope.projectForm.project_name.$setValidity('duplicate',true);
       };
       $scope.newProject = function () {
            
            $scope.project = {};
       };
       $scope.$watch('projectForm', function(projectForm) {
          if(projectForm) {  
              console.log('projectForm in Scope');
          }
          else { 

              console.log('projectForm in out of Scope');
          }        
      });

    }
  };
})
.directive("projectform", function() {
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
    controller:function($scope,ChannelsFactory){
      $scope.channels = [];
      $scope.channels = ChannelsFactory.query(); 

    }
  };
}).directive("projectdatawebform", function() {
  return {
    restrict: 'E',
    templateUrl: "partials/projects/project-data-web.html",
    controller:function($scope,SchedulersFactory,DataWebsFactory,DataWebFactory){
      $scope.schedulers = [];
      $scope.schedulers = SchedulersFactory.query();
      $scope.dataweb= {};
    }
  };
}).directive("projectdataweblist", function() {
  return {
    restrict: 'E',
    templateUrl: "partials/projects/project-data-web-list.html",
    controller:function($scope,DataWebsFactory,DataWebFactory){
      
      $scope.datawebs = [];
      $scope.currentPage = 1;
      $scope.pageSize = 2; 
      $scope.datawebs = DataWebsFactory.query(); 
        
        
       $scope.editDataWeb = function (dataWebId) {
             
            $scope.dataweb = DataWebFactory.show({id: dataWebId});
            $scope.datawebForm.url_collection_name.$setValidity('duplicate',true);
       };
       $scope.newDataWeb = function () {
            
            $scope.dataweb = {};
       };
       $scope.$watch('datawebForm', function(datawebForm) {
          if(datawebForm) {  
              console.log('datawebForm in Scope');
          }
          else { 

              console.log('datawebForm in out of Scope');
          }        
      });
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
}).factory('ChannelsFactory', function ($resource) { 
    return $resource($appconfig.host + '/channels.json', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
}).factory('SchedulersFactory', function ($resource) { 
    return $resource($appconfig.host + '/scheduler_types.json', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
}).factory('DataWebFactory', function ($resource) {
    return $resource($appconfig.host + '/source_webs/:id.json', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
}).factory('DataWebsFactory', function ($resource) { 
    return $resource($appconfig.host + '/source_webs.json', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

