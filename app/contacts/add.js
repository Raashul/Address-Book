(function(){
	angular.module('Address-Book')
		.controller('AddContacts',[ '$scope', "$rootScope",'$http', '$state', '$interval', "$location" 
			,'$window',function($scope, $rootScope,  $http, $state, $interval, $location, $window){

		 	$scope.submitNewUser = function(){
		 		console.log('testt');
		 		//is in json form
		 		var request = {
		 			name: $scope.name,
		 			phone: $scope.phone,
		 			email: $scope.email,
		 			address: $scope.address,
		 			notes : $scope.notes
		 		}

		 		$http.post('api/user/add', request).success(function(){
		 			console.log('test');
		 			$location.path('/');
		 		}).error(function(err){
		 			console.log(err);
		 		})
		 	}
		

	}])

}())