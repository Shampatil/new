'use strict';

gymManagementApp.controller('aboutUsController', function ($scope, $state, $http, $rootScope, $location, Idle, $route, exDialog, commonService, $localStorage, userSessionService) {

    $scope.init = function () {
        Idle.watch();
        $location.path('/dashboard/aboutUs');
        $scope.imgs = [
        '../../Images/1.jpg',
        '../../Images/2.jpg',
        '../../Images/3.jpg',
        '../../Images/4.jpg',
        '../../Images/5.jpg',
        '../../Images/6.jpg',
        '../../Images/7.jpg'
        ];

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        //$.ajax({
        //    async: true,
        //    crossDomain: true,
        //    url: "http://gym.excellencea.com/api/invoice/delete",
        //    method: "POST",
        //    data: {
        //        "Packagename": "Total Fitness",
        //        "InvoiceID": "PF001IN1617-00002",
        //        "TransactionID": "PF001TS1617-00002",
        //        "MemberID": "PL001MEM-00002",
        //    },
        //    success: function (data) {
        //         alert("Deleted Success");
        //    },
        //    error: function (req, status, errorObj) {
        //        alert("invoice Package Not Added " + errorObj.toString());
        //    }
        //});



        $http({ method: "GET", url: "http://gym.excellencea.com/api/invoicepackage" }).success(function (result) {
            $scope.GMSInvoicePackage = result;

            for (var i = 0; i < $scope.GMSInvoicePackage.length; i++) {
                if ($scope.GMSInvoicePackage[i]["Packagename"] == "Wait Loss" && $scope.GMSInvoicePackage[i]["MemberID"] == "PL001MEM-00002") {
                    $http({
                        url: "http://gym.excellencea.com/api/invoice/delete",
                        method: "POST",
                        params: {
                            "Packagename": $scope.GMSInvoicePackage[i]["Packagename"],
                            "InvoiceID": $scope.GMSInvoicePackage[i]["InvoiceID"],
                            "TransactionID": $scope.GMSInvoicePackage[i]["TransactionID"],
                            "MemberID": $scope.GMSInvoicePackage[i]["MemberID"],
                        }
                    }).then(function (response) {
                        //  alert("Successfully Delete Service");
                    })
                }
            }

        });







    };
    $scope.init();


});
