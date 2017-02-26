(function(){
    //Create a module
    var app = angular.module("gamificationview",[]);
    //Create a controller
    var GameCtrl = function($http,$scope,$interval,$log){
        
        
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
			$http.get("https://api.github.com/users/"+username)
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
    app.controller("GameCtrl",["$http","$scope","$interval","$log",GameCtrl]);
    
}());