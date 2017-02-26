(function(){
    //Create a module
    var app = angular.module("serviceview",[]);
    //Create a controller
    var ServiceCtrl = function(github,$scope,$interval,$log,$location,$anchorScroll){
        
        
        var onUserComplete = function(data){
			$scope.user = data;
            github.getRepos($scope.user)
                 .then(onRepos,onError);
			$location.hash("userdetails");
			$anchorScroll();
        };
        
        var onError = function(reason){
          $scope.error = "Not able to fetch data";  
        };
        
        var onRepos = function(data){
            $scope.repos = data;
        };
		
		var decrementCountdown = function(){
			$scope.countdown -= 1;
			if($scope.countdown < 1){
					$scope.search($scope.username);	
			}
		};
		var countdowninterval=null;
		
		var startCountdown = function(){
			countdowninterval = $interval(decrementCountdown,1000,$scope.countdown);	
		};
        
        $scope.search = function(username){
          $log.info("Searching for :"+ username);
			github.getUser(username)
                .then(onUserComplete,onError);
			if(countdowninterval){
				$interval.cancel(countdowninterval);
				countdowninterval=null;
				$scope.countdown=null;
			}
        };
		
		$scope.repoSortOrder = "-stargazers_count";
		$scope.countdown = 5;
		startCountdown();
    };
    
    
    //Register controller
    app.controller("ServiceCtrl",["github","$scope","$interval","$log","$location","$anchorScroll",ServiceCtrl]);
    
}());