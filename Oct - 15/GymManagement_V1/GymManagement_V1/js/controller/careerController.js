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

gymManagementApp.controller('careerController', function ($scope, $state, $http, $rootScope, $location, Idle, $route, exDialog, commonService, $localStorage, userSessionService) {

    $scope.init = function () {
        Idle.watch();
        $location.path('/dashboard/career');
        $scope.test1 = 'This Is career Page';
        $scope.hidepanel = function()
        {
            $("collapseOne").hide(1000);
        }

        $scope.jobapplication = [
                         'Fitness Trainer',
                         'Personal Trainer',
                         'Aerobics Trainer',
                         'Zumba Trainer',
                         'Yoga Trainer ',
                         'Other'
        ];
        $scope.Gender = [
 'Male',
 'Female',
 'Other'
        ];
        $scope.MarritalStatus = [
         'Married',
         'Unmarried',
         'Widower',
         'Widow',
         'Divorced'
        ];



        $scope.name = 'World';

        $scope.go = function () {

            $scope.msg = 'clicked';
        }

    };

    $scope.add = function () {
        var f = document.getElementById('file').files[0],
            r = new FileReader();
        r.onloadend = function (e) {
            var data = e.target.result;
            //send you binary data via $http or $resource or do anything else with it
        }
        r.readAsBinaryString(f);
    }


    $scope.imgs = [
        '../../Images/1.jpg',
        '../../Images/2.jpg',
        '../../Images/3.jpg',
        '../../Images/4.jpg',
        '../../Images/5.jpg',
        '../../Images/6.jpg',
        '../../Images/7.jpg'
    ];

    $scope.init();


});
