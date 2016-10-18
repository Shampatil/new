gymManagementApp.factory('accessControlService', function ($http, $q) {

    var accessControlService = {};

    accessControlService.GetMenuList = function (roleId, menuType, successFuction) {
        //var config = {
        //    method: 'GET',
        //    url: 'PracticeManagement.Services/api/UserAccessControl/GetLinkAccessControl',
        //    params: { roleId: roleId, menuType: menuType }
        //};

        //$http(config).then(function successCallback(response) {
        //    successFuction(response.data);
        //}, function errorCallback(response) {
        //});

        var data = {
            roleId: roleId,
            menuType: menuType            
        };

        $.ajax({
            url: 'PracticeManagement.Services/api/UserAccessControl/GetLinkAccessControl',
            type: "GET",
            async: false,
            contentType: "application/x-www-form-urlencoded",
            data: data,
            success: function (response) {                
                successFuction(response);
            }            
        });
    };

    accessControlService.CanUserAccessLink = function (roleId, menuName, successFuction) {
        var config = {
            method: 'GET',
            url: 'PracticeManagement.Services/api/UserAccessControl/CanUserAccessLink',
            params: { roleId: roleId, menuName: menuName }
        };

        $http(config).then(function successCallback(response) {
            successFuction(response.data);
        }, function errorCallback(response) {
        });
    };

    return accessControlService;
});

gymManagementApp.factory('printLogoImagesService', function () {
    var printLogoImagesService = {};

    printLogoImagesService.PrintLogoImages = "";
    printLogoImagesService.DeletedPrintLogoImages = "";

    printLogoImagesService.UpdatePrintLogoImages = function (data) {
        printLogoImagesService.PrintLogoImages = data;
    };

    printLogoImagesService.UpdateDeletedPrintLogoImages = function (data) {
        printLogoImagesService.DeletedPrintLogoImages = data;
    };

    return printLogoImagesService;
});

gymManagementApp.factory('signatureImagesService', function () {
    var signatureImagesService = {};

    signatureImagesService.SignatureImages = "";
    signatureImagesService.DeletedSignatureImages = "";
    signatureImagesService.UpdateSignatureImages = function (data) {
        signatureImagesService.SignatureImages = data;
    };

    signatureImagesService.UpdateDeletedSignatureImages = function (data) {
        signatureImagesService.DeletedSignatureImages = data;
    };
    return signatureImagesService;
});

