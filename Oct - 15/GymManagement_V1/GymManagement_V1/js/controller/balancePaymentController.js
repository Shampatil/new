//'use strict';

gymManagementApp.controller('balancePaymentController', function ($scope, $state, $http, $rootScope, $location, Idle, $route, exDialog, commonService, $localStorage, userSessionService) {

    $scope.init = function()
    {
        alert("controller called");
        Idle.watch();
        $location.path('/dashboard/balancePayment');



    $scope.balancePaymentBillingamount = 0;
    $scope.balancePaymentbalanceAmount = 0;


    var currentDate = new Date();
    var day = currentDate.getDate();
    var year = currentDate.getFullYear();
    var month = new Array();

    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    var d = new Date();
    var n = month[d.getMonth()];
    $scope.day1 = day + "-" + n + "-" + year;


    $("#followup_Status").change(function () {
        var control = $(this);
        if (control.val() == 'number:4') {
            $("#cheque").show();
            $("#cash").hide();
            $("#debitcard").hide();
            $("#creditcard").hide();
        }
        else if (control.val() == 'number:1') {
            $("#cheque").hide();
            $("#cash").show();
            $("#debitcard").hide();
            $("#creditcard").hide();
        }
        else if (control.val() == 'number:2') {
            $("#cheque").hide();
            $("#cash").hide();
            $("#debitcard").show();
            $("#creditcard").hide();
        }
        else if (control.val() == 'number:3') {
            $("#cheque").hide();
            $("#cash").hide();
            $("#debitcard").hide();
            $("#creditcard").show();
        }
        else {
            $("#cheque").hide();
            $("#cash").hide();
            $("#debitcard").hide();
            $("#creditcard").hide();
        }
    });

    $scope.services = [{ ServiceID: 1, ServiceName: 'Cash' }, { ServiceID: 2, ServiceName: 'Debit Card' }, { ServiceID: 3, ServiceName: 'Credit Card' }, { ServiceID: 4, ServiceName: 'Cheque' }, ];


    $scope.invoicepackages1 = [];
    $scope.invoicepackages2 = [];

    var httpRespose = $http.get("http://gym.excellencea.com/api/service");
    httpRespose.then(function (response) {
        $scope.service = JSON.stringify(response.data).replace(/\\/g, "");
    });


    $http.get("http://gym.excellencea.com/api/invoice")
     .then(function (response) {
         $scope.invoice = response.data;
         //  $scope.invoice = JSON.parse($scope.invoice)
     });


    $http.get("http://gym.excellencea.com/api/InvoicePackage")
     .then(function (response) {
         $scope.invoicepackages = response.data;
         //  $scope.invoice = JSON.parse($scope.invoice)
     });

    $http.get("http://gym.excellencea.com/api/invoiceService")
     .then(function (response) {
         $scope.invoiceServices = response.data;
         //  $scope.invoice = JSON.parse($scope.invoice)
     });



    $http.get("http://gym.excellencea.com/api/InvoiceTax")
     .then(function (response) {
         $scope.invoicetaxes = response.data;
         //  $scope.invoice = JSON.parse($scope.invoice)
     });


    var httpRespose = $http.get("http://gym.excellencea.com/api/invoiceTransaction");
    httpRespose.then(function (response) {
        $scope.invoicetransaction = response.data;
    });


    $scope.gettotalpaid = function (SelectedTransaction) {
        $scope.paidrupees = 0;
        for (var i = 0; i < $scope.invoicetransaction.length; i++) {
            if ($scope.invoicetransaction[i]["TransactionID"] == SelectedTransaction) {
                $scope.paidrupees = $scope.paidrupees + $scope.invoicetransaction[i]["Paid"];
            }
        }
        return parseInt($scope.paidrupees)
    }


    $scope.gettotalbalance = function (SelectedTransaction, Selectedbilling) {
        Selectedbilling = parseInt(Selectedbilling);
        $scope.paidrupeestotal = 0;
        for (var i = 0; i < $scope.invoicetransaction.length; i++) {
            if ($scope.invoicetransaction[i]["TransactionID"] == SelectedTransaction) {
                $scope.paidrupeestotal += $scope.invoicetransaction[i]["Paid"];
            }
            else
            {

            }
        }
        return parseInt(Selectedbilling - $scope.paidrupeestotal);
    }


    $scope.SelectTransaction = function (SelectedTransaction) {
        $scope.invoicepackages2 = [];

        $scope.BalancePaymentTransactionID = SelectedTransaction;

        for (var i = 0; i < $scope.invoice.length; i++) {
            if ($scope.invoice[i]["TransactionID"] == SelectedTransaction) {
                $scope.balancePaymentBillingamount = $scope.invoice[i]["BillingAmount"];
            }
        }



        for (var i = 0; i < $scope.invoicepackages.length; i++) {
            if ($scope.invoicepackages[i]["TransactionID"] == SelectedTransaction) {
                // $scope.balancePaymentBillingamount = $scope.invoicepackages[i]["TotalAmount"];


                //  alert($scope.invoicepackages[i]["TransactionID"]);
                $scope.invoicepackages2.push({
                    InvoiceID: $scope.invoicepackages[i]["InvoiceID"],
                    TransactionID: $scope.invoicepackages[i]["TransactionID"],
                    MemberID: $scope.invoicepackages[i]["Packagename"],
                    Packagename: $scope.invoicepackages[i]["Packagename"],
                    IncludedService: $scope.invoicepackages[i]["PackagePrice"],
                    PackagePrice: $scope.invoicepackages[i]["DiscountInPercentage"],
                    DiscountInAmount: $scope.invoicepackages[i]["DiscountInAmount"],
                    TotalAmount: $scope.invoicepackages[i]["TotalAmount"],
                    StartDate: $scope.invoicepackages[i]["StartDate"],
                    ValidityInDays: $scope.invoicepackages[i]["ValidityInDays"],
                    IncludedServiceLevelTaxAmount: $scope.invoicepackages[i]["IncludedServiceLevelTaxAmount"],
                    EndDate: $scope.invoicepackages[i]["EndDate"],
                    InvoiceBy: $scope.invoicepackages[i]["InvoiceBy"],
                })
            }
            else {
            }
        }
    }

      };
    
});
