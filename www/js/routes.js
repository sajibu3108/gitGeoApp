angular.module('panda.routes', [])

	.config(function($stateProvider, $urlRouterProvider){
	  $stateProvider
		.state('home', {
			url: '/home',
			controller: 'HomeCtrl',
			templateUrl: 'templates/home.html'
		})

	  $urlRouterProvider.otherwise('/home');

	});
