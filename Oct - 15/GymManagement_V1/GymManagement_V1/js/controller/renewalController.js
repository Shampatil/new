'use strict';
//<!-------------------------------------------------------- Start of validation  ------------------------------------------------------------------------------------------
//@Package     :-
//@Sub-Package :-
//@Category    :-
//@Link        :-
//@Since       :-
//@Filesource  :-
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
gymManagementApp.controller('renewalController', function ($scope, $state, $http, $rootScope, $location, Idle, $route, exDialog, commonService, $localStorage, userSessionService) {

    var mytotal;
    $scope.grandtotal;
    $scope.init = function () {
        Idle.watch();
        $scope.grndprice=0;

        $location.path('/dashboard/renewal');
        $scope.packagesNames = [{}];

        $scope.press = 0;

        $scope.selectedPackageName = null;
        $scope.selectedPackageStartDate = null;
        $scope.selectedPackageValidityInDays = null;
        $scope.selectedPackageEndDate = null;
        $scope.selectedPackageAddDays = parseInt(0);
        $scope.selectedPackageNewExpityDate = "";


        $http({ method: "GET", url: "http://gym.excellencea.com/api/member" }).success(function (result) {
            $scope.GMSMember = result;
            console.log($scope.GMSMember);
        });

        $http({ method: "GET", url: "http://gym.excellencea.com/api/invoicePackage" }).success(function (result)
        {
            $scope.GMSinvoicePackage = result;
        })
        .error(function()
        {
            if (!alert('Invoice Detail Loading Failed..!')) { window.location.reload(); }
        });


        $http({ method: "GET", url: "http://gym.excellencea.com/api/member" }).success(function (result)
        {
            $scope.GMSMember = result;
        })
        .error(function ()
        {
            if (!alert('Invoice Detail Loading Failed..!')) { window.location.reload(); }
        });


        $http({ method: "GET", url: "http://gym.excellencea.com/api/invoicepackage" }).success(function (result)
        {
            $scope.GMSinvoicepackage = result;
        })
        .error(function ()
        {
            if (!alert('Invoice Detail Loading Failed..!')) { window.location.reload(); }
        });


        $http({ method: "GET", url: "http://gym.excellencea.com/api/invoiceservice" }).success(function (result)
        {
            $scope.GMSinvoiceServices = result;
        })
        .error(function ()
        {
            if (!alert('Invoice Detail Loading Failed..!')) { window.location.reload(); }
        });

        //$http({ method: "GET", url: "http://gym.excellencea.com/api/service" }).success(function (result) {
        //    $scope.GMSServices = result;
        //})
        //.error(function () {
        //    if (!alert('Invoice Detail Loading Failed..!')) { window.location.reload(); }
        //});



        $http({ method: "GET", url: "http://gym.excellencea.com/api/invoice" }).success(function (result)
        {
            $scope.GMSinvoiceTransaction = result;
        })
        .error(function ()
        {
            if (!alert('Invoice Detail Loading Failed..!')) { window.location.reload(); }
        });

        $http({ method: "GET", url: "http://gym.excellencea.com/api/package" }).success(function (result) {
            $scope.GMSpackages = result;
        })
        .error(function () {
            if (!alert('Invoice Detail Loading Failed..!')) { window.location.reload(); }
        });

        $http({ method: "GET", url: "http://gym.excellencea.com/api/servicewithtax" }).success(function (result) {
            $scope.taxes = result;
        })
        .error(function () {
            if (!alert('Invoice Detail Loading Failed..!')) { window.location.reload(); }
        });

        $http({ method: "GET", url: "http://gym.excellencea.com/api/packagewithservice" }).success(function (result) {
            $scope.GMSPackageWithService = result;
        })
        .error(function () {
            if (!alert('Invoice Detail Loading Failed..!')) { window.location.reload(); }
        });



        $('#squaredOne').click(function ()
        {
            if ($("#searchtable").is(":visible") == true) {
                $("#searchtable").hide();
            }
            else
            {
                $("#searchtable").show();
            }
        });


        $("#followup_Status").change(function ()
        {
            var control = $(this);
            if (control.val() == 'number:4') {
                $("#cheque").show();
                $("#cash").hide();
                $("#debitcard").hide();
                $("#creditcard").hide();
            }
            else if (control.val() == 'number:1')
            {
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



        $scope.services = [    { ServiceID: 1, ServiceName: 'Cash' },    { ServiceID: 2, ServiceName: 'Debit Card' },    { ServiceID: 3, ServiceName: 'Credit Card' },    { ServiceID: 4, ServiceName: 'Cheque' },        ];


        // Get Current Date
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

        $scope.selectedRow = 0;

        $scope.setClickedRow = function (index) {
            $scope.selectedRow = index - 1;
            console.log(index.fn);
            //$("#searchtable").hide();
        }

        $scope.submitRenewalForm = function () {
            alert("submit");
        }

        $scope.SelectedPackageRenew = function (MemberID, TransactionID, InvoiceID, Packagename,StartDate,ValidityInDays,EndDate) {
            $scope.selectedPackageName = Packagename;
            $scope.selectedPackageStartDate = StartDate;
            $scope.selectedPackageValidityInDays = parseInt(ValidityInDays);
            $scope.selectedPackageEndDate = EndDate;
        }


        $scope.result = null
        $scope.selectedPackageTotalDays = null;
        $scope.SelectedPackageRenewDate = function (selectedPackageAddDays,selectedPackageStartDate) {
            $scope.selectedPackageNewExpityDate = $scope.GetpackageExpiryDate($scope.selectedPackageEndDate, selectedPackageAddDays)

            $scope.selectedPackageTotalDays = parseInt(selectedPackageAddDays) + $scope.selectedPackageValidityInDays;
        }


        $scope.GetpackageExpiryDate = function (date, days) {

            if (parseInt(days) == 0) {
                days =parseInt(1);
            }
            var result = new Date(date);
            result.setDate(result.getDate() +parseInt(days));
            return result.toString().substr(0, 15)
        }

        $scope.Selectmember = function (MemberId,ID,GYMID,BranchID,InquiryID,AdmissionDate,EnquiryDate,Fname,Mname,Lname,BirthDate,Email,Mobile,Gender,MarritalStatus) {
            $scope.ID = ID;
            $scope.MemberId = MemberId;
            $scope.GYMID = GYMID;
            $scope.BranchID = BranchID;
            $scope.InquiryID = InquiryID;
            $scope.AdmissionDate = AdmissionDate;
            $scope.EnquiryDate = EnquiryDate;
            $scope.Fname = Fname;
            $scope.Mname = Mname;
            $scope.Lname = Lname;
            $scope.BirthDate = BirthDate;
            $scope.Email = Email;
            $scope.Mobile = Mobile;
            $scope.Gender = Gender;
            $scope.MarritalStatus = MarritalStatus;
        }
    };
    $scope.init();





    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  
});



