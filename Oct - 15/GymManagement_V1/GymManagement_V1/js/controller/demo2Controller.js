'use strict';

gymManagementApp.controller('demo2Controller', function ($scope, $state, $http, $rootScope, $location, Idle, $route, exDialog, commonService, $localStorage, userSessionService) {

    $scope.init = function () {
        Idle.watch();
        $location.path('/dashboard/demo2');



    }












    $scope.submitinvoiceForm =function()
    {
        alert("kdjfh");
        $state.go('dashboard.aboutUs ', { url: "/aboutUs", templateUrl: 'Views/dashboard/aboutUs.html', controller: 'aboutUsController' })
    }
});
