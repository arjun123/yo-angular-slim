angular.module('slimproject')
  .controller('HomeController', ['$scope', function ($scope) {
  }]);

angular.module('slimproject')
.controller('ContactController', ['$scope', '$http', function ($scope, $http) {
    $scope.message = 'Look! I am an contact page.';
    console.log('test');
 //    $http.get('index.php/contact').success(function(data) {
 //   $scope.users = data;
 // });
        $http({
            url: '/contact',
            method: "GET",
            params: {}
        }).success(function(data, status, headers, config) {
            $scope.users = data;
        });
}]);
angular.module('slimproject')
.controller('AboutController', ['$scope', function ($scope) {
    $scope.message = "About page Comming soon";
}]);
angular.module('slimproject')
.controller('NewsController', ['$scope', function ($scope) {
    $scope.news = "News Comming soon";
}]);
angular.module('slimproject')
.controller('EditController', ['$scope', '$http', function ($scope, $http) {
    $http.post('/edit/:id', 1).success(function(){
      $scope.reset();
      $scope.activePath = $location.path('/users');
    });
}]);
angular.module('slimproject')
.controller('AddController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.master = {};
    $scope.activePath = null;
    $scope.add_new = function(user, AddNewForm) {
       $http.post('/add', user).success(function(){
         $scope.reset();
         $scope.activePath = $location.path('/users');
       });
    $scope.reset = function() {
         $scope.user = angular.copy($scope.master);
       };
       $scope.reset();
     };
}]);
