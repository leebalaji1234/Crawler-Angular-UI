angular.module('tab-directives', [])
.directive("tabs", function() {
  return {
    restrict: 'E',
    templateUrl: "partials/tab.html",
    controller:function($scope,$location){
      $scope.project_sel_id  = false;
      $scope.project_id = ""; 
      // $scope.projecttab = tabname;
      $scope.datatab = 'web'; 
      $scope.channel_id = "";
      $scope.isDisplayed = false;
      
      $scope.selectChannel  = function(channelId){
          $scope.channel_id = channelId; 
          $scope
      };

      // if($location.path() != ''){
      //   $scope.tab = $location.path();
      // }else{
      //   $scope.tab = "/dashboard";
      // }
       

      $scope.checkProjectTab = function(tabName){ 
        // console.log("TabName is ::" + $scope.projecttab);
        return $scope.projecttab === tabName;
      }
      $scope.checkDataTab = function(tabName){
        // console.log("PID ::::"+ $scope.project_id);
        if($scope.project_id == ''){
          $location.path("/projects");
        }
        return $scope.datatab === tabName;
      }
      $scope.setdataTab = function(tabName){
        $scope.datatab = tabName; 
      }
      $scope.setprojectTab = function(tabName){
        $scope.projecttab = tabName;
        $scope.datatab = 'web';
      }

      $scope.setTab = function(menuName){ 
        $scope.tab = "/"+menuName;
        $scope.projecttab = 'project';
        $scope.datatab = 'web';
      };
      $scope.setSelectedProject = function(selectedId,tabName){
        $scope.project_sel_id = true;
        $scope.project_id  = selectedId;
        $scope.setprojectTab(tabName);
        $scope.isDisplayed = true;
       
        // $scope.listWebs();
         // $scope.$eval(listWebs()); 
      };
      

    }
  };
});