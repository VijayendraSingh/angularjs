(function(){
    //Create angular module
    //Create controller
    var app = angular.module("nestedcallviewer",[])
    
    var NestedCtrl = function($http,$scope){
        
        $scope.search = function(username){
            $http.get("https://api.github.com/users/"+username)
                 .then(onUserComplete,onError)
        };
        
        var onUserComplete = function(response){
            $scope.user = response.data;
            $http.get($scope.user.repos_url).then(onRepos,onError);
        };
        
        var onError = function(reason){
            $scope.error = "Not able to fetch data";
        };
        
        var onRepos = function(response){
            $scope.repos = response.data;
        }
        
        
    $scope.username = "angular";
    $scope.message = "GitHub Info";
        
        
    };
    
    //Register controller
    app.controller("NestedCtrl",["$http","$scope",NestedCtrl])
    
    
    
}());