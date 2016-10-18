'use strict';
gymManagementApp.controller('addServicesController', function ($scope, $state, $http, $rootScope, $location, Idle, $route, exDialog, commonService, $localStorage, userSessionService)
{//, fileUpload


    $scope.init = function ()
    {
        $http.get("http://gym.excellencea.com/api/tax")
        .then(function (response) {
            $scope.taxes = response.data;
        });

        $scope.createdBy = "Sham";
        $scope.press = 0;

        Idle.watch();
        $location.path('/dashboard/addServices');
        $scope.test1 = 'This Is About us Page';

        $scope.choices = [];




      var total = 0;
    };

    $scope.removeChoice = function (item) {
        $scope.choices.splice(item, 1);
    };

    $scope.addNewChoice = function () {
        var newItemNo = $scope.choices.length + 1;
        $scope.choices.push({});
    };

    //$scope.removeChoice(Option)
    //{
    //    angular.forEach($scope.service, function () {
    //        alert(Option.toString())
    //    })
    //}


    $scope.total = function () {
        var total = 0;
        angular.forEach($scope.choices, function (choice) {

            if (isNaN(choice.taxRate)) {
                total += 0.0;
            }

            else {
                total += parseFloat(choice.taxRate);
            }

        })
        if (isNaN(total)) {
            return 0;
        }
        else {
            return total;
        }
    }



    $scope.addService = function () {
        $scope.press = 1;
        var startdate = document.getElementById("ServiceStartdate").value;
        $scope.sd = startdate;
        var enddate = document.getElementById("ServiceEndDate").value;
        $scope.ed = enddate;
        var ser_Name = $scope.serviceName;
        var ser_Desciption = $scope.serviceDescription;
        var ser_createdBy = $scope.createdBy;
        var ser_createdDate = Date.now();
        var ser_startDate = document.getElementById("ServiceStartdate").value;
        var ser_endDate = document.getElementById("ServiceEndDate").value;
        var ser_Charge = $scope.serviceCharge;

        //  return false;

        $.ajax({
            async: true,
            crossDomain: true,
            url: "http://gym.excellencea.com/api/service",
            method: "POST",
            data:
            {
                "Servicename": ser_Name,
                "ServiceDesciption": ser_Desciption,
                "CreatedBy": ser_createdBy,
                "CreatedDate": ser_createdDate,
                "StartDate": ser_startDate,
                "EndDate": ser_endDate,
                "ServiceCharge": ser_Charge,
                "AprovedBy": "",
                "AprovedDate": "",
                "AprovalComment": "",
                "ServiceAvailableDays": "",
                "TotalTax": document.getElementById("taxTotal").value,
                "PhotoURL": "http://gym.excellencea.com/api/service",
                "AprovalStatus": "Draft"
            },
            success: function (data) {
                var json = $scope.choices;
                $.each(json, function () {
                    $.ajax({
                        async: true,
                        crossDomain: true,
                        url: "http://gym.excellencea.com/api/Servicewithtax",
                        method: "POST",
                        data: {
                            "TaxName": this.taxName,
                            "Product_Name": ser_Name,
                            "Product_Type": "Service level Tax",
                            "Percentage": this.taxRate,
                        },
                        success: function (data) {
                        },
                        error: function (req, status, errorObj) {
                            alert(errorObj.toString());
                        }
                    });
                });
                if (!alert('Your Service Is Stored Into Draft..!')) { window.location.reload(); }
            }
        });
    };

    $scope.init();


});



