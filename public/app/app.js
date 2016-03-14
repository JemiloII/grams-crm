var app = angular.module('gramCrm', ['ngRoute', 'toastr', 'LocalStorageModule']);

app.controller('ClientListCtrl', function ($http, $scope, LocalStorageModule) {
    $scope.searchPrefix = LocalStorageModule.get('lastSearch') || "";
    $scope.clients = [];

    $scope.checkSearch = function() {
        var value = $scope.searchPrefix ? $scope.searchPrefix : "";
        if (value.length < 2) {
            $scope.clients = [];
        }
        else {
            LocalStorageModule.set('lastSearch', $scope.searchPrefix);

            $http.get("/clients/" + $scope.searchPrefix, function(data) {
                $scope.clients = data.clients;
            });
        }
    };

    $scope.checkSearch();
});