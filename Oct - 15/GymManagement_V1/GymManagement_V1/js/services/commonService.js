gymManagementApp.factory('commonService', function ($http) {
    var commonService = {};
    commonService.userDetail = "";
    commonService.GetUserDetails = function (userId, successFuction) {

        var data = JSON.stringify({
            "UsersId": userId,
        });
        $http.post('PracticeManagement.Services/api/UserInfo/UserInfo', data)
            .then(function successCallback(response) {
                if (response.data != undefined) {
                    commonService.userDetail = response.data;
                    successFuction(commonService.userDetail);
                }
            }, function errorCallback(response) { });
    }
    return commonService;
});

