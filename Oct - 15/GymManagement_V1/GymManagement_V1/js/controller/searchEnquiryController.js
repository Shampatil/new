'use strict';

gymManagementApp.controller('searchEnquiryController', function ($scope, $state, $http, $rootScope, $location, Idle, $route, exDialog, commonService, $localStorage, userSessionService) {

    $scope.init = function ()
    {
        Idle.watch();
        $location.path('/dashboard/searchEnquiry');
        $scope.test1 = 'This Is About us Page';
        $scope.enquirysearch = [
                                   { id: 1, fname: 'aaa', mname: 'zzz', Lname: 'bbb', mobile: '', InterestedServices: '', Interesteddays: '', Email: '', admitted: true, followup1: '', followup1by: '', followup1date: '', followup2: '', followup2by: '', followup2date: '', followup3: '', followup3by: '', followup3date: '' },
                                   { id: 2, fname: 'sss', mname: 'zxc', Lname: 'nnn', mobile: '', InterestedServices: '', Interesteddays: '', Email: '', admitted: true, followup1: '', followup1by: '', followup1date: '', followup2: '', followup2by: '', followup2date: '', followup3: '', followup3by: '', followup3date: '' },
                                   { id: 3, fname: 'ddd', mname: 'mnb', Lname: 'uuu', mobile: '', InterestedServices: '', Interesteddays: '', Email: '', admitted: false, followup1: '', followup1by: '', followup1date: '', followup2: '', followup2by: '', followup2date: '', followup3: '', followup3by: '', followup3date: '' },
                                   { id: 4, fname: 'zzz', mname: 'qwe', Lname: 'ukh', mobile: '', InterestedServices: '', Interesteddays: '', Email: '', admitted: false, followup1: '', followup1by: '', followup1date: '', followup2: '', followup2by: '', followup2date: '', followup3: '', followup3by: '', followup3date: '' },
                                   { id: 5, fname: 'qqq', mname: 'qwe', Lname: 'rgn', mobile: '', InterestedServices: '', Interesteddays: '', Email: '', admitted: false, followup1: '', followup1by: '', followup1date: '', followup2: '', followup2by: '', followup2date: '', followup3: '', followup3by: '', followup3date: '' }
                                ];
    };
    $scope.init();
});
