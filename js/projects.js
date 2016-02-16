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

            $scope.dataweb.project_id = $scope.project_id;
             // console.log($scope.dataweb);
            if($scope.dataweb.id == "" || $scope.dataweb.id == undefined){
              DataWebsFactory.create($scope.dataweb,function(response){ 
                 $scope.datawebs = $scope.listWebs();
                 $scope.dataweb={};
                 $scope.resetweb();
              });
            }else{
              DataWebFactory.update($scope.dataweb,function(response){ 
                 $scope.dataweb={};
                 $scope.resetweb();
                 $scope.datawebs = $scope.listWebs();
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
      $scope.waction = "";
      $scope.datawebs = [];
      $scope.webcurrentPage = 1;
      $scope.webpageSize = 2;  
      $scope.$watch('isDisplayed', function() {
        $scope.listWebs();
       });
       $scope.sortweb = function(keyname){
        $scope.websortKey = keyname;   
        $scope.webreverse = !$scope.webreverse;  
       }; 

       $scope.listWebs = function(){

         if(($scope.project_id != '' && $scope.project_id != undefined)){
          console.log("on load display ::"+ $scope.project_id);
            $scope.datawebs = DataWebsFactory.query({project_id: $scope.project_id});

         }
       }
      
      
       $scope.viewWeb = function (dataWebId) { 
             
            $scope.dataweb = DataWebFactory.show({id: dataWebId}); 
            $scope.waction = "view";
       };
        
       $scope.getSchedulerName = function(schid){
           var temp;
        angular.forEach($scope.schedulers, function(value, key) {
         if(value.id == schid){
            temp = value.scheduler_name;
          return false;
        }
       });
        return temp;

       }
       $scope.editDataWeb = function (dataWebId) {
             
            $scope.dataweb = DataWebFactory.show({id: dataWebId});
            $scope.datawebForm.url_collection_name.$setValidity('duplicate',true);
            $scope.waction = "edit";
       };
       $scope.deleteDataWeb = function (dataWebId) {
            if(confirm('Are you sure want to delete?')){
              DataWebFactory.delete({id: dataWebId},function(response){  
                 $scope.datawebs = $scope.listWebs();
              });
              
            }  
        };

       $scope.newDataWeb = function () {
            
            $scope.dataweb = {};
            $scope.waction = "";
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
    controller:function($scope,DataSocialsFactory,DataSocialsListFactory,DataSocialFactory){
      $scope.datasocial= {};  
       $scope.resetfb = function() {
           
            if($scope.datafbForm) {  
              $scope.datafbForm.$setPristine();
              // $scope.projectForm.$setUntouched();
            } 
        };

      


        $scope.updatefbSocial = function () {
            
          if($scope.datafbForm.$valid){
            if($scope.datasocial.id == "" || $scope.datasocial.id == undefined){

              $scope.datasocial.project_id = $scope.project_id;
              $scope.datasocial.channel_id = $scope.channel_id;

              DataSocialsListFactory.create($scope.datasocial,function(response){ 
                 $scope.listSocials();
                 $scope.datasocial={};
                 $scope.resetfb();
              });
            }else{
              DataSocialFactory.update($scope.datasocial,function(response){ 
                    $scope.datasocial={};
                    $scope.resetfb();
                    $scope.listSocials();
                });

            }
          }
            // $location.path('/user-list');
        }
        $scope.verifyfbDuplicate = function() {
           var sorted,isDuplicate, i; 
            sorted = DataSocialsListFactory.query();  
            for(i = 0; i < sorted.length; i++) {  
              
              if(($scope.datasocial.id == "" || $scope.datasocial.id != undefined) && ($scope.datasocial.id != sorted[i].id)){ 
                isDuplicate = ((sorted[i] && sorted[i].url_collection_name == $scope.datasocial.url_collection_name));
              }else{
                isDuplicate = ((sorted[i] && sorted[i].url_collection_name == $scope.datasocial.url_collection_name));
              }
             $scope.datasocial.collection_name.$setValidity('duplicate',!isDuplicate);
             if (isDuplicate == true){return false;}
           }
        }

    }  
  };
}).directive("projectdatafblist", function() {
  return {
    restrict: 'E',

    templateUrl: "partials/projects/project-data-facebook-list.html",
    controller:function($scope,DataSocialsFactory,DataSocialFactory){
      $scope.datasocials = []; 
      $scope.fbaction = '';
      
      $scope.listSocials = function(){
        if(($scope.project_id != "" || $scope.project_id != undefined) && ($scope.channel_id != "" || $scope.channel_id != undefined) ){
          dataParams = {project_id:$scope.project_id, channel_id:$scope.channel_id}; 
          $scope.datasocials = DataSocialsFactory.query(dataParams); 
        }
      };

      $scope.getProcessStatus = function(code){
           var codeVal;
           if(code == "200"){ codeVal = "In Progress";}
            else if(code == "300"){ codeVal = "Completed";}
              else if(code == "400"){ codeVal = "Failed";}
                else{ codeVal = "Started";}
                return codeVal;
      }

      $scope.newfb = function () {
            
            $scope.datasocial = {};
            $scope.fbaction = "";
       };
     
      
       $scope.editfb = function (dataSocialId) { 
             
            $scope.datasocial = DataSocialFactory.show({id: dataSocialId});  
            $scope.datafbForm.collection_name.$setValidity('duplicate',true);
            $scope.fbaction = "edit";
       };
       $scope.viewfb = function (dataSocialId) { 
             
            $scope.datasocial = DataSocialFactory.show({id: dataSocialId}); 
            $scope.fbaction = "view";
       };
       $scope.deletefb = function (dataSocialId) { 
             
            if(confirm('Are you sure want to delete?')){
              DataSocialFactory.delete({id: dataSocialId});
              $scope.listSocials();
            } 
       };

       
       $scope.$watch('datafbForm', function(datafbForm) {
          if(datafbForm) {  
              console.log('datafbForm in Scope');
          }
          else { 

              console.log('datafbForm in out of Scope');
          }        
      });
      
    }
  };
}).directive("projectdatatwitterform", function() {
  return {
    restrict: 'E',
    templateUrl: "partials/projects/project-data-twitter.html", 
    controller:function($scope,DataSocialsFactory,DataSocialsListFactory,DataSocialFactory){
      $scope.datasocial= {};  
       $scope.resetTSocial = function() {
          
            if($scope.datatwitterForm) {  
               
              $scope.datatwitterForm.$setPristine();
              // $scope.projectForm.$setUntouched();
            } 
        };

      


        $scope.updateTSocial = function () {
            
          if($scope.datatwitterForm.$valid){
            if($scope.datasocial.id == "" || $scope.datasocial.id == undefined){

              $scope.datasocial.project_id = $scope.project_id;
              $scope.datasocial.channel_id = $scope.channel_id;

              DataSocialsListFactory.create($scope.datasocial,function(response){ 
                 $scope.listSocials();
                 $scope.datasocial={};
                 $scope.resetTSocial();
              });
            }else{
              DataSocialFactory.update($scope.datasocial,function(response){ 
                    $scope.datasocial={};
                    $scope.resetTSocial();
                    $scope.listSocials();
                });

            }
          }
            // $location.path('/user-list');
        }
        $scope.verifyTDuplicate = function() {
           var sorted,isDuplicate, i; 
            sorted = DataSocialsListFactory.query();  
            for(i = 0; i < sorted.length; i++) {  
              
              if(($scope.datasocial.id == "" || $scope.datasocial.id != undefined) && ($scope.datasocial.id != sorted[i].id)){ 
                isDuplicate = ((sorted[i] && sorted[i].url_collection_name == $scope.datasocial.url_collection_name));
              }else{
                isDuplicate = ((sorted[i] && sorted[i].url_collection_name == $scope.datasocial.url_collection_name));
              }
             $scope.datasocial.collection_name.$setValidity('duplicate',!isDuplicate);
             if (isDuplicate == true){return false;}
           }
        }

    }  
  };
}).directive("projectdatatwitterlist", function() {
  return {
    restrict: 'E',
    templateUrl: "partials/projects/project-data-twitter-list.html",
    controller:function($scope,DataSocialFactory){
       $scope.newT = function () {
            
            $scope.datasocial = {};
       };
     
      
       $scope.editT = function (dataSocialId) { 
             
            $scope.datasocial = DataSocialFactory.show({id: dataSocialId}); 
            $scope.datafbForm.collection_name.$setValidity('duplicate',true);
       };

       
       $scope.$watch('datatwitterForm', function(datafbForm) {
          if(datafbForm) {  
              console.log('datatwitterForm in Scope');
          }
          else { 

              console.log('datatwitterForm in out of Scope');
          }        
      });
    }
  };
}).directive("projectdatainstagramform", function() {
  return {
    restrict: 'E',
    templateUrl: "partials/projects/project-data-instagram.html",
    controller:function($scope,DataSocialsFactory,DataSocialsListFactory,DataSocialFactory){
      $scope.datasocial= {};  
       $scope.resetISocial = function() {
          
            if($scope.datainstagramForm) {  
               
              $scope.datainstagramForm.$setPristine();
              // $scope.projectForm.$setUntouched();
            } 
        };

      


        $scope.updateISocial = function () {
            
          if($scope.datainstagramForm.$valid){
            if($scope.datasocial.id == "" || $scope.datasocial.id == undefined){

              $scope.datasocial.project_id = $scope.project_id;
              $scope.datasocial.channel_id = $scope.channel_id;

              DataSocialsListFactory.create($scope.datasocial,function(response){ 
                 $scope.listSocials();
                 $scope.datasocial={};
                 $scope.resetISocial();
              });
            }else{
              DataSocialFactory.update($scope.datasocial,function(response){ 
                    $scope.datasocial={};
                    $scope.resetISocial();
                    $scope.listSocials();
                });

            }
          }
            // $location.path('/user-list');
        }
        $scope.verifyIDuplicate = function() {
           var sorted,isDuplicate, i; 
            sorted = DataSocialsListFactory.query();  
            for(i = 0; i < sorted.length; i++) {  
              
              if(($scope.datasocial.id == "" || $scope.datasocial.id != undefined) && ($scope.datasocial.id != sorted[i].id)){ 
                isDuplicate = ((sorted[i] && sorted[i].url_collection_name == $scope.datasocial.url_collection_name));
              }else{
                isDuplicate = ((sorted[i] && sorted[i].url_collection_name == $scope.datasocial.url_collection_name));
              }
             $scope.datasocial.collection_name.$setValidity('duplicate',!isDuplicate);
             if (isDuplicate == true){return false;}
           }
        }

    }
  };
}).directive("projectdatainstagramlist", function() {
  return {
    restrict: 'E',
    templateUrl: "partials/projects/project-data-instagram-list.html",
    controller:function($scope,DataSocialFactory){
       $scope.newI = function () {
            
            $scope.datasocial = {};
       };
     
      
       $scope.editI = function (dataSocialId) { 
             
            $scope.datasocial = DataSocialFactory.show({id: dataSocialId}); 
            $scope.datainstagramForm.collection_name.$setValidity('duplicate',true);
       };

       
       $scope.$watch('datainstagramForm', function(datainstagramForm) {
          if(datainstagramForm) {  
              console.log('datainstagramForm in Scope');
          }
          else { 

              console.log('datainstagramForm in out of Scope');
          }        
      });
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
    return $resource($appconfig.host + '/projects/:project_id/source_webs.json', {}, {
        query: { method: 'GET', params:{project_id: '@project_id'},isArray: true },
        create: { method: 'POST' }
    })
}).factory('DataSocialsFactory', function ($resource) { 
    return $resource($appconfig.host + '/projects/:project_id/channels/:channel_id/source_socials.json', {}, {
        query: { method: 'GET', params:{project_id: '@project_id',channel_id: '@channel_id'},isArray: true },
        create: { method: 'POST' }
    })
}).factory('DataSocialsListFactory', function ($resource) { 
    return $resource($appconfig.host + '/source_socials.json', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
}).factory('DataSocialFactory', function ($resource) { 
    return $resource($appconfig.host + '/source_socials/:id.json', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});

