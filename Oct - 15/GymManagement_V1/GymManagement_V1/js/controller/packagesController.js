'use strict';
//<!-------------------------------------------------------- Start of validation  ------------------------------------------------------------------------------------------
//@Package     :-
//@Sub-Package :-
//@Category    :-
//@Link        :-
//@Since       :-
//@Filesource  :-
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
gymManagementApp.controller('packagesController', function ($scope, $state, $http, $rootScope, $location, Idle, $route, exDialog, commonService, $localStorage, userSessionService) {

    $scope.init = function () {
        Idle.watch();
        $location.path('/dashboard/packages');
        $scope.test1 = 'This Is packages Page';

        $scope.GMSServices = '';
        $scope.jsonpackages = '';

        $http({ method: "GET", url: "http://gym.excellencea.com/api/packagewithservice" })
            .success(function (result) {
                $scope.GMSServices = result;

                $http({ method: "GET", url: "http://gym.excellencea.com/api/package" })
                    .success(function (result1) {
                        $scope.jsonpackages = result1;
                    })
                    .error(function (result) {
                        if (!alert('Packages Detail Loading Failed..!')) {
                            window.location.reload();
                        }
                    });
            })
        .error(function (result) {
            if (!alert('Service Detail Loading Failed..!')) {
                window.location.reload();
            }
        });



        $scope.GetPackageIncludedServices = function (PackageName)
        {
            $scope.SelectedPackageIncludedServices = '';
            for (var j = 0; j < $scope.GMSServices.length; j++)
            {
                if ($scope.GMSServices[j]["PackageName"] == PackageName)
                {
                    $scope.SelectedPackageIncludedServices += $scope.GMSServices[j]["IncludeServiceName"] + ","
                }
            }

            return $scope.SelectedPackageIncludedServices.replace(/,\s*$/, "");
        }


    };
    $scope.init();
});
