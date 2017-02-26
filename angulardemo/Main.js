(function(){
    var app = angular.module("githubViewer", []);
    var Mainctrl = function($scope){
        $scope.username = "angular";
    };
    
    app.controller("Mainctrl",["$scope",Mainctrl])
}());