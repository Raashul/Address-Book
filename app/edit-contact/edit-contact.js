(function(){
	angular.module('Address-Book')
		.controller('EditContact',[ '$scope', '$http', '$state', '$stateParams', "$location",
		 function($scope,  $http, $state, $stateParams, $location){

		 	$scope.id = $stateParams.id;

		 		var request = {
					id: $scope.id
				};

				$http.post('api/contact/edit', request).success(function(response){

					console.log('found user');
					console.log(response);
				
					//Initialize variables
					$scope.edit_name = response.name;
					$scope.edit_email = response.email;
					$scope.edit_phone = response.phone;
					$scope.edit_address = response.address;
					$scope.edit_notes = response.notes;

				}).error(function(err){
					console.log(err);
				})


	//Click event when user submits the new updated user
			$scope.submitEditedUser = function(){
					
				var request = {
		 			name: $scope.edit_name,
		 			phone: $scope.edit_phone,
		 			email: $scope.edit_email,
		 			address: $scope.edit_address,
		 			notes : $scope.edit_notes,
		 			id: $scope.id

		 		}

		 		console.log(request);

				$http.post('api/user/edit', request).success(function(response){
						$scope.updatedUser = response;
						$location.path('/');
				}).error(function(err){
					console.log(err);
				})
			}

	}])

}())