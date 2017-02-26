(function(){
    //Create a module
    var app = angular.module("filterview",[]);
    //Create a controller
    var FilterCtrl = function($http,$scope){
        $scope.search = function(username){
          $http.get("https://api.github.com/users/"+username)
                .then(onUserComplete,onError);
        };
        
        var onUserComplete = function(response){
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                 .then(onRepos,onError);
        };
        
        var onError = function(reason){
          $scope.error = "Not able to fetch data";  
        };
        
        var onRepos = function(response){
            $scope.repos = response.data;
        };
        
        $scope.repoSortOrder = "-stargazers_count";
    };
    
    
    //Register controller
    app.controller("FilterCtrl",["$http","$scope",FilterCtrl]);
    
}());