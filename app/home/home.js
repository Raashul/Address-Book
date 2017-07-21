(function(){
	angular.module('Address-Book')
		.controller('HomeController',[ '$scope', "$rootScope", '$http', '$state', '$interval', "$location" , '$window',
		 function($scope, $rootScope,  $http, $state, $interval, $location, $window){

		function getWaste(initial){

			$http.get('api/home/getHomePage').success(function(response){
				console.log(response);

			});
		};

			//Setting/Updating the homepage every second
			//Interval will call the GET method every 5 seconds
			getWaste(true);

			$interval(function(){
				getWaste(false);
				// if($scope.incommingPost){
				// $scope.difference = $scope.incommingPost.length - $scope.users.length;

				// }
			}, 100000);

			$scope.addNewContacts = function(){
				$scope.display_form = true;
			}

			$scope.submitNewUser = function(){
				console.log($scope.name);
			}

		

	}])

}())