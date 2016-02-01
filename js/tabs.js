angular.module('tab-directives', [])
.directive("tabs", function() {
  return {
    restrict: 'E',
    templateUrl: "partials/tab.html",
    controller:function($scope,$location){
      $scope.project_sel_id  = false;
      $scope.projectselected = ""; 
      $scope.projecttab = 'project';
      $scope.datatab = 'web'; 
      if($location.path() != ''){
        $scope.tab = $location.path();
      }else{
        $scope.tab = "/dashboard";
      }
      $scope.checkProjectTab = function(tabName){
        return $scope.projecttab === tabName;
      }
      $scope.checkDataTab = function(tabName){
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
        $scope.projectselected  = selectedId;
        $scope.setprojectTab(tabName);
      };


    }
  };
});