angular.module('slimproject')
  .controller('HomeController', ['$scope', function ($scope) {
  }]);

angular.module('slimproject')
.controller('ContactController', ['$scope', '$http', function ($scope, $http) {
    $scope.message = '<a href="#">Look! I am an contact page.</a>';
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
//add routeParams , location for edit part
// edit part is moved in this section from edit controller
angular.module('slimproject')
.controller('UserController', ['$scope', '$http', '$resource', '$route', function ($scope, $http, $resource, $route) {
    // prepare for ajaxcall to route /users
    var Users = $resource('/users');

    // Get Users data from API
    $scope.users = Users.query();
    /*alternative of above two line
    // $http({
    //     url: '/users',
    //     method: "GET",
    //     params: {}
    // }).success(function(data, status, headers, config) {
    //     $scope.users = data;
    // });
    */
    //update part is come from EditController and it is commented now
    // userId = $routeParams.id;
    // $scope.updateUser = function() {
    //     var User = $resource('/edit/:id', { id: userId }, { update: { method:'PUT' } });
    //
    //     User.update($scope.user,
    //         function(data) {
    //             console.log(data);
    //             // success
    //             $location.path('/users');
    //         },
    //         function(error) {
    //             // error
    //             console.log(error);
    //         }
    //     );
    // }
    // Delete a User then relaod view
    $scope.deleteUser = function(userId) {

        var User = $resource('/users/:id', { id: userId });

        User.delete(
            function() {
                // success
                $route.reload();
            },
            function(error) {
                // error
                console.log(error);
            }
        );
    }

}]);

angular.module('slimproject')
.controller('EditController', ['$routeParams', '$resource', '$scope', '$http', '$location', '$window', function ($routeParams, $resource, $scope, $http, $location, $window) {
    var userId = $routeParams.id;
    if (userId) {
        var User = $resource('/users/:id', { id: userId });

        // Get User from API
        $scope.user = User.get();
    }
    console.log('user id:'+userId);
    //triger while clicking update button
    $scope.updateUser = function() {
        var User = $resource('/edit/:id', { id: userId }, { update: { method:'PUT' } });

        User.update($scope.user,
            function(data) {
                alert('test0');
                console.log(data);
                // success
                $location.path('/users');
            },
            function(error) {
                // error
                console.log(error);
            }
        );
        //@todo resolve issue why execute code inside success
        $location.path('/users');
    }

    // $http.put('/edit/:id', 1).success(function(data) {
    //     console.log(data);
    // //   $scope.reset();
    // //   $scope.activePath = $location.path('/users');
    // });
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
