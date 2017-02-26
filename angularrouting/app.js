(function(){
	var app = angular.module("serviceview",["ngRoute"]);
	
	app.config(function($routeProvider){
		$routeProvider
					  .when("/main",{
						templateUrl: "main.html",
						controller: "ServiceCtrl"
					   })
						.when("/user/:username",{
							templateUrl:"userdetails.html",
							controller: "UserController"
						})
						.when("/repo/:username/:reponame",{
							templateUrl:"repo.html",
							controller: "RepoController"
			
						})
					   .otherwise({redirectTo:"/main"});	
	});
}());