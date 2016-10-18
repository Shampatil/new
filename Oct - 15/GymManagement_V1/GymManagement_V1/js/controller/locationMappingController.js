'use strict';

gymManagementApp.controller('locationMappingController', function ($scope, $http, $location, $rootScope, exDialog, $filter, $localStorage) {

    $scope.LocationsToRemove = [];
    $scope.init = function () {

        $scope.loggInUserDetailsCookie = JSON.parse(localStorage.getItem("LoggedInUserDetails")); //
        $http.get('PracticeManagement.Services/api/locationMapping/GetAllUserName')
            .then(function successCallback(response) {

                $scope.UserMappingUserName = response.data.UserNameDetails;
                $scope.Locations = [];
                $scope.Locations = response.data.LocationDetails;
                $('#userName').typeahead({
                    source: $scope.UserMappingUserName,
                    display: 'UserName',
                    val: 'UserId'
                });
            });
    }

    $scope.init();

    $scope.loadLocations = function (query) {

        var filteredList = [];
        angular.forEach($scope.Locations, function (item) {
            var Name = item.StationName.toUpperCase();
            var filterText = query.toUpperCase();
            if (Name.indexOf(filterText) > -1)
                filteredList.push(item);
        });
        return filteredList;
    };

    $scope.tagRemoved = function (tag) {
        if (tag.StationId)
            $scope.LocationsToRemove.push({ StationId: tag.StationId});
    }
        
    $scope.Save = function () {

        var userName = $('#userName').val();
        if (jQuery.trim(userName).length > 0) {

            HideErrorMsg();
        if ($scope.LocationsToRemove.length > 0) {
        var data = JSON.stringify({
            "UsersID": $scope.CurrentUserId,
                "LocationDetails": $scope.LocationsToRemove,
            "LogInUserId": $scope.loggInUserDetailsCookie.UserId
        });
        $http.post('PracticeManagement.Services/api/locationMapping/RemoveUsersLocation', data)
           .then(function successCallback(response) {
                   if (response.data) {
                       $scope.LocationsToRemove = [];
                   }
                   else {
                       ShowErrorMsg("Error occured while saving.");
                   }
           });
    }

        if ($scope.ListOfLocations.length > 0) {
        var data = JSON.stringify({
            "UsersID": $scope.CurrentUserId,
            "LocationDetails": $scope.ListOfLocations,
            "LogInUserId": $scope.loggInUserDetailsCookie.UserId
        });
        $http.post('PracticeManagement.Services/api/locationMapping/UserMappingDetails', data)
           .then(function successCallback(response) {
               exDialog.openMessage($scope, 'Location(s) mapped successfully.')
           });
    }
    }
        else {
            ShowErrorMsg("Please select user name.");
        }
    }

    $('#userName').on('change', function (e, d) {

        $scope.ListOfLocations = [];
        var ddlValue = $('#userName').val();
        var service = $filter('filter')($scope.UserMappingUserName, function (value, index, array) {
            return $filter('lowercase')(value.UserName) == $filter('lowercase')(ddlValue);
        }, true)[0];

        if ((service != undefined && service != null)) {
            $scope.CurrentUserId = service.UserId;

            var data = JSON.stringify({
                "UserId": $scope.CurrentUserId
            });
            $scope.ListOfLocations = [];
            $http.post('PracticeManagement.Services/api/locationMapping/ListUserLocation', data)
               .then(function successCallback(response) {
                   $scope.ListOfLocations = response.data.LocationDetails                  
               });
        } else {
            $scope.CurrentUserId = "";
        }
    });

    $scope.Reset = function () {

            HideErrorMsg();
        var data = JSON.stringify({
            "UserId": $scope.CurrentUserId
        });
        $scope.ListOfLocations = [];
        $http.post('PracticeManagement.Services/api/locationMapping/ListUserLocation', data)
           .then(function successCallback(response) {
                    $scope.ListOfLocations = response.data.LocationDetails
           });
    }

    function ShowErrorMsg(errorMsg) {
        $scope.alertError = true;
        $scope.errorMessage = errorMsg;
    }

    function HideErrorMsg() {
        $scope.alertError = false;
        $scope.errorMessage = "";
    }
});