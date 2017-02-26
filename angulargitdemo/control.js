(function (){
    //Intialze angluar app using ng-module directive
    var app = angular.module("githubviewer",[])
    //Define controller
    var UserCtrl = function($scope,$http){
        var onUserComplete = function(response){
            $scope.user = response.data;
        };
        
        var onError = function(reason){
            $scope.errormessage = "Could not fetch the user";
        };
        
        $scope.search =function(username){
            $http.get("https://api.github.com/users/"+username).then(onUserComplete,onError);
        };
        
        $scope.username = "angular";
        $scope.message = "GitHub Info"
        
        
    };
    //Register controller with model
    app.controller("UserCtrl",["$scope","$http",UserCtrl])
    
}());