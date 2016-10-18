'use strict';
//<!-------------------------------------------------------- Start of validation  ------------------------------------------------------------------------------------------
//@Package     :-
//@Sub-Package :-
//@Category    :-
//@Link        :-
//@Since       :-
//@Filesource  :-
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
gymManagementApp.controller('newBalancePaymentController', function ($scope, $state, $http, $rootScope, $location, Idle, $route, exDialog, commonService, $localStorage, userSessionService) {

    var mytotal;
    $scope.grandtotal;
    $scope.init = function () {
        Idle.watch();
        $location.path('/dashboard/newBalancePayment');
        $scope.PostbalancePaid = "";
        $scope.balancePaymentBillingamount= 0;
        $scope.balancePaymentbalanceAmount = 0;
        $scope.BalancePaymentTransactionID = null;
        $scope.BalancePaymentMemberID = "";
        $scope.invoicetransaction = "";
        $scope.paidrupeestotal = 0;
        $scope.Newinvoice = [];
        $scope.paidAmount = 0;
        $scope.authorisedby = "Sham";

        $http.get("http://gym.excellencea.com/api/invoiceTransaction")
          .then(function (response) {
              $scope.InvoiceNumberinInvoice = "PF001IN1617-" + (parseInt(response.data.length) + 100001).toString().substr(1, 5);
          });

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

        $scope.services = [{ ServiceID: 1, ServiceName: 'Cash' }, { ServiceID: 2, ServiceName: 'Debit Card' }, { ServiceID: 3, ServiceName: 'Credit Card' }, { ServiceID: 4, ServiceName: 'Cheque' }, ];

        $scope.invoicepackages1 = [];
        $scope.invoicepackages2 = [];

        var httpRespose = $http.get("http://gym.excellencea.com/api/service");
        httpRespose.then(function (response) {
            $scope.service = JSON.stringify(response.data).replace(/\\/g, "");
        });

        $scope.gettotalpaid = function (SelectedTransaction) {
            $scope.paidrupees = 0;
            for (var i = 0; i < $scope.invoicetransaction.length; i++) {
                if ($scope.invoicetransaction[i]["TransactionID"] == SelectedTransaction && $scope.invoicetransaction[i]["TransactionID"] != null) {
                    $scope.paidrupees = $scope.paidrupees + $scope.invoicetransaction[i]["Paid"];
                }
            }
            return parseInt($scope.paidrupees)
        }


        $http({ method: "GET", url: "http://gym.excellencea.com/api/invoice" })
         .success(function (result) {
             $scope.invoice = result;

             $http({ method: "GET", url: "http://gym.excellencea.com/api/invoiceTransaction" })
                 .success(function (result1) {
                     $scope.invoicetransaction = result1;
                     for(var i = 0; i < $scope.invoice.length; i++) {
                                 $scope.Newinvoice.push({
                                     ID: $scope.invoice[i]["ID"],
                                     InvoiceID: $scope.invoice[i]["InvoiceID"],
                                     TransactionID: $scope.invoice[i]["TransactionID"],
                                     MemberID: $scope.invoice[i]["MemberID"],
                                     InvoiceDate: $scope.invoice[i]["InvoiceDate"],
                                     InvoiceType: $scope.invoice[i]["InvoiceType"],
                                     InvoiceTime: $scope.invoice[i]["InvoiceTime"],
                                     FName: $scope.invoice[i]["FName"],
                                     Mname: $scope.invoice[i]["Mname"],
                                     Lname: $scope.invoice[i]["Lname"],
                                     MobileNumber: $scope.invoice[i]["MobileNumber"],
                                     PackageName: $scope.invoice[i]["PackageName"],
                                     PackageStartDate: $scope.invoice[i]["PackageStartDate"],
                                     packageEndDate: $scope.invoice[i]["packageEndDate"],
                                     BillingAmount: $scope.invoice[i]["BillingAmount"],
                                     PaidAmount: $scope.invoice[i]["PaidAmount"],
                                     BalanceAmount: $scope.invoice[i]["BalanceAmount"],
                                     ModeOfPayment: $scope.invoice[i]["ModeOfPayment"],
                                     CardNumber: $scope.invoice[i]["CardNumber"],
                                     BankName: $scope.invoice[i]["BankName"],
                                     ChqueNumber: $scope.invoice[i]["ChqueNumber"],
                                     AdditionalDiscountApplied: $scope.invoice[i]["AdditionalDiscountApplied"],
                                     DiscountInPercentage: $scope.invoice[i]["DiscountInPercentage"],
                                     DiscountInAmount: $scope.invoice[i]["DiscountInAmount"],
                                     InvoiceBy: $scope.invoice[i]["InvoiceBy"],
                                     Remark: $scope.invoice[i]["Remark"],
                                     DalidityInDays: $scope.invoice[i]["DalidityInDays"],
                                     IncludedServices: $scope.invoice[i]["IncludedServices"],
                                     IncludedServicesTax: $scope.invoice[i]["IncludedServicesTax"],
                                     IncludedServicesTaxInPercentage: $scope.invoice[i]["IncludedServicesTaxInPercentage"],
                                     IncludedServicesTaxInAmount: $scope.invoice[i]["IncludedServicesTaxInAmount"],
                                     IncludedPackages: $scope.invoice[i]["IncludedPackages"],
                                     IncludedPackagesTax: $scope.invoice[i]["IncludedPackagesTax"],
                                     IncludedPackageTaxInPercentage: $scope.invoice[i]["IncludedPackageTaxInPercentage"],
                                     IncludedPackageTaxInAmount: $scope.invoice[i]["IncludedPackageTaxInAmount"],
                                     GYMID: $scope.invoice[i]["GYMID"],
                                     BranchID: $scope.invoice[i]["BranchID"],
                                     TotalPaidRuppes: $scope.gettotalpaid($scope.invoice[i]["TransactionID"])
                                 })
                             }
                 })
                 .error(function (result) {
                     if (!alert('Failed to load Invoice Transactions Data..!')) {
                         window.location.reload();
                     }
                 });
         })
         .error(function (result) {
             if (!alert('Failed to load Invoice Data..!')) {
                 window.location.reload();
             }
         });


        //$http.get("http://gym.excellencea.com/api/InvoicePackage")
        // .then(function (response) {
        //     $scope.invoicepackages = response.data;
        // });


        $http({ method: "GET", url: "http://gym.excellencea.com/api/InvoicePackage" })
        .success(function (result) {
            $scope.invoicepackages = result;
        })
        .error(function (result) {
            if (!alert('Package Detail Loading Failed..!')) {
                window.location.reload();
            }
        });


        $http({ method: "GET", url: "http://gym.excellencea.com/api/invoiceService" })
            .success(function (result) {
                $scope.invoiceServices = result;
            })
            .error(function (result) {
                if (!alert('Service Detail Loading Failed..!')) {
                    window.location.reload();
                }
            });


        $http({ method: "GET", url: "http://gym.excellencea.com/api/InvoiceTax" })
            .success(function (result) {
                $scope.invoicetaxes = result;
            })
            .error(function (result) {
                if (!alert('Tax Details Loading Failed..!')) {
                    window.location.reload();
                }
            });

        
        $scope.SelectTransaction = function (SelectedTransaction,SelectedMemberID,BillingAmount,paidAmount)
        {
            $scope.paidrupeestotal = 0;
            $scope.paidrupeestotal = paidAmount
            $scope.invoicepackages2 = [];
            $scope.BalancePaymentTransactionID = SelectedTransaction;
            $scope.BalancePaymentMemberID = SelectedMemberID;
            $scope.PrebalancePaid = BillingAmount - $scope.gettotalpaid($scope.BalancePaymentTransactionID);

            for (var i = 0; i < $scope.invoice.length; i++)
            {
                if ($scope.invoice[i]["TransactionID"] == SelectedTransaction && $scope.invoice[i]["TransactionID"]!=null)
                {
                    $scope.balancePaymentBillingamount = $scope.invoice[i]["BillingAmount"];
                }
            }
            for (var i = 0; i < $scope.invoicepackages.length; i++)
            {
               if ($scope.invoicepackages[i]["TransactionID"] == SelectedTransaction)
               {
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
                else
                {

                }
            }
        }

        $scope.var = 0;
    $scope.addBalancepayment = function ()
    {
        $scope.str = "";
        var currentTime = new Date()
        var hours = currentTime.getHours()
        var minutes = currentTime.getMinutes()
        var seconds = currentTime.getSeconds()

        if (minutes < 10) {
            minutes = "0" + minutes
        }
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        $scope.str += hours + ":" + minutes + ":" + seconds + " ";
        if (hours > 11) {
            $scope.str += "PM"
        } else {
            $scope.str += "AM"
        }

        if ($scope.var == 0)
        {
            $.ajax({
                async: true,
                crossDomain: true,
                url: "http://gym.excellencea.com/api/invoiceTransaction",
                method: "POST",
                data:
                {
                    "InvoiceID": $scope.InvoiceNumberinInvoice,
                    "MemberID": $scope.BalancePaymentMemberID,
                    "TransactionID": $scope.BalancePaymentTransactionID,
                    "Date": $scope.day1,
                    "BillingAmount": $scope.balancePaymentBillingamount,
                    "Paid": document.getElementById("payingAmount1").value,
                    "Balance": $scope.PostbalancePaid,
                    "Status": document.getElementById("PaymentMethod").value.toString().substring(7, document.getElementById("PaymentMethod").value.length),
                    "BillingTime": $scope.str
                },
                success: function () {
                    if (!alert('Invoice Generated Sucessufully..!')) { window.location.reload(); }
                },
                error: function (req, status, errorObj) {
                    alert("Invoice Not Added : " + errorObj.toString());
                }
            });

            $scope.var = 1;
        }
    }


    };
    $scope.init();



    $scope.balancePaymentDetails = function (payingAmount1, PrebalancePaid) {
        $scope.PostbalancePaid = (document.getElementById("PrebalancePaid").value - document.getElementById("payingAmount1").value);
    }




    $scope.isDisabled = false;
    $scope.disableButton = function () {
        $scope.isDisabled = true;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  
});



