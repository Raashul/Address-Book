(function(){
	angular.module('Address-Book')
		.controller('HomeController',[ '$scope',"$rootScope", '$http', '$state', '$interval', "$location" 
			, '$window', function($scope, $rootScope,  $http, $state, $interval, $location, $window){

		 	$scope.display_address_book = true;
		 	$scope.display_address_button = true;


		function getWaste(initial){

			$http.get('api/home/getHomePage').success(function(response){
				$scope.users = response;
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

			
			$scope.hideEditForm = function(){
				console.log('testing');
				$scope.display_edit_form = false;
			}
			
			$scope.delete_contact = function(id){
				
				var request = {
					id: id
				};
				console.log(request);

				$http.post('api/user/delete', request).success(function(data){
					console.log(data);
					$scope.users = data;
					console.log('success');
				}).error(function(err){

				})
			}

	}])

}())