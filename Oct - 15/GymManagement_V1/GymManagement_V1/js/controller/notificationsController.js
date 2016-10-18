'use strict';

gymManagementApp.controller('notificationsController', function ($scope, $http, $location, $rootScope, $timeout, Idle, exDialog, clinicalDocsService, medicationOrderListService, serviceOrderListService, patientClinicalImagesService, $localStorage, userSessionService) {

    var loggedInUserDetailsCookie;
    $rootScope.notificationCount;

    $scope.currentPage = 0;
    $scope.selectedPage = 1;
    $scope.currentPaginationIndex = 0;
    $scope.notificationFiltered = null;
    $scope.notificationPagination = null;
    $scope.currentNotificationNumber = 0;

    $scope.init = function () {

        Idle.watch();
        if (!userSessionService.ValidateLoggedInUserSession()) {
            return;
        }

        loggedInUserDetailsCookie = userSessionService.LoggedInUserDetails;

        //Set tab on refresh
        $scope.states.activeItem = 5;
        $location.path('/dashboard/notifications');

        $scope.notificationPagination = null;
        $scope.currentPaginationIndex = 0;
        $scope.currentNotificationNumber = 0;
        GetNotificationsList();
    }

    function GetNotificationsList() {
        $rootScope.loading = true;
        var config = {
            method: 'GET',
            url: 'PracticeManagement.Services/api/PatientInfo/GetNotifications',
            params: { usersId: loggedInUserDetailsCookie.UserId }
        };

        $http(config).success(function (data, status, headers, config) {
            $rootScope.loading = false;
            if (data) {
                $scope.NotificationList = data;
                $rootScope.notificationCount = data.length;
                $scope.notificationFiltered = chunk(data, 10);
                $scope.notificationPagination = chunk($scope.range($scope.notificationFiltered.length), 10);
                $scope.currentPage = 0;
                $scope.selectedPage = 1;
            } else {
                $scope.notificationFiltered = null;
                $scope.notificationPagination = null;
                $scope.currentPaginationIndex = 0;
            }
        });
    }

    $scope.redirectToClinicalDocs = function (notification) {       
        localStorage.setItem('visitingDetailId', notification.VisitingDetailId);
        localStorage.setItem('patientId', notification.PatientId);

        var isLock = (localStorage.getItem('visitingDetailId') != null);
        if (isLock) {           
            clinicalDocsService.ChangeData(null);
            patientClinicalImagesService.UpdatePatientClinicalImages(null);
            patientClinicalImagesService.UpdateDeletedPatientclinicalImages(null);
            serviceOrderListService.ChangeData('');
            medicationOrderListService.ChangeData('');
            $location.path('dashboard/patientInfo/ClinicalDocs/');
            if (loggedInUserDetailsCookie.Speciality != undefined || loggedInUserDetailsCookie.Speciality != null) {
                if (loggedInUserDetailsCookie.Speciality.indexOf("OBSTETRIC") > -1) {
                    $location.path('dashboard/patientInfo/ObstetricClinicalDocs/');
                }
                else if (loggedInUserDetailsCookie.Speciality.indexOf("PEDIATRIC") > -1) {
                    $location.path('dashboard/patientInfo/PediatricClinicalDocs/');
                }
            }
        }
    }

    function SetErrorMessage(isVisible, message) {
        $scope.alertError = isVisible;
        $scope.errorMessage = message;
        $timeout(function () {
            $scope.alertError = !isVisible
        }, 5000);       
    }

    function SetSuccessMessage(isVisible, message) {
        $scope.alertSuccess = isVisible;
        $scope.succesMessage = message;
        $timeout(function () {
            $scope.alertSuccess = !isVisible;
        }, 5000);       
    }

    $scope.DeleteDraft = function (notification) {
        var draftToRemove = {};
        draftToRemove = { PatientVisitId: notification.PatientVisitId,PatientAppointmentId: notification.PatientAppointmentId, UHID: notification.UHID };
        exDialog.openConfirm($scope, 'Are you sure you want to delete this draft?').then(function (value) {
            var data = JSON.stringify(draftToRemove);
            $rootScope.loading = true;
            $http.post('PracticeManagement.Services/api/PatientInfo/DeleteDraft', data)
         .then(function successCallback(response) {
             $rootScope.loading = false;
             $rootScope.notificationCount--;
             if (response) {
                 GetNotificationsList();               
                 SetSuccessMessage(true, "Draft deleted from list.");
             }
         }, function errorCallback(response) {
             SetErrorMessage(true, "Exception occurred when remove the draft.");
         });
        });
    }

    $scope.setPage = function () {
        $scope.currentPage = this.n - 1;
        $scope.selectedPage = this.n;
        //$scope.createVisitHistoryCollapse();
    };

    $scope.firstPage = function () {
        $scope.currentPaginationIndex = $scope.currentPaginationIndex - 1;
        if ($scope.currentPaginationIndex < 0) {
            $scope.currentPaginationIndex = 0;
        }
    };

    $scope.lastPage = function () {
        $scope.currentPaginationIndex = $scope.currentPaginationIndex + 1;
        if ($scope.notificationPagination == null) {
            $scope.currentPaginationIndex = 0;
        } else if ($scope.currentPaginationIndex > $scope.notificationPagination.length - 1) {
            $scope.currentPaginationIndex = $scope.notificationPagination.length - 1;
        }
    };

    $scope.range = function (input, total) {
        var ret = [];
        if (!total) {
            total = input;
            input = 1;
        }
        for (var i = input; i <= total; i++) {
            ret.push(i);
        }
        return ret;
    };

    function chunk(arr, size) {
        var newArr = [];
        for (var i = 0; i < arr.length; i += size) {
            newArr.push(arr.slice(i, i + size));
        }

        return newArr;
    }

    $scope.init();

});
