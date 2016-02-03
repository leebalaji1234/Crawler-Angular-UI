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
         
        $scope.resetweb = function() {
            if($scope.datawebForm) {  
              $scope.datawebForm.$setPristine();
              // $scope.projectForm.$setUntouched();
            } 
        };

        $scope.updateWeb = function () {
           
          if($scope.datawebForm.$valid){
            if($scope.dataweb.id == "" || $scope.dataweb.id == undefined){
              DataWebsFactory.create($scope.dataweb,function(response){ 
                 $scope.datawebs = DataWebsFactory.query();
                 $scope.dataweb={};
                 $scope.resetweb();
              });
            }else{
              DataWebFactory.update($scope.dataweb,function(response){ 
                 $scope.dataweb={};
                 $scope.resetweb();
                 $scope.datawebs = DataWebsFactory.query();
              });

            }
          }
            // $location.path('/user-list');
        }
        $scope.verifyWebDuplicate = function() {
           var sorted,isDuplicate, i; 
            sorted = $scope.datawebs;  
            for(i = 0; i < sorted.length; i++) {  
              
              if(($scope.dataweb.id == "" || $scope.dataweb.id != undefined) && ($scope.dataweb.id != sorted[i].id)){ 
                isDuplicate = ((sorted[i] && sorted[i].url_collection_name == $scope.dataweb.url_collection_name));
              }else{
                isDuplicate = ((sorted[i] && sorted[i].url_collection_name == $scope.dataweb.url_collection_name));
              }
             $scope.datawebForm.url_collection_name.$setValidity('duplicate',!isDuplicate);
             if (isDuplicate == true){return false;}
           }
        }
    }
  };
}).directive("projectdataweblist", function() {
  return {
    restrict: 'E',
    templateUrl: "partials/projects/project-data-web-list.html",
    controller:function($scope,DataWebsFactory,DataWebFactory){
      
      $scope.datawebs = [];
      $scope.webcurrentPage = 1;
      $scope.webpageSize = 2; 
      $scope.datawebs = DataWebsFactory.query(); 
       $scope.sortweb = function(keyname){
        $scope.websortKey = keyname;   
        $scope.webreverse = !$scope.webreverse;  
       }; 
        
       $scope.editDataWeb = function (dataWebId) {
             
            $scope.dataweb = DataWebFactory.show({id: dataWebId});
            $scope.datawebForm.url_collection_name.$setValidity('duplicate',true);
       };
       $scope.deleteDataWeb = function (dataWebId) {
            if(confirm('Are you sure want to delete?')){
              DataWebFactory.delete({id: dataWebId});
              $scope.datawebs = DataWebsFactory.query();
            }  
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
    controller:function($scope,DataSocialsFactory){ 
     $scope.datasocial= {}; 
     
       $scope.resetSocial = function(formName) {
            if($scope.formName) {  
              $scope.formName.$setPristine();
              // $scope.projectForm.$setUntouched();
            } 
        };

        // $scope.updateSocial = function (formName) {
           
        //   if($scope.formName.$valid){
        //     if($scope.datasocial.id == "" || $scope.datasocial.id == undefined){
        //       DataSocialsFactory.create($scope.datasocial,function(response){ 
        //          $scope.datasocials = DataSocialsFactory.query({project_id:$scope.project_id,channel_id:$scope.channel_id});
        //          $scope.datasocial={};
        //          $scope.resetSocial(formName);
        //       });
        //     }else{
        //       // DataSocialFactory.update($scope.datasocial,function(response){ 
        //       //    $scope.datasocial={};
        //       //    $scope.resetSocial(formName);
        //       //    $scope.datasocials = DataSocialsFactory.query({project_id:$scope.project_id,channel_id:$scope.channel_id});
        //       // });

        //     }
        //   }
        //     // $location.path('/user-list');
        // }
      //   $scope.verifyfbDuplicate = function() {
      //      var sorted,isDuplicate, i; 
      //       sorted = $scope.datafbs;  
      //       for(i = 0; i < sorted.length; i++) {  
              
      //         if(($scope.datafb.id == "" || $scope.datafb.id != undefined) && ($scope.datafb.id != sorted[i].id)){ 
      //           isDuplicate = ((sorted[i] && sorted[i].url_collection_name == $scope.dataweb.url_collection_name));
      //         }else{
      //           isDuplicate = ((sorted[i] && sorted[i].url_collection_name == $scope.dataweb.url_collection_name));
      //         }
      //        $scope.datawebForm.url_collection_name.$setValidity('duplicate',!isDuplicate);
      //        if (isDuplicate == true){return false;}
      //      }
      //   }
    }
  };
}).directive("projectdatafblist", function() {
  return {
    restrict: 'E',
    templateUrl: "partials/projects/project-data-facebook-list.html",
    controller:function($scope,DataSocialsFactory){
      $scope.datasocials = []; 

      $scope.listSocials = function(){
        if(($scope.project_id != "" || $scope.project_id != undefined) && ($scope.channel_id != "" || $scope.channel_id != undefined) ){
          dataParams = {project_id:$scope.project_id, channel_id:$scope.channel_id}; 
          $scope.datasocials = DataSocialsFactory.query(dataParams); 
        }
      };

      
      
      
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
}).factory('DataSocialsFactory', function ($resource) { 
    return $resource($appconfig.host + '/projects/:project_id/channels/:channel_id/source_socials.json', {}, {
        query: { method: 'GET', params:{project_id: '@project_id',channel_id: '@channel_id'},isArray: true },
        create: { method: 'POST' }
    })
});

