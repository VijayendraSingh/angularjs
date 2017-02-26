(function(){
    //Create a module
    var module = angular.module("serviceview");
    //Create a controller
    var UserController = function($scope,github,$routeParams){
        
        var onUserComplete = function(data){
			$scope.user = data;
            github.getRepos($scope.user)
                 .then(onRepos,onError);
		};
        
        var onError = function(reason){
          $scope.error = "Not able to fetch data";  
        };
        
        var onRepos = function(data){
            $scope.repos = data;
        };
	
		$scope.repoSortOrder = "-stargazers_count";
		$scope.username =$routeParams.username;
		github.getUser($scope.username).then(onUserComplete,onError);
	};
    
    
    //Register controller
    module.controller("UserController",UserController);
    
}());