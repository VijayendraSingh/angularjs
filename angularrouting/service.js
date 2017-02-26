(function(){
    //Create a module
    var app = angular.module("serviceview");
    //Create a controller
    var ServiceCtrl = function($scope,$interval,$location){
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
			if(countdowninterval){
				$interval.cancel(countdowninterval);
				countdowninterval=null;
				$scope.countdown=null;
			}
			$location.path("/user/"+username);
        };
		
		
		$scope.username ="angular";
		$scope.countdown = 5;
		startCountdown();
    };
    
    
    //Register controller
    app.controller("ServiceCtrl",ServiceCtrl);
    
}());