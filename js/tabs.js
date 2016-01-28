angular.module('tab-directives', [])
.directive("tabs", function() {
  return {
    restrict: 'E',
    templateUrl: "partials/tab.html",
    controller:function($scope,$location){ 
      $scope.projecttab = '';
      $scope.datatab = 'web';

      if($location.path() != ''){
        $scope.tab = $location.path();
      }else{
        $scope.tab = "/dashboard";
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
        $scope.projecttab = '';
        $scope.datatab = 'web';
      };


    }
  };
});