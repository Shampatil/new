'use strict';

gymManagementApp.controller('loginController', ['$scope', '$http', '$location', '$rootScope', 'Idle', 'exDialog', 'deviceDetector', '$localStorage', function ($scope, $http, $location, $rootScope, Idle, exDialog, deviceDetector, $localStorage) {
    $scope.username;
    $scope.password;
    $scope.displayLocation = false;
    $rootScope.loading = false;
    $scope.securityToken = {};
    $scope.selectedOption = undefined;
    document.getElementById("pmapp").style.backgroundColor = "#afd2ef";

    if ($rootScope.IsPatientPortalAvailable && deviceDetector.browser === 'ie') {
        var loginData = {
            grant_type: "password",
            username: "Fortis_Api_User",
            password: "F0rtis@piUsr"
        };

        $.ajax({
            url: baseApiUrl + "/Token",
            type: "POST",
            async: false,
            contentType: "application/x-www-form-urlencoded",
            data: loginData,
            success: function (response) {
                localStorage.setItem('portalToken', response.access_token);
            },
            error: function (xhr) {
                alert('This application is not SSN certified, hence you will receive 2 alert messages. Please make sure you click on "Yes" to proceed.');
                $.get(baseApiUrl, null, null).done(function () {//solution for IE shit
                });
            }
        });
      }

    $scope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
        if (newUrl != oldUrl && exDialog.hasOpenDialog()) {
            exDialog.closeAll();
            //event.preventDefault(); //Keep exiting page instead of leaving.
        }
    });

    $scope.init = function () {
        $rootScope.$emit('IdleEnd', function () { });
        Idle.unwatch();

        var loggedInUserDetailsCookie = JSON.parse(localStorage.getItem("LoggedInUserDetails"));  
        if (loggedInUserDetailsCookie != undefined ){ 
            $location.path('/dashboard/outPatient');
            return;
        }
    };

    $scope.locationchanged = function () {
        if ($scope.selectedOption != undefined) {
            $location.path('/dashboard/outPatient');            
            localStorage.setItem("LoggedInUserDetails", JSON.stringify($scope.securityToken));
        }
    };

    $scope.loginUser = function () {
        $rootScope.loading = true;
        var data = JSON.stringify({
            "UserName": $scope.username,
            "Password": $scope.password,
            "OrganizationId": "562b8fc9-7486-4886-80d3-ecd8bfd6b97b",
            "AppId": "B4D13EED-BC9E-447F-A817-1E32D13458AF"
        });

        $http.post('PracticeManagement.Services/api/UserInfo/AuthenticateUser', data)
            .then(function successCallback(response) {
                $rootScope.loading = false;
                $scope.securityToken = response.data;
                if (response.data == null) {
                    exDialog.openMessage($scope, "Error occured, please check DB connection.", "Login", "error");
                } else {
                    if (response.data.Error === "No Error" && response.data.CanUserAccessApplication == true) {

                        Idle.watch();
                       localStorage.setItem('portalToken', null);
                        $scope.securityToken = response.data;

                        //$scope.LocationMappingList = response.data.LocationMappingModel;
                        //if ($scope.LocationMappingList.length > 1) {
                        //    $cookieStore.put('LoginLocations', response.data.LocationMappingModel);
                        //    $cookieStore.put('LoggedInUserDetails', response.data);
                        //    $location.path('/loginLocation');
                        //}
                        //else {
                        $rootScope.IsPODUser = false;
                        $rootScope.IsAdminUser = false;
                        //    if (response.data.RoleType === 'Nurse') {
                        //        LocationList(response.data.UserId);
                        //        $scope.displayLocation = true;
                        //}
                        //else 
                        if (response.data.RoleType === 'POD') {
                            //$cookieStore.put('LoggedInUserDetails', response.data);
                            localStorage.setItem("LoggedInUserDetails", JSON.stringify(response.data));
                            $rootScope.IsPODUser = true;
                            $location.path('/dashboard/podUser');
                        }
                        else if (response.data.RoleType === 'Admin') {
                            $rootScope.IsAdminUser = true;
                            //$cookieStore.put('LoggedInUserDetails', response.data);
                            localStorage.setItem("LoggedInUserDetails", JSON.stringify(response.data));
                            $location.path('/dashboard/administration');
                        }
                        else {
                            //$cookieStore.put('LoggedInUserDetails', response.data);
                            localStorage.setItem("LoggedInUserDetails", JSON.stringify(response.data));
                            $rootScope.isCameFromlogin = true;                            
                            $location.path('/dashboard/outPatient');
                        }
                        localStorage.setItem('visitingDetailId', null);
                        localStorage.setItem('patientId', null);
                    }
                    //}
                    else {
                        Idle.unwatch();
                        exDialog.openMessage($scope, "Invalid Username or Password, Please try again with valid Credentials.");
                    }
                }
            }, function errorCallback(response) {
                $rootScope.loading = false;
                exDialog.openMessage($scope, "Error occured please contact Administrator.", "Login", "error");
            });
    };

    function LocationList(UserId) {
        var data = JSON.stringify({
            "UserId": UserId,
        });
        $http.post('PracticeManagement.Services/api/UserInfo/LocationList', data)
         .then(function successCallback(response) {
             $scope.locationList = response.data;
         }, function errorCallback(response) {
             exDialog.openMessage($scope, "Error occured while fetching records.", "Login", "error");
         });
    }

    $scope.locationchanged = function () {

        $location.path('/dashboard/outPatient');
    }

    $scope.init();
}]);