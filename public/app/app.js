var app = angular.module('gramCrm', ['ngRoute', 'toastr', 'LocalStorageModule']);

app.controller('ClientSearchCtrl', function ($http, $scope, localStorageService) {
    $scope.searchPrefix = localStorageService.get('lastSearch') || "";
    $scope.clients = [];
    $scope.predicate = 'company';
    $scope.reverse   = false;

    $scope.checkSearch = function () {
        console.log('checkSearch()');
        var value = $scope.searchPrefix ? $scope.searchPrefix : "";
        if (value.length < 2) {
            $scope.clients = [];
        }
        else {
            localStorageService.set('lastSearch', $scope.searchPrefix);

            $http.get("/clients/?company=" + $scope.searchPrefix)
                .success(function(data) {
                    console.log('Data: ', data);
                    $scope.clients = data.client;
                });
        }
    };

    $scope.toggleSortOrder = function (column) {
        if (column === $scope.predicate) {
            // User clicked on the same column that's already being used to sort.
            // Reverse the sort.
            $scope.reverse = !$scope.reverse;
        }
        else {
            // User clicked on a different column. Sort in ascending order.
            $scope.predicate = column;
            $scope.reverse = false;
        }
    };

    $scope.checkSearch();
});

app.controller('ClientEditCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.editingClient = null;
    // We're relying on the fact that AngularJS creates a new instance of
    // this controller every time an edit view is activated via the router.
    $http.get("/client/" + $routeParams.id)
        .success(function(data) {
            $scope.editingClient = data.client;
        });

    function returnToMainPage() {
        $location.path("/");
    }

    $scope.cancelEdit = function() {
        returnToMainPage();
    };

    $scope.saveClient = function() {
        var url = "/client/" + $scope.editingClient.id;

        $http.post(url, $scope.editingClient)
            .success(function() {
                returnToMainPage();
            });
    }
});

app.config(function ($routeProvider) {
    $routeProvider
        .when('/search', {
            templateUrl: 'app/clients/search.html',
            controller:  'ClientSearchCtrl'
        })
        .when('/edit/:id', {
            templateUrl: 'app/clients/edit.html',
            controller:  'ClientEditCtrl'
        })
        //.when('/show/:id', {
        //    templateUrl: 'show.html',
        //    controller:  'ShowCtrl'
        //})
        .otherwise({
            redirectTo: '/search'
        });
});

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('gramCrm')
        .setStorageType('localStorage')
        .setNotify(true, true)
});
