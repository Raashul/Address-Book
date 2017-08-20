(function(){
	angular.module('Address-Book', ['ui.router'])
		.config(function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/');
			$stateProvider

			.state('main',{
				url: '/',
				templateUrl: 'app/home/home.html',
				controller: 'HomeController'
			})

			.state('addNewContacts',{
				url:'/add-contacts',
				templateUrl:'app/contacts/add.html',
				controller: 'AddContacts'
			})

			.state('editContact', {
				url:'/edit-contact/:id',
				templateUrl:'app/edit-contact/edit-contact.html',
				controller: 'EditContact'
			})


		})
}());