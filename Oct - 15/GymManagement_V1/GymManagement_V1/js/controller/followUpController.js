'use strict';
gymManagementApp.controller('followUpController', function ($scope, $state, $http, $rootScope, $location, Idle, $route, exDialog, commonService, $localStorage, userSessionService) {

    $scope.init = function () {

        alert("ksjdhf");

        Idle.watch();
        $location.path('/dashboard/followUp');
        $scope.init();

        $scope.Enqueries = [
{ id: 1, fn: 'sham', Mn: 'Ashok', Ln: 'Patil', Interstedservices: 'Zumba, Gym' },
{ id: 2, fn: 'ghanshyam', Mn: 'Shantaram', Ln: 'Patil', Interstedservices: 'Swimming' },
{ id: 3, fn: 'Vivek', Mn: 'Ramesh', Ln: 'Mali', Interstedservices: 'xyz' },
{ id: 4, fn: 'Sushil', Mn: 'Chagan', Ln: 'Patil', Interstedservices: 'yz' },
{ id: 5, fn: 'Kiran', Mn: 'Ashok', Ln: 'Chaudhari', Interstedservices: 'ggdfg' }
        ];
    }
    
});


