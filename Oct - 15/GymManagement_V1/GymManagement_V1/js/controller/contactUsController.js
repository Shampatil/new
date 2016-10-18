//'use strict';
//gymManagementApp.controller('aboutUsController.js', function ($scope, $state, $http, $rootScope, $location, Idle, $route, exDialog, commonService, $localStorage, userSessionService) {

//    $scope.init = function () {
//        Idle.watch();
//        alert('123');
//        $location.path('/dashboard/aboutUs');
//        $scope.test1 = 'This Is About us Page';
//        $scope.sss = "lfsfj";
//    };
//    $scope.init();
//});

'use strict';

gymManagementApp.controller('contactUsController', function ($scope, $state, $http, $rootScope, $location, Idle, $route, exDialog, commonService, $localStorage, userSessionService) {

    $scope.init = function ()
    {
        Idle.watch();
        $location.path('/dashboard/contactUs');
        $scope.test1 = 'This Is contact Us Page';

        $scope.Latitude = 18.561048;
        $scope.Longitude = 73.804583;
    };

    $scope.init();


});