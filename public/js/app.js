// Declare app level module which depends on filters, and services
angular.module('slimproject', ['ngResource', 'ngRoute', 'ui.bootstrap', 'ui.date', 'ngResource', 'ngSanitize'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home/home.html',
        controller: 'HomeController'})
        .when('/contact', {
          templateUrl: 'views/contact/contact.html',
          controller: 'ContactController'})
        .when('/about', {
          templateUrl: 'views/about/about.html',
          controller: 'AboutController'})
        .when('/news', {
          templateUrl: 'views/news/news.html',
          controller: 'NewsController'})
        .when('/users', {
          templateUrl: 'views/user/user.html',
          controller: 'UserController'})
        .when('/add', {
          templateUrl: 'views/user/add-user.html',
          controller: 'AddController'})
        .when('/edit/:id', {
          templateUrl: 'views/user/edit.html',
          controller: 'EditController'})
      .otherwise({redirectTo: '/'});
  }]);
