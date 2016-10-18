﻿'use strict';

gymManagementApp.controller('addonPackagesController', function ($scope, $uibModal, $log, $state, $http, $rootScope, $location, Idle, $route, exDialog, commonService, $localStorage, userSessionService) {

    $scope.init = function () {
        Idle.watch();

            ///////////////////////////////////////// Get Todays Date /////////////////////////////////////////
                        var d = new Date();
                        d.setDate(d.getDate());
                        var day = d.getDate();
                        if (day < 9) {
                            day = "0" + day
                        }
                        var year = d.getFullYear();
                        var month = new Array();
                        month[0] = "01";
                        month[1] = "02";
                        month[2] = "03";
                        month[3] = "04";
                        month[4] = "05";
                        month[5] = "06";
                        month[6] = "07";
                        month[7] = "08";
                        month[8] = "09";
                        month[9] = "10";
                        month[10] = "11";
                        month[11] = "12";
                        var month = month[d.getMonth()];
                        $scope.startingdate1 = year + "-" + month + "-" + day;
            //////////////////////////////////////////////////////////////////////////////////////////////////

        $scope.authorisedby = "sham";
        $scope.GMSPackages = [];
        $scope.invoiceDate = $scope.startingdate1;
        $scope.newinvoiceid = "";
        $scope.packagewithservice = "";
        $scope.Uniquepackagewithservice = "";
        $scope.taxes = "";
        $scope.goforinvoice = 0;
        $scope.packagestartdate = "";
        $scope.packageEndDate = "";
        $scope.packageValidityDays = "";
        $scope.incrementalId = 0;
        $scope.packagevalidity = "";
        $scope.StartDate = "0"
        $scope.SubmitGymID = "GMS-001"
        $scope.SubmitBranchID = "GMS-001-PF"

        $http({ method: "GET", url: "http://gym.excellencea.com/api/invoice" })
         .success(function (result) {
             $scope.newinvoiceid = "PF001TS1617" + (parseInt(result.length) + 100001).toString().substr(1, 5);;
             $scope.UNIQUETRANSACTIONID = "PF001TS1617-" + (parseInt(result.length) + 100001).toString().substr(1, 5);
         })
         .error(function (result) {
             if (!alert('Failed to load Data..!')) {
                 window.location.reload();
             }
         });

        $scope.fianlPackagesArray = [];
        for (var key in $scope.packagerow)
        {
            $scope.s1 = 0
            if ($scope.packagerow.hasOwnProperty(key)) {
                for (var key2 in $scope.packagerow[key]) {
                    for (var key3 in $scope.packagerow[key][key2]) {
                        if (JSON.stringify($scope.packagerow[key][key2][key2]) != null && JSON.stringify($scope.packagerow[key][key2][key2]).toString().includes("object:") == false && $scope.s1 == 0) {
                            $scope.s1 = 1;
                            $scope.fianlPackagesArray.push({
                                Packagename: $scope.packagerow[key][key2]["Packagename"],
                                PackageMRP: $scope.packagerow[key][key2]["PackageMRP"],
                                AprovalStatus: $scope.packagerow[key][key2]["AprovalStatus"],
                                PhotoURL: $scope.packagerow[key][key2]["PhotoURL"],
                                TotalTaxInPercentage: $scope.packagerow[key][key2]["TotalTaxInPercentage"],
                                ValidityDays: $scope.packagerow[key][key2]["ValidityDays"],
                                IncludedServiceLevelTaxAmount: $scope.packagerow[key][key2]["IncludedServiceLevelTaxAmount"],
                                IncludedServiceLevelTaxPercentage: $scope.packagerow[key][key2]["IncludedServiceLevelTaxPercentage"],
                                TotalTaxInAmount: $scope.packagerow[key][key2]["TotalTaxInAmount"],
                                StartDate: $scope.packagerow[key][key2]["StartDate"],
                                EndDate: $scope.GetpackageExpiryDate($scope.packagerow[key][key2]["StartDate"],$scope.packagerow[key][key2]["ValidityDays"]),
                            });
                        }
                    }
                }
            }
        }

        $scope.GetpackageExpiryDate = function (date,days)
        {
            if (days == null)
            {
                days = 1;
            }
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result.toString().substr(0, 15)
        }

        $http({ method: "GET", url: "http://gym.excellencea.com/api/Package" })
        .success(function (result) {
            $scope.GMSPackages = result;
            $scope.GMSpackages1 = [];
            for (var i = 0; i < $scope.GMSPackages.length; i++)
            {
                if ($scope.GMSPackages[i]["AprovalStatus"] == "Aproved")
                {
                    $scope.GMSpackages1.push({
                        Packagename: $scope.GMSPackages[i]["Packagename"],
                        PackageMRP: $scope.GMSPackages[i]["PackageMRP"],
                        AprovalStatus: $scope.GMSPackages[i]["AprovalStatus"],
                        PhotoURL: $scope.GMSPackages[i]["PhotoURL"],
                        TotalTaxInPercentage: $scope.GMSPackages[i]["TotalTaxInPercentage"],
                        ValidityDays: parseInt($scope.GMSPackages[i]["ValidityDays"]),
                        IncludedServiceLevelTaxAmount: $scope.GMSPackages[i]["IncludedServiceLevelTaxAmount"],
                        IncludedServiceLevelTaxPercentage: $scope.GMSPackages[i]["IncludedServiceLevelTaxPercentage"],
                        TotalTaxInAmount: $scope.GMSPackages[i]["TotalTaxInAmount"],
                        StartDate: $scope.startingdate1,
                        EndDate: $scope.GMSPackages[i]["EndDate"],
                    })
                    $scope.GMSPackages.push()
                }
            }
        })
        .error(function (result) {
            if (!alert('Packages Detail Loading Failed..!'))
            {
                window.location.reload();
            } 
        });

        $http({ method: "GET", url: "http://gym.excellencea.com/api/member" })
            .success(function (result) {
                $scope.newMemberid = "PL001MEM-" + (parseInt(result.length) + 100001).toString().substr(1, 5);
            })
            .error(function (result) {
                if (!alert('Failed to load Data..!')) {
                    window.location.reload();
                }
            });

        $http.get("http://gym.excellencea.com/api/Package")
            .then(function (response) {
                $scope.packagevalidity = response.data;
            });

        $http({ method: "GET", url: "http://gym.excellencea.com/api/invoiceTransaction" })
            .success(function (result) {
                $scope.InvoiceNumberinInvoice = "PF001IN1617-" + (parseInt(result.length) + 100001).toString().substr(1, 5);
            })
            .error(function (result) {
                if (!alert('Failed to load transaction ID..!')) {
                    window.location.reload();
                }
            });


        $http({ method: "GET", url: "http://gym.excellencea.com/api/packagewithservice" })
            .success(function (result) {
                $scope.packagewithservice = result;
            })
            .error(function (result) {
                if (!alert('Service Detail Loading Failed..!')) {
                    window.location.reload();
                }
            });


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

        $location.path('/dashboard/newAdmission');
        var mytotal;
        $scope.uid = 0;
        $scope.grandtotal;
        $scope.grndprice = 0;
        $scope.startingdate = 0;
        $scope.myPackages = "";
        
        $scope.services = [    { ServiceID: 1, ServiceName: 'Cash' },    { ServiceID: 2, ServiceName: 'Debit Card' },    { ServiceID: 3, ServiceName: 'Credit Card' },    { ServiceID: 4, ServiceName: 'Cheque' },        ];

        //// Get Current Date
            
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

        // Get Enquiry Records
        $http.get("http://gym.excellencea.com/api/enquiry")
        .then(function (response) {
            $scope.Enqueries = response.data;
        });

        $scope.selectedRow = 0;

        $scope.setClickedRow = function (index) {
            $scope.selectedRow = index - 1;
            console.log(index.fn);
            //$("#searchtable").hide();
        }

        var httpRespose = $http.get("http://gym.excellencea.com/api/servicewithtax");
        httpRespose.then(function (response) {
            $scope.taxes = response.data;
        });

        $scope.selectedRow = 0;



        $scope.messagewarning = function (sss) {
            alert("You selected Discount type " + sss + " Please be Careful...!!!")
        };

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        $scope.row = [{}];
        $scope.nrow = [];
        $scope.choices = [];
        var total = 0;

        $scope.addRow = function () {
            $scope.row.push({
            });
        };


        $scope.rRow = function (lastItem) {
            $scope.row.splice(lastItem, 1)({
            });
        };

        $scope.packagesarray = [{}];
        var arr = new Array();

        $scope.getpackagesarray = function () {

        }

        $scope.packagerow = [{}];
        $scope.packagerow1 = [{}];
        $scope.packagenrow = [];

        $scope.addpackage = function () {
            $scope.packagerow.push({});
        };

        $scope.packagerRow = function (lastItem) {
            $scope.packagerow.splice(lastItem, 1)({
            });
        };

        $scope.getpackageDetails = function (packagerow) {
               
            var sum = 0;
            for (var i = 0; i < $scope.packagewithservice.length; i++) {
                if (packagerow == $scope.packagewithservice[i]["PackageName"] && packagerow!=null) {
                        
                    sum += parseInt($scope.packagewithservice[i]["ServicePrice"]);
                }
            }
            return parseInt(sum)
        }


        $scope.getpackagetotaldiscountinpercentage = function (packagerow) {
            var discountsum = 0;
            for (var i = 0; i < $scope.packagewithservice.length; i++) {
                if (packagerow == $scope.packagewithservice[i]["PackageName"] && packagerow!=null) {
                    if ($scope.packagewithservice[i]["DiscountType"] == 'Percentage') {
                        discountsum += (parseInt($scope.packagewithservice[i]["ServiceDiscount"]) * parseInt($scope.packagewithservice[i]["ServicePrice"]) / 100);
                    }
                    else if ($scope.packagewithservice[i]["DiscountType"] == 'Rupees') {
                        discountsum += parseInt($scope.packagewithservice[i]["ServiceDiscount"]);
                    }
                }
            }
            var sumpackage = 0;
            for (var i = 0; i < $scope.packagewithservice.length; i++) {
                if (packagerow == $scope.packagewithservice[i]["PackageName"] && packagerow != null) {
                    sumpackage += parseInt($scope.packagewithservice[i]["ServicePrice"]);
                }
            }
            var tempvariable = 0;
            tempvariable = (parseInt(discountsum) / parseInt(sumpackage) * 100)


            if (isNaN(tempvariable))
            {
                tempvariable = 0;
            }
            return parseFloat(tempvariable).toFixed(2)
        }
        
    
        $scope.GetPackageTotaldiscount = function (packagerow) {
               
            var sum = 0;
            for (var i = 0; i < $scope.packagewithservice.length; i++)
            {
                if (packagerow == $scope.packagewithservice[i]["PackageName"] && packagerow != null)
                {
                    if ($scope.packagewithservice[i]["DiscountType"] == 'Percentage') {
                        sum += (parseInt($scope.packagewithservice[i]["ServiceDiscount"]) * parseInt($scope.packagewithservice[i]["ServicePrice"]) / 100);
                    }
                    else if ($scope.packagewithservice[i]["DiscountType"] == 'Rupees') {
                        sum += parseInt($scope.packagewithservice[i]["ServiceDiscount"]);
                    }
                }
            }
            return parseInt(sum)
        }

        $scope.getpackagestotalprice = function () {
            var sum = 0;
            for (var i = 0; i < $scope.fianlPackagesArray.length; i++) {
                for (var j = 0; j < $scope.packagewithservice.length; j++) {
                    if ($scope.fianlPackagesArray[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"]) {
                        sum += parseInt($scope.packagewithservice[j]["ServicePrice"]);
                    }
                }
            }
            return parseInt(sum);
        }

        $scope.getpackagestotaltax = function (pkname)
        {
            var sum = 0;
            var temp = 0;
            for (var j = 0; j < $scope.packagewithservice.length; j++)
            {
                if (pkname == $scope.packagewithservice[j]["PackageName"])
                {
                    if ($scope.packagewithservice[j]["DiscountType"] == "Percentage")
                    {
                        temp = parseInt($scope.packagewithservice[j]["ServicePrice"] * $scope.packagewithservice[j]["ServiceDiscount"] / 100);
                    }
                    else if ($scope.packagewithservice[j]["DiscountType"] == "Rupees")
                    {
                        temp = parseInt($scope.packagewithservice[j]["ServiceDiscount"]);
                    }
                    var sss = (($scope.packagewithservice[j]["ServicePrice"] - (temp)) * $scope.packagewithservice[j]["TotalTax"]) / 100;
                    sum += sss;
                }
            }
            return sum;
        }

        $scope.getallpackagestotaltax = function ()
        {

            var sum = 0;
            var temp = 0;

            for (var i = 0; i < $scope.fianlPackagesArray.length; i++) {
                for (var j = 0; j < $scope.packagewithservice.length; j++) {
                    if ($scope.fianlPackagesArray[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"]) {
                        if ($scope.packagewithservice[j]["DiscountType"] == "Percentage") {
                            temp = parseInt($scope.packagewithservice[j]["ServicePrice"] * $scope.packagewithservice[j]["ServiceDiscount"] / 100);
                        }
                        else if ($scope.packagewithservice[j]["DiscountType"] == "Rupees") {
                            temp = parseInt($scope.packagewithservice[j]["ServiceDiscount"]);
                        }

                        var sss = (($scope.packagewithservice[j]["ServicePrice"] - (temp)) * $scope.packagewithservice[j]["TotalTax"]) / 100;
                        sum += sss;
                    }
                }
            }
            return parseInt(sum);
        }


        $scope.getpackagestotalDiscount = function () {
            var sum = 0;
            $scope.fianlPackagesArray = [];
            for (var key in $scope.packagerow) {
                $scope.s1 = 0
                if ($scope.packagerow.hasOwnProperty(key)) {
                    for (var key2 in $scope.packagerow[key]) {
                        for (var key3 in $scope.packagerow[key][key2]) {
                            if (JSON.stringify($scope.packagerow[key][key2][key2]) != null && JSON.stringify($scope.packagerow[key][key2][key2]).toString().includes("object:") == false && $scope.s1 == 0) {
                                $scope.s1 = 1;
                                $scope.fianlPackagesArray.push({
                                    Packagename: $scope.packagerow[key][key2]["Packagename"],
                                    PackageMRP: $scope.packagerow[key][key2]["PackageMRP"],
                                    AprovalStatus: $scope.packagerow[key][key2]["AprovalStatus"],
                                    PhotoURL: $scope.packagerow[key][key2]["PhotoURL"],
                                    TotalTaxInPercentage: $scope.packagerow[key][key2]["TotalTaxInPercentage"],
                                    ValidityDays: $scope.packagerow[key][key2]["ValidityDays"],
                                    IncludedServiceLevelTaxAmount: $scope.packagerow[key][key2]["IncludedServiceLevelTaxAmount"],
                                    IncludedServiceLevelTaxPercentage: $scope.packagerow[key][key2]["IncludedServiceLevelTaxPercentage"],
                                    TotalTaxInAmount: $scope.packagerow[key][key2]["TotalTaxInAmount"],
                                    StartDate: $scope.packagerow[key][key2]["StartDate"],
                                    EndDate: $scope.GetpackageExpiryDate($scope.packagerow[key][key2]["StartDate"], $scope.packagerow[key][key2]["ValidityDays"]),
                                });
                            }
                        }
                    }
                }
            }

            for (var i = 0; i < $scope.fianlPackagesArray.length; i++) {
                for (var j = 0; j < $scope.packagewithservice.length; j++) {
                    if ($scope.fianlPackagesArray[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"]) {
                        if ($scope.packagewithservice[j]["DiscountType"] == "Percentage") {
                            sum += parseInt($scope.packagewithservice[j]["ServicePrice"] * $scope.packagewithservice[j]["ServiceDiscount"] / 100);
                        }
                        else if ($scope.packagewithservice[j]["DiscountType"] == "Rupees") {
                            sum += parseInt($scope.packagewithservice[j]["ServiceDiscount"]);
                        }
                    }
                }
            }
            return parseInt(sum);
        }



        $scope.getpackagestaxtotal = function () {
            var sum = 0;
            for (var i = 0; i < $scope.packagewithservice.length; i++) {
                for (var j = 0; j < $scope.taxes.length; j++) {
                    if ($scope.packagewithservice[i]["Packagename"] == $scope.taxes[j]["Product_Name"]) {
                        if ($scope.taxes[j]["Product_Type"] == "Package Level Tax") {
                            sum += parseInt($scope.taxes[j]["Percentage"]);
                        }
                    }
                }
            }
            return sum;
        }

        $scope.getpackageLevelTaxTotal = function (packagerow) {
            var sum = 0;

            $scope.packageinvoice();

            for (var i = 0; i < $scope.taxes.length; i++) {
                if (packagerow == $scope.taxes[i]["Product_Name"] && $scope.taxes[i]["Product_Type"] == "Package Level Tax" && packagerow != null) {
                    sum += parseInt($scope.taxes[i]["Percentage"]);
                }
            }
            return sum
        }


        $scope.getpackageleveltaxtotalinrupees = function ()
        {
            $scope.fianlPackagesArray = [];
            for (var key in $scope.packagerow) {
                $scope.s1 = 0
                if ($scope.packagerow.hasOwnProperty(key)) {
                    for (var key2 in $scope.packagerow[key]) {
                        for (var key3 in $scope.packagerow[key][key2]) {
                            if (JSON.stringify($scope.packagerow[key][key2][key2]) != null && JSON.stringify($scope.packagerow[key][key2][key2]).toString().includes("object:") == false && $scope.s1 == 0) {
                                $scope.s1 = 1;

                                $scope.fianlPackagesArray.push({
                                    Packagename: $scope.packagerow[key][key2]["Packagename"],
                                    PackageMRP: $scope.packagerow[key][key2]["PackageMRP"],
                                    AprovalStatus: $scope.packagerow[key][key2]["AprovalStatus"],
                                    PhotoURL: $scope.packagerow[key][key2]["PhotoURL"],
                                    TotalTaxInPercentage: $scope.packagerow[key][key2]["TotalTaxInPercentage"],
                                    ValidityDays: $scope.packagerow[key][key2]["ValidityDays"],
                                    IncludedServiceLevelTaxAmount: $scope.packagerow[key][key2]["IncludedServiceLevelTaxAmount"],
                                    IncludedServiceLevelTaxPercentage: $scope.packagerow[key][key2]["IncludedServiceLevelTaxPercentage"],
                                    TotalTaxInAmount: $scope.packagerow[key][key2]["TotalTaxInAmount"],
                                    StartDate: $scope.packagerow[key][key2]["StartDate"],
                                    EndDate: $scope.GMSPackages[i]["EndDate"],
                                });
                            }
                        }
                    }
                }
            }

            var packagestotaldiscount = 0;
            for (var i = 0; i < $scope.fianlPackagesArray.length; i++)
            {
                var eachpackageprice = 0;
                for (var j = 0; j < $scope.packagewithservice.length; j++)
                {

                    if ($scope.fianlPackagesArray[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"])
                    {
                        if ($scope.packagewithservice[j]["DiscountType"] == "Percentage") {
                            packagestotaldiscount += parseInt($scope.packagewithservice[j]["ServicePrice"] * $scope.packagewithservice[j]["ServiceDiscount"] / 100);
                        }
                        else if ($scope.packagewithservice[j]["DiscountType"] == "Rupees") {
                            packagestotaldiscount += parseInt($scope.packagewithservice[j]["ServiceDiscount"]);
                        }
                    }


                    if ($scope.fianlPackagesArray[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"]) {
                        eachpackageprice += parseInt($scope.packagewithservice[j]["ServicePrice"]);
                    }

                    var eachpackagetotaltax = 0;
                    for (var k = 0; k < $scope.taxes.length; k++) {
                        if ($scope.fianlPackagesArray[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"]) {
                            eachpackageprice += parseInt($scope.packagewithservice[j]["ServicePrice"]);

                            if ($scope.taxes[k]["Product_Name"] == $scope.packagewithservice[j]["PackageName"] && $scope.taxes[k]["Product_Name"] == $scope.fianlPackagesArray[i]["Packagename"] && $scope.taxes[k]["Product_Type"] == "Package Level Tax" && $scope.taxes[k]["Percentage"] != null && $scope.taxes[k]["Percentage"] != 'undefined') {
                                eachpackagetotaltax += parseInt($scope.taxes[k]["Percentage"]);
                            }
                        }
                    }

                    if (eachpackagetotaltax > 0) {
                        console.log(eachpackageprice);
                        console.log("Package name :" + $scope.packagewithservice[j]["PackageName"] + "  each package total :" + eachpackagetotaltax);
                    }
                }
            }
            console.log("Total Discount On Package :" + packagestotaldiscount);
        }

        $scope.packageinvoice = function ()
        {
            $scope.discountamount = 0;
            for (var i = 0; i < $scope.fianlPackagesArray.length; i++) {
                for (var j = 0; j < $scope.packagewithservice.length; j++)
                {

                    if ($scope.fianlPackagesArray[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"]) {
                        if ($scope.packagewithservice[j]["DiscountType"] == "Rupees") {
                            $scope.discountamount += $scope.packagewithservice[j]["ServicePrice"] - $scope.packagewithservice[j]["ServiceDiscount"];
                        }
                        else if ($scope.packagewithservice[j]["DiscountType"] == "Percentage") {
                            $scope.discountamount += $scope.packagewithservice[j]["ServicePrice"] - ($scope.packagewithservice[j]["ServiceDiscount"] * $scope.packagewithservice[j]["ServicePrice"] / 100);
                        }
                    }

                       
                }
            }
        }

        $scope.getpackagleveltaxamount = function()
        {
            var packageleveltax = 0;
            $scope.myservices = "";
            $scope.totalpackageprice = 0;
            $scope.totalpackagediscount = 0;
            $scope.totaltaxapplied = 0;
            $scope.packageleveltaxtotal = 0;
            $scope.gettotalpackagestaxinrupees =0;

            for (var i = 0; i < $scope.fianlPackagesArray.length; i++)
            {
                for (var j = 0; j < $scope.packagewithservice.length; j++)
                {
                    if ($scope.fianlPackagesArray[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"])
                    {
                        if ($scope.packagewithservice[j]["DiscountType"] == "Rupees") {
                            var discountamount = $scope.packagewithservice[j]["ServicePrice"] - $scope.packagewithservice[j]["ServiceDiscount"];
                        }
                        else if ($scope.packagewithservice[j]["DiscountType"] == "Percentage") {
                            var discountamount = $scope.packagewithservice[j]["ServicePrice"] - ($scope.packagewithservice[j]["ServiceDiscount"] * $scope.packagewithservice[j]["ServicePrice"] / 100);
                        }
                        //$scope.myservices += "{" + ("ServiceName :" + $scope.packagewithservice[j]["IncludeServiceName"] + "," +
                        //  "Price: " + $scope.packagewithservice[j]["ServicePrice"] + "," +
                        //  "Discount: " + $scope.packagewithservice[j]["ServiceDiscount"] + "," +
                        //  "DiscountType: " + $scope.packagewithservice[j]["DiscountType"] + "," +
                        //  "TotalTax: " + $scope.packagewithservice[j]["TotalTax"] + "," +
                        //   "Discount Rupees: " + (parseInt($scope.packagewithservice[j]["ServicePrice"]) - discountamount) + "," +
                        //   "Price After Discount: " + discountamount + "," +
                        //   "Total Tax On service: " + discountamount * $scope.packagewithservice[j]["TotalTax"] / 100) + "},";
                        $scope.totalpackageprice += parseInt($scope.packagewithservice[j]["ServicePrice"]);
                        $scope.totalpackagediscount += (parseInt($scope.packagewithservice[j]["ServicePrice"]) - discountamount);
                        $scope.totaltaxapplied += discountamount * $scope.packagewithservice[j]["TotalTax"] / 100;
                        discountamount = null;
                    }
                }

                for (var k = 0; k < $scope.taxes.length; k++)
                {
                    if ($scope.fianlPackagesArray[i]["Packagename"] == $scope.taxes[k]["Product_Name"] && $scope.taxes[k]["Product_Type"] == "Package Level Tax" && $scope.fianlPackagesArray[i]["Packagename"] != null) {
                        $scope.packageleveltaxtotal += parseInt($scope.taxes[k]["Percentage"]);
                    }
                }

                $scope.gettotalpackagestaxinrupees += ($scope.packageleveltaxtotal * (parseInt($scope.totalpackageprice) - parseInt($scope.totalpackagediscount)) / 100);
                $scope.packagesleveltaxtotal += ($scope.packageleveltaxtotal * (parseInt($scope.totalpackageprice) - parseInt($scope.totalpackagediscount)) / 100);
                $scope.myservices = "";
                $scope.totalpackagediscount = null;
                $scope.totalpackageprice = null;
                $scope.totaltaxapplied = null;
                $scope.packageleveltaxtotal = null;
            }
            return parseInt($scope.gettotalpackagestaxinrupees);
        }


        $('#lnkPrint').click(function () {
            // window.print();
        });



        $('#lnkPrint').click(function ()
        {


        });

        $scope.Formprint = function()
        {

              
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
        $scope.getStartDate = function ()
        {
            var d = new Date();
            d.setDate(d.getDate());
            var day = d.getDate();
            if (day < 9)
            {
                day = "0" + day
            }
            var year = d.getFullYear();
            var month = new Array();
            month[0] = "01";
            month[1] = "02";
            month[2] = "03";
            month[3] = "04";
            month[4] = "05";
            month[5] = "06";
            month[6] = "07";
            month[7] = "08";
            month[8] = "09";
            month[9] = "10";
            month[10] = "11";
            month[11] = "12";
            var month = month[d.getMonth()];
            $scope.startingdate = year + "-" + month + "-" + day;
            return $scope.startingdate;
        }

        $scope.getExpirydate = function (sdate, vdate)
        {
            $scope.validforDays = vdate;
            $scope.packagevalidityindays = sdate;
            if ($scope.packagevalidityindays == undefined)
            {
                var d = new Date();
                d.setDate(d.getDate());
                var day = d.getDate();
                if (day < 9)
                {
                    day = "0" + day
                }
                var year = d.getFullYear();
                var month = new Array();
                month[0] = "01";
                month[1] = "02";
                month[2] = "03";
                month[3] = "04";
                month[4] = "05";
                month[5] = "06";
                month[6] = "07";
                month[7] = "08";
                month[8] = "09";
                month[9] = "10";
                month[10] = "11";
                month[11] = "12";
                var month = month[d.getMonth()];
                $scope.packagevalidityindays = year + "-" + month + "-" + day;
            }

            var ddd = isNaN($scope.validforDays)
            if (ddd == true)
            {
                $scope.validforDays = 0;
            }
            if ($scope.validforDays == null)
            {
                $scope.validforDays = 0;
            }
            var d = new Date($scope.packagevalidityindays);
            d.setDate(d.getDate() + parseInt($scope.validforDays));
            var day = d.getDate();
            var year = d.getFullYear();
            var month = d.getMonth();
            var expirydate = day + "-" + n + "-" + year;
            return expirydate;
        }


        $scope.getvaliditydays = function ()
        {
            for (var i = 0; i < $scope.packagevalidity.length; i++) {
                for (var val = 0; val < $scope.packagevalidity.length; val++) {
                    if ($scope.fianlPackagesArray[i]["Packagename"] == $scope.packagevalidity[val]["Packagename"] && $scope.fianlPackagesArray[i]["Packagename"] != null) {
                        $scope.packagestartdate = $scope.packagevalidity[val]["StartDate"];
                        $scope.packageEndDate = $scope.packagevalidity[val]["EndDate"];
                        $scope.packageValidityDays = $scope.packagevalidity[val]["ValidityDays"];

                        return $scope.packagevalidity[val]["ValidityDays"];
                    }
                }
            }
        }
  //  };










































































































        $scope.authorisedPersonName = "Sham"
         var mytotal;
         $scope.grandtotal;
         $scope.newinvoiceid = "";
         $scope.packagewithservice = "";
         $scope.taxes = "";
         $scope.goforinvoice = 0;
         $scope.packagestartdate = "";
         $scope.packageEndDate = "";
         $scope.packageValidityDays = "";
         $scope.incrementalId = 0;
         $scope.packagevalidity = "";
         $scope.MemberID = null;
         $scope.payingAmount = 0;
         $scope.packagerow = [];


         $scope.StartDate = ""

         $scope.SubmitGymID = "GMS-001"
         $scope.SubmitBranchID = "GMS-001-PF"

         $http.get("http://gym.excellencea.com/api/invoice")
          .then(function (response) {
              $scope.newinvoiceid = "PF001TS1617" + (parseInt(response.data.length) + 100001).toString().substr(1, 5);;
              $scope.UNIQUETRANSACTIONID = "PF001TS1617-" + (parseInt(response.data.length) + 100001).toString().substr(1, 5);
          });

        $http.get("http://gym.excellencea.com/api/member")
          .then(function (response) {
              $scope.newMemberid = "PL001MEM-" + (parseInt(response.data.length) + 100001).toString().substr(1, 5);
          });


        $http.get("http://gym.excellencea.com/api/Package")
          .then(function (response) {
              $scope.packagevalidity = response.data;
          });

        $http.get("http://gym.excellencea.com/api/invoiceTransaction")
          .then(function (response) {
              $scope.InvoiceNumberinInvoice = "PF001IN1617-" + (parseInt(response.data.length) + 100001).toString().substr(1, 5);
          });


        // Get Packages Records
        $http.get("http://gym.excellencea.com/api/packagewithservice")
        .then(function (response) {
            $scope.packagewithservice = response.data;
        });

        var httpRespose = $http.get("http://gym.excellencea.com/api/servicewithtax");
        httpRespose.then(function (response) {
            $scope.taxes = response.data;
        });

        //$http.get("http://gym.excellencea.com/api/enquiry")
        //.then(function (response) {
        //    $scope.Enqueries = response.data;
        //});


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
         if (hours > 11)
         {
             $scope.str += "PM"
         } else
         {
             $scope.str += "AM"
         }

        $location.path('/dashboard/addonPackages');
        var mytotal;
        $scope.uid = 0;
        $scope.grandtotal;
        $scope.grndprice = 0;
        $scope.startingdate = 0;
        $scope.myPackages = "";

        $('#ServiceStartdate').Zebra_DatePicker(
        {
            view: 'years',
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




            $("#followup_Status").change(function () {
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


            var d = new Date();
            d.setDate(d.getDate());
            var day = d.getDate();
            if (day < 9) {
                day = "0" + day
            }
            var year = d.getFullYear();
            var month = new Array();
            month[0] = "01";
            month[1] = "02";
            month[2] = "03";
            month[3] = "04";
            month[4] = "05";
            month[5] = "06";
            month[6] = "07";
            month[7] = "08";
            month[8] = "09";
            month[9] = "10";
            month[10] = "11";
            month[11] = "12";
            var month = month[d.getMonth()];
            $scope.day2 = year + "-" + month + "-" + day;

            $scope.selectedRow = 0;

            $scope.setClickedRow = function (index) {
                $scope.selectedRow = index - 1;
                console.log(index.fn);
            }

            $scope.selectedRow = 0;

            $scope.messagewarning = function (sss) {
                alert("You selected Discount type " + sss + " Please be Careful...!!!")
            };

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            $scope.row = [{}];
            $scope.nrow = [];
            $scope.choices = [];
            var total = 0;

            $scope.addRow = function () {
                $scope.row.push({

                });
            };


            $scope.rRow = function (lastItem) {
                $scope.row.splice(lastItem, 1)({
                });
            };

            $scope.packagesarray = [{}];
            var arr = new Array();


            $scope.getpackagesarray = function (memberID,strtdate,vlddays,enddate)
            {
                console.log("Start Date :- "+strtdate)
                console.log("validity days :- "+vlddays)
                console.log("End Date :- " + enddate)

                for (var i = 0; i < $scope.packagerow.length; i++) {
                    console.log($scope.packagerow[i]["packagename"])
                    console.log($scope.packagerow[i]["StartDate"])
                    console.log($scope.packagerow[i]["ValidityDays"])

                }

            }

            $scope.packagerow = [{ "Packagename": "", "StartDate": "", "ValidityDays": "","EndDate":"" }];
            $scope.packagerow1 = [{}];
            $scope.packagenrow = [];

            $scope.addpackage = function ()
            {
                $scope.packagerow.push({});
            };

            $scope.packagerRow = function (lastItem) {
                $scope.packagerow.splice(lastItem, 1)({
                });
            };

            $scope.getpackageDetails = function (packagerow) {
                var sum = 0;
                for (var i = 0; i < $scope.packagewithservice.length; i++) {
                    if (packagerow == $scope.packagewithservice[i]["PackageName"]) {
                        sum += parseInt($scope.packagewithservice[i]["ServicePrice"]);
                    }
                }
                return parseInt(sum)
            }


            $scope.getpackagetotaldiscountinpercentage = function (packagerow)
            {
                var discountsum = 0;
                for (var i = 0; i < $scope.packagewithservice.length; i++) {
                    if (packagerow == $scope.packagewithservice[i]["PackageName"]) {
                        if ($scope.packagewithservice[i]["DiscountType"] == 'Percentage') {
                            discountsum += (parseInt($scope.packagewithservice[i]["ServiceDiscount"]) * parseInt($scope.packagewithservice[i]["ServicePrice"]) / 100);
                        }
                        else if ($scope.packagewithservice[i]["DiscountType"] == 'Rupees') {
                            discountsum += parseInt($scope.packagewithservice[i]["ServiceDiscount"]);
                        }
                    }
                }
                var sumpackage = 0;
                for (var i = 0; i < $scope.packagewithservice.length; i++) {
                    if (packagerow == $scope.packagewithservice[i]["PackageName"]) {
                        sumpackage += parseInt($scope.packagewithservice[i]["ServicePrice"]);
                    }
                }
                var tempvariable = 0;
                tempvariable = (parseInt(discountsum) / parseInt(sumpackage) * 100)


                if (isNaN(tempvariable))
                {
                    tempvariable = 0;
                }
                return parseFloat(tempvariable).toFixed(2)
            }
        
    
            $scope.GetPackageTotaldiscount = function (packagerow) {
                var sum = 0;
                for (var i = 0; i < $scope.packagewithservice.length; i++) {
                    if (packagerow == $scope.packagewithservice[i]["PackageName"]) {
                        if ($scope.packagewithservice[i]["DiscountType"] == 'Percentage') {
                            sum += (parseInt($scope.packagewithservice[i]["ServiceDiscount"]) * parseInt($scope.packagewithservice[i]["ServicePrice"]) / 100);
                        }
                        else if ($scope.packagewithservice[i]["DiscountType"] == 'Rupees') {
                            sum += parseInt($scope.packagewithservice[i]["ServiceDiscount"]);
                        }
                    }
                }
                return parseInt(sum)
            }

            //$scope.getpackagestotalprice = function () {
            //    var sum = 0;
            //    for (var i = 0; i < $scope.packagerow.length; i++) {
            //        for (var j = 0; j < $scope.packagewithservice.length; j++) {
            //            if ($scope.packagerow[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"]) {
            //                sum += parseInt($scope.packagewithservice[j]["ServicePrice"]);
            //            }
            //        }
            //    }
            //    return parseInt(sum);
            //}

            $scope.getpackagestotaltax = function (pkname)
            {
                var sum = 0;
                var temp = 0;
                for (var j = 0; j < $scope.packagewithservice.length; j++)
                {
                    if (pkname == $scope.packagewithservice[j]["PackageName"])
                    {
                        if ($scope.packagewithservice[j]["DiscountType"] == "Percentage")
                        {
                            temp = parseInt($scope.packagewithservice[j]["ServicePrice"] * $scope.packagewithservice[j]["ServiceDiscount"] / 100);
                        }
                        else if ($scope.packagewithservice[j]["DiscountType"] == "Rupees")
                        {
                            temp = parseInt($scope.packagewithservice[j]["ServiceDiscount"]);
                        }
                        var sss = (($scope.packagewithservice[j]["ServicePrice"] - (temp)) * $scope.packagewithservice[j]["TotalTax"]) / 100;
                        sum += sss;
                    }
                 }
                return sum;
            }


            //$scope.getallpackagestotaltax = function ()
            //{
            //    var sum = 0;
            //    var temp = 0;
            //    for (var i = 0; i < $scope.packagerow.length; i++) {
            //        for (var j = 0; j < $scope.packagewithservice.length; j++) {
            //            if ($scope.packagerow[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"]) {
            //                if ($scope.packagewithservice[j]["DiscountType"] == "Percentage") {
            //                    temp = parseInt($scope.packagewithservice[j]["ServicePrice"] * $scope.packagewithservice[j]["ServiceDiscount"] / 100);
            //                }
            //                else if ($scope.packagewithservice[j]["DiscountType"] == "Rupees") {
            //                    temp = parseInt($scope.packagewithservice[j]["ServiceDiscount"]);
            //                }

            //                var sss = (($scope.packagewithservice[j]["ServicePrice"] - (temp)) * $scope.packagewithservice[j]["TotalTax"]) / 100;
            //                sum += sss;
            //            }
            //        }
            //    }
            //    return parseInt(sum);
            //}


            //$scope.getpackagestotalDiscount = function () {
            //    var sum = 0;
            //    for (var i = 0; i < $scope.packagerow.length; i++) {
            //        for (var j = 0; j < $scope.packagewithservice.length; j++) {
            //            if ($scope.packagerow[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"]) {
            //                if ($scope.packagewithservice[j]["DiscountType"] == "Percentage") {
            //                    sum += parseInt($scope.packagewithservice[j]["ServicePrice"] * $scope.packagewithservice[j]["ServiceDiscount"] / 100);
            //                }
            //                else if ($scope.packagewithservice[j]["DiscountType"] == "Rupees") {
            //                    sum += parseInt($scope.packagewithservice[j]["ServiceDiscount"]);
            //                }
            //            }
            //        }
            //    }
            //    return parseInt(sum);
            //}


            $scope.getpackagestaxtotal = function () {
                var sum = 0;
                for (var i = 0; i < $scope.packagewithservice.length; i++) {
                    for (var j = 0; j < $scope.taxes.length; j++) {
                        if ($scope.packagewithservice[i]["Packagename"] == $scope.taxes[j]["Product_Name"]) {
                            if ($scope.taxes[j]["Product_Type"] == "Package Level Tax") {
                                sum += parseInt($scope.taxes[j]["Percentage"]);
                            }
                        }
                    }
                }
                return sum;
            }

            $scope.getpackageLevelTaxTotal = function (packagerow) {
                var sum = 0;

                $scope.packageinvoice();

                for (var i = 0; i < $scope.taxes.length; i++) {
                    if (packagerow == $scope.taxes[i]["Product_Name"] && $scope.taxes[i]["Product_Type"] == "Package Level Tax" && packagerow != null) {
                        sum += parseInt($scope.taxes[i]["Percentage"]);
                    }
                }
                return sum
            }


            $scope.getpackageleveltaxtotalinrupees = function ()
            {
                var packagestotaldiscount = 0;
                for (var i = 0; i < $scope.packagerow.length; i++)
                {
                    var eachpackageprice = 0;
                    for (var j = 0; j < $scope.packagewithservice.length; j++)
                    {

                        if ($scope.packagerow[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"])
                        {
                            if ($scope.packagewithservice[j]["DiscountType"] == "Percentage") {
                                packagestotaldiscount += parseInt($scope.packagewithservice[j]["ServicePrice"] * $scope.packagewithservice[j]["ServiceDiscount"] / 100);
                            }
                            else if ($scope.packagewithservice[j]["DiscountType"] == "Rupees") {
                                packagestotaldiscount += parseInt($scope.packagewithservice[j]["ServiceDiscount"]);
                            }
                        }


                        if ($scope.packagerow[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"]) {
                            eachpackageprice += parseInt($scope.packagewithservice[j]["ServicePrice"]);
                        }

                        var eachpackagetotaltax = 0;
                        for (var k = 0; k < $scope.taxes.length; k++) {
                            if ($scope.packagerow[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"]) {
                                eachpackageprice += parseInt($scope.packagewithservice[j]["ServicePrice"]);

                                if ($scope.taxes[k]["Product_Name"] == $scope.packagewithservice[j]["PackageName"] && $scope.taxes[k]["Product_Name"] == $scope.packagerow[i]["Packagename"] && $scope.taxes[k]["Product_Type"] == "Package Level Tax" && $scope.taxes[k]["Percentage"] != null && $scope.taxes[k]["Percentage"] != 'undefined') {
                                    eachpackagetotaltax += parseInt($scope.taxes[k]["Percentage"]);
                                }
                            }
                        }

                        if (eachpackagetotaltax > 0) {
                            console.log(eachpackageprice);
                            console.log("Package name :" + $scope.packagewithservice[j]["PackageName"] + "  each package total :" + eachpackagetotaltax);
                        }
                    }
                }
                console.log("Total Discount On Package :" + packagestotaldiscount);
            }



            $scope.packageinvoice = function ()
            {
                $scope.discountamount = 0;
                for (var i = 0; i < $scope.packagerow.length; i++) {
                    for (var j = 0; j < $scope.packagewithservice.length; j++)
                    {

                        if ($scope.packagerow[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"]) {
                            if ($scope.packagewithservice[j]["DiscountType"] == "Rupees") {
                                $scope.discountamount += $scope.packagewithservice[j]["ServicePrice"] - $scope.packagewithservice[j]["ServiceDiscount"];
                            }
                            else if ($scope.packagewithservice[j]["DiscountType"] == "Percentage") {
                                $scope.discountamount += $scope.packagewithservice[j]["ServicePrice"] - ($scope.packagewithservice[j]["ServiceDiscount"] * $scope.packagewithservice[j]["ServicePrice"] / 100);
                            }
                        }
                    }
                }
            }



            //$scope.getpackagleveltaxamount = function()
            //{
            //    var packageleveltax = 0;
            //    $scope.myservices = "";
            //    $scope.totalpackageprice = 0;
            //    $scope.totalpackagediscount = 0;
            //    $scope.totaltaxapplied = 0;
            //    $scope.packageleveltaxtotal = 0;
            //    $scope.gettotalpackagestaxinrupees =0;

            //    for (var i = 0; i < $scope.packagerow.length; i++)
            //    {
            //        for (var j = 0; j < $scope.packagewithservice.length; j++)
            //        {
            //            if ($scope.packagerow[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"])
            //            {
            //                if ($scope.packagewithservice[j]["DiscountType"] == "Rupees") {
            //                    var discountamount = $scope.packagewithservice[j]["ServicePrice"] - $scope.packagewithservice[j]["ServiceDiscount"];
            //                }
            //                else if ($scope.packagewithservice[j]["DiscountType"] == "Percentage") {
            //                    var discountamount = $scope.packagewithservice[j]["ServicePrice"] - ($scope.packagewithservice[j]["ServiceDiscount"] * $scope.packagewithservice[j]["ServicePrice"] / 100);
            //                }

            //                $scope.totalpackageprice += parseInt($scope.packagewithservice[j]["ServicePrice"]);
            //                $scope.totalpackagediscount += (parseInt($scope.packagewithservice[j]["ServicePrice"]) - discountamount);
            //                $scope.totaltaxapplied += discountamount * $scope.packagewithservice[j]["TotalTax"] / 100;
            //                discountamount = null;
            //            }
            //        }

            //        for (var k = 0; k < $scope.taxes.length; k++)
            //        {
            //            if ($scope.packagerow[i]["Packagename"] == $scope.taxes[k]["Product_Name"] && $scope.taxes[k]["Product_Type"] == "Package Level Tax" && $scope.packagerow[i]["Packagename"] != null)
            //            {
            //                $scope.packageleveltaxtotal += parseInt($scope.taxes[k]["Percentage"]);
            //            }
            //        }

            //        $scope.gettotalpackagestaxinrupees += ($scope.packageleveltaxtotal * (parseInt($scope.totalpackageprice) - parseInt($scope.totalpackagediscount)) / 100);
            //        $scope.packagesleveltaxtotal += ($scope.packageleveltaxtotal * (parseInt($scope.totalpackageprice) - parseInt($scope.totalpackagediscount)) / 100);
            //        $scope.myservices = "";
            //        $scope.totalpackagediscount = null;
            //        $scope.totalpackageprice = null;
            //        $scope.totaltaxapplied = null;
            //        $scope.packageleveltaxtotal = null;
            //    }
            //    return parseInt($scope.gettotalpackagestaxinrupees);
            //}

            $('#lnkPrint').click(function () {
                window.print();
            });

            $('#lnkPrint').click(function () {
                window.print();
            });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
       
       
            $scope.getStartDate = function ()
            {
                $scope.$apply(function () {
                    var d = new Date();
                    d.setDate(d.getDate());
                    var day = d.getDate();
                    if (day < 9) {
                        day = "0" + day
                    }
                    var year = d.getFullYear();
                    var month = new Array();
                    month[0] = "01";
                    month[1] = "02";
                    month[2] = "03";
                    month[3] = "04";
                    month[4] = "05";
                    month[5] = "06";
                    month[6] = "07";
                    month[7] = "08";
                    month[8] = "09";
                    month[9] = "10";
                    month[10] = "11";
                    month[11] = "12";
                    var month = month[d.getMonth()];
                    $scope.startingdate = year + "-" + month + "-" + day;
                    return $scope.startingdate;
                });
          }

            $scope.getExpirydate = function (sdate, vdate) {

                $scope.packageenddate = vdate;
                $scope.packagevalidityindays = sdate

                if ($scope.packagevalidityindays == undefined) {
                    var d = new Date();
                    d.setDate(d.getDate());
                    var day = d.getDate();
                    var year = d.getFullYear();
                    var month = new Array();
                    month[0] = "01";
                    month[1] = "02";
                    month[2] = "03";
                    month[3] = "04";
                    month[4] = "05";
                    month[5] = "06";
                    month[6] = "07";
                    month[7] = "08";
                    month[8] = "09";
                    month[9] = "10";
                    month[10] = "11";
                    month[11] = "12";
                    var month = month[d.getMonth()];
                    $scope.packagevalidityindays = year + "-" + month + "-" + day;
                }

                var ddd = isNaN($scope.packageenddate)
                if (ddd == true) {
                    $scope.packageenddate = 0;
                }
                if ($scope.packageenddate == null) {
                    $scope.packageenddate = 0;
                }

                var d = new Date($scope.packagevalidityindays);

                d.setDate(d.getDate() + parseInt($scope.packageenddate));

                var day = d.getDate();
                var year = d.getFullYear();
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
                //var d = new Date();

                var n = month[d.getMonth()];
                $scope.expirydate = year+"-"+ n + "-" + day;

                
                console.log("Start Date :- " + $scope.packagevalidityindays);
                console.log("Validity In Days :- " + $scope.packageenddate);
                console.log("Expiry Date :- " + $scope.expirydate);

                return $scope.expirydate;

            }

            $scope.getvaliditydays = function ()
            {
                for (var i = 0; i < $scope.packagevalidity.length; i++) {
                    for (var val = 0; val < $scope.packagevalidity.length; val++) {
                        if ($scope.packagerow[i]["Packagename"] == $scope.packagevalidity[val]["Packagename"] && $scope.packagerow[i]["Packagename"] != null) {
                            $scope.packagestartdate = $scope.packagevalidity[val]["StartDate"];
                            $scope.packageEndDate = $scope.packagevalidity[val]["EndDate"];
                            $scope.packageValidityDays = $scope.packagevalidity[val]["ValidityDays"];

                            return $scope.packagevalidity[val]["ValidityDays"];
                        }
                    }
                }
            }

            $scope.packagesNames = [{}];


            $http.get("http://gym.excellencea.com/api/member")
            .then(function (response) {
                $scope.GMSMember = response.data;
            });


            $http.get("http://gym.excellencea.com/api/invoicepackage")
            .then(function (response) {
                $scope.GMSinvoicepackage = response.data;
            });

            $http.get("http://gym.excellencea.com/api/invoiceservice")
            .then(function (response) {
                $scope.GMSinvoiceServices = response.data;
            });






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
            }



            $scope.Selectmember = function (MemberId, ID, GYMID, BranchID, InquiryID, AdmissionDate, EnquiryDate, Fname, Mname, Lname, BirthDate, Email, Mobile, Gender, MarritalStatus)
            {
                //  alert(MemberId);
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

                $scope.SelectedpackageNames = [];
                $scope.packagesArrayList = [];
                $scope.NotSelectedpackageNames = [];
                $scope.CurrentSelectedpackageNames = [];
                $scope.finalpackagesArray = [];
                $scope.finalpackagesArray2 = [];
                $scope.finalpackagesArray1 = [];
               
                $scope.packagesListselectedmembernothaving = [];
                for (var i = 0; i < $scope.packagewithservice.length; i++)
                {
                    for (var val = 0; val < $scope.GMSinvoicepackage.length; val++)
                    {
                        if ($scope.GMSinvoicepackage[val]["MemberID"] != null)
                        {
                            if ($scope.GMSinvoicepackage[val]["MemberID"].toString().trim() == MemberId.toString().trim())
                            {
                                $scope.packagesArrayList.push({ Packagename: $scope.GMSinvoicepackage[val]["Packagename"].toString().trim() })
                            }
                        }
                   }
                }

                var unique = {};
                var distinct = [];
                for (var i in $scope.packagesArrayList)
                {
                    if (typeof (unique[$scope.packagesArrayList[i].Packagename]) == "undefined") {
                        $scope.SelectedpackageNames.push($scope.packagesArrayList[i].Packagename)
                        distinct.push($scope.packagesArrayList[i].Packagename);
                    }
                    unique[$scope.packagesArrayList[i].Packagename] = 0;
                }
                console.log("SelectedpackageNames :- " + JSON.stringify($scope.SelectedpackageNames))
                var unique = null;
                var distinct = null;



                var unique = {};
                var distinct = [];
                for (var i in $scope.packagewithservice) {
                    if (typeof (unique[$scope.packagewithservice[i].PackageName]) == "undefined") {
                        $scope.NotSelectedpackageNames.push($scope.packagewithservice[i].PackageName)
                        distinct.push($scope.packagewithservice[i].PackageName);
                    }
                    unique[$scope.packagewithservice[i].PackageName] = 0;
                }
                var unique = null;
                var distinct = null;


                console.log("NotSelectedpackageNames :- " + JSON.stringify($scope.NotSelectedpackageNames))

                $scope.finalpackagesArray = $($scope.NotSelectedpackageNames).not($scope.SelectedpackageNames).get();

                console.log("finalpackagesArray :- "+ $scope.finalpackagesArray);



                $.each($scope.packagerow, function (index, value)
                {
                    if ($.inArray(value.Packagename, $scope.CurrentSelectedpackageNames) == -1)
                    {
                        if (value.MemberID != null)
                        {
                            $scope.CurrentSelectedpackageNames.push(value.Packagename);
                        }
                    }
                });

                console.log("CurrentSelectedpackageNames :-" + $scope.CurrentSelectedpackageNames);


                $scope.finalpackagesArray2 = $($scope.finalpackagesArray).not($scope.CurrentSelectedpackageNames).get();

                console.log("6th")
                for (var i = 0; i < $scope.finalpackagesArray.length; i++)
                {
                    $scope.finalpackagesArray1.push({
                        ID:i,
                        PackageName: $scope.finalpackagesArray[i],
                    })
                }

                console.log("7th")
                $scope.finalpackagesArray3 = [];
                for (var i = 0; i < $scope.finalpackagesArray2.length; i++) {
                    $scope.finalpackagesArray3.push({
                        ID: i,
                        PackageName: $scope.finalpackagesArray[i],
                    })
                }

        }
        };
       $scope.init();

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////                                Submit Add On Package Details                                    //////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


       $scope.submitAddonPackageForm = function () {
               $scope.myinvoice = [];
               $scope.myservices = "";
               $scope.totalpackageprice = 0;
               $scope.totalpackagediscount = 0;
               $scope.totaltaxapplied = 0;
               $scope.packageleveltaxtotal = 0;
               $scope.v1 = $scope.Fname;
               $scope.v2 = $scope.Mname;
               $scope.v3 = $scope.Lname;
               $scope.smobilenumber = $scope.Mobilenumber;
               $scope.bd = $scope.BirthDate;
               $scope.sex = $scope.Gender;

               $scope.myPackages1 = [];

               for (var i = 0; i < $scope.fianlPackagesArray.length; i++) {
                   $scope.packagetaxes = []
                   for (var tx = 0; tx < $scope.taxes.length; tx++) {
                       if ($scope.taxes[tx]["Product_Name"] == $scope.fianlPackagesArray[i]["Packagename"] && $scope.taxes[tx]["Product_Type"] == "Package Level Tax" && $scope.fianlPackagesArray[i]["Packagename"] != null) {
                           {
                               $scope.packagetaxes.push({
                                   InvoiceID: $scope.InvoiceNumberinInvoice,
                                   MemberID: $scope.newMemberid,
                                   TransactionID: $scope.UNIQUETRANSACTIONID,
                                   PackageOrServiceName: $scope.taxes[tx]["Product_Name"],
                                   TaxName: $scope.taxes[tx]["TaxName"],
                                   Taxpercentage: $scope.taxes[tx]["Percentage"],
                                   Taxlevel: $scope.taxes[tx]["Product_Type"],
                               })

                               $.ajax({
                                   async: true,
                                   crossDomain: true,
                                   url: "http://gym.excellencea.com/api/InvoiceTax",
                                   method: "POST",
                                   data:
                                   {
                                       "InvoiceID": $scope.InvoiceNumberinInvoice,
                                       "MemberID": $scope.newMemberid,
                                       "TransactionID": $scope.UNIQUETRANSACTIONID,
                                       "PackageOrServiceName": $scope.taxes[tx]["Product_Name"],
                                       "TaxName": $scope.taxes[tx]["TaxName"],
                                       "Taxpercentage": $scope.taxes[tx]["Percentage"],
                                       "Taxlevel": $scope.taxes[tx]["Product_Type"],
                                   },
                                   success: function () {
                                       // alert("Invoice Generated Sucessufully")
                                   },
                                   error: function (req, status, errorObj) {
                                       alert("Package TAX Not Added : " + errorObj.toString());
                                   }
                               });
                           }
                       }
                   }

                   $scope.servicestaxes = [];
                   //   $scope.loop = 0
                   for (var ty = 0; ty < $scope.taxes.length; ty++) {
                       for (var bb = 0; bb < $scope.packagewithservice.length; bb++) {
                           if ($scope.packagewithservice[bb]["PackageName"] == $scope.fianlPackagesArray[i]["Packagename"] && $scope.taxes[ty]["Product_Type"] == "Service level Tax" && $scope.packagewithservice[bb]["IncludeServiceName"] == $scope.taxes[ty]["Product_Name"] && $scope.loop == 0) {
                               $scope.servicestaxes.push({
                                   PackageName: $scope.packagewithservice[bb]["PackageName"],
                                   GYM_ID: $scope.taxes[ty]["GYM_ID"],
                                   Branch_ID: $scope.taxes[ty]["Branch_ID"],
                                   Product_Name: $scope.taxes[ty]["Product_Name"],
                                   TaxName: $scope.taxes[ty]["TaxName"],
                                   Product_Type: $scope.taxes[ty]["Product_Type"],
                               })
                               $.ajax({
                                   async: true,
                                   crossDomain: true,
                                   url: "http://gym.excellencea.com/api/InvoiceTax",
                                   method: "POST",
                                   data:
                                   {
                                       "InvoiceID": $scope.InvoiceNumberinInvoice,
                                       "MemberID": $scope.newMemberid,
                                       "TransactionID": $scope.UNIQUETRANSACTIONID,
                                       "PackageOrServiceName": $scope.packagewithservice[bb]["PackageName"] + "(" + $scope.taxes[ty]["Product_Name"] + ")",
                                       "TaxName": $scope.taxes[ty]["TaxName"],
                                       "Taxpercentage": $scope.taxes[ty]["Percentage"],
                                       "Taxlevel": $scope.taxes[ty]["Product_Type"],
                                   },
                                   success: function () {
                                   },
                                   error: function (req, status, errorObj) {
                                       alert("Service Tax Not Added : " + errorObj.toString());
                                   }
                               });

                           }
                       }
                   }

                   $scope.myservices1 = [];
                   for (var j = 0; j < $scope.packagewithservice.length; j++) {
                       if ($scope.fianlPackagesArray[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"]) {
                           if ($scope.packagewithservice[j]["DiscountType"] == "Rupees") {
                               var discountamount = $scope.packagewithservice[j]["ServicePrice"] - $scope.packagewithservice[j]["ServiceDiscount"];
                           }
                           else if ($scope.packagewithservice[j]["DiscountType"] == "Percentage") {
                               var discountamount = $scope.packagewithservice[j]["ServicePrice"] - ($scope.packagewithservice[j]["ServiceDiscount"] * $scope.packagewithservice[j]["ServicePrice"] / 100);
                           }


                           $scope.myservices1.push({
                               TransactionID: $scope.UNIQUETRANSACTIONID,////////////////////////////////////
                               packageName: $scope.packagewithservice[j]["PackageName"],
                               ServiceName: $scope.packagewithservice[j]["IncludeServiceName"],
                               Price: $scope.packagewithservice[j]["ServicePrice"],
                               Discount: $scope.packagewithservice[j]["ServiceDiscount"],
                               DiscountType: $scope.packagewithservice[j]["DiscountType"],
                               TotalTax: $scope.packagewithservice[j]["TotalTax"],
                               IncludedServicesTax: $scope.servicestaxes,
                               DiscountRupees: (parseInt($scope.packagewithservice[j]["ServicePrice"]) - discountamount),
                               PriceAfterDiscount: discountamount,
                               TotalTaxOnservice: (discountamount * $scope.packagewithservice[j]["TotalTax"] / 100),
                           });


                           //  insert in Service
                           $.ajax({
                               async: true,
                               crossDomain: true,
                               url: "http://gym.excellencea.com/api/invoiceService",
                               method: "POST",
                               data:
                               {
                                   "MemberID": $scope.newMemberid,
                                   "InvoiceID": $scope.InvoiceNumberinInvoice,
                                   "TransactionID": $scope.UNIQUETRANSACTIONID,
                                   "packageName": $scope.packagewithservice[j]["PackageName"],
                                   "Service": $scope.packagewithservice[j]["IncludeServiceName"],
                                   "Price": $scope.packagewithservice[j]["ServicePrice"],
                                   "DiscountInAmount": (discountamount - parseInt($scope.packagewithservice[j]["ServicePrice"])),
                                   "DiscountType": $scope.packagewithservice[j]["DiscountType"],
                                   "TotalTax": $scope.packagewithservice[j]["TotalTax"],
                                   "IncludedServicesTax": $scope.servicestaxes,
                                   "DiscountRupees": (parseInt($scope.packagewithservice[j]["ServicePrice"]) - discountamount),
                                   "PriceAfterDiscount": discountamount,
                                   "TotalTaxInAmount": Math.round(discountamount * $scope.packagewithservice[j]["TotalTax"] / 100),
                               },
                               success: function () {
                                   // alert("Invoice Generated Sucessufully")
                               },
                               error: function (req, status, errorObj) {
                                   alert("Service Not Added : " + errorObj.toString());
                               }
                           });

                           $scope.totalpackageprice += parseInt($scope.packagewithservice[j]["ServicePrice"]);
                           $scope.totalpackagediscount += (parseInt($scope.packagewithservice[j]["ServicePrice"]) - discountamount);
                           $scope.totaltaxapplied += discountamount * $scope.packagewithservice[j]["TotalTax"] / 100;
                           discountamount = null;
                       }
                   }

                   for (var val = 0; val < $scope.packagevalidity.length; val++) {
                       if ($scope.fianlPackagesArray[i]["Packagename"] == $scope.packagevalidity[val]["Packagename"] && $scope.fianlPackagesArray[i]["Packagename"] != null) {
                           $scope.packagestartdate = $scope.packagevalidity[val]["StartDate"];
                           $scope.packageEndDate = $scope.packagevalidity[val]["EndDate"];
                           $scope.packageValidityDays = $scope.packagevalidity[val]["ValidityDays"];
                       }
                   }

                   $scope.myPackages1.push({
                       packageID: i,
                       Packagename: $scope.fianlPackagesArray[i]["Packagename"],
                       PackagePrice: $scope.totalpackageprice,
                       StartDate: $scope.fianlPackagesArray[i]["StartDate"],
                       EndDate: $scope.fianlPackagesArray[i]["ValidityInDays"],
                       Validfordays: $scope.fianlPackagesArray[i]["EndDate"],
                       TotalDiscount: $scope.totalpackagediscount.toString(),
                       PriceAfterDiscount: (parseInt($scope.totalpackageprice) - parseInt($scope.totalpackagediscount)),
                       IncludedPackagesTax: $scope.packagetaxes,
                       PackageTotalTax: $scope.totaltaxapplied,
                       PackageTotalafterserviceLevelDiscountAndTaxes: ((parseInt($scope.totalpackageprice) - $scope.totalpackagediscount) + $scope.totaltaxapplied),
                       IncludedServices: $scope.myservices1,
                       PackageLevelTaxTotalInpercentage: $scope.packageleveltaxtotal,
                       PackageLevelTaxTotalInRupees: ($scope.packageleveltaxtotal * (parseInt($scope.totalpackageprice) - parseInt($scope.totalpackagediscount)) / 100),
                       PackageGrossPrice: (($scope.packageleveltaxtotal * (parseInt($scope.totalpackageprice) - parseInt($scope.totalpackagediscount)) / 100) + ($scope.totaltaxapplied) + (parseInt($scope.totalpackageprice) - parseInt($scope.totalpackagediscount))),
                   });

                   $.ajax({
                       async: true,
                       crossDomain: true,
                       url: "http://gym.excellencea.com/api/invoicePackage",
                       method: "POST",
                       data: {
                           "Packagename": $scope.fianlPackagesArray[i]["Packagename"],
                           "InvoiceID": $scope.InvoiceNumberinInvoice,
                           "TransactionID": $scope.UNIQUETRANSACTIONID,
                           "MemberID": $scope.newMemberid,
                           "PackagePrice": $scope.totalpackageprice,
                           "DiscountInAmount": $scope.totalpackagediscount,
                           "TotalAmount": (($scope.packageleveltaxtotal * (parseInt($scope.totalpackageprice) - parseInt($scope.totalpackagediscount)) / 100) + ($scope.totaltaxapplied) + (parseInt($scope.totalpackageprice) - parseInt($scope.totalpackagediscount))),
                           "StartDate": $scope.fianlPackagesArray[i]["StartDate"],
                           "ValidityInDays": $scope.fianlPackagesArray[i]["ValidityDays"],
                           "EndDate": $scope.fianlPackagesArray[i]["EndDate"],
                           "TotalTaxInPercentage": $scope.packageleveltaxtotal,
                           "TotalTaxInAmount": ($scope.packageleveltaxtotal * (parseInt($scope.totalpackageprice) - parseInt($scope.totalpackagediscount)) / 100),
                           //"IncludedServiceLevelTaxPercentage":
                           //"C1": (getpackageLevelTaxTotal($scope.packagerow[i]["Packagename"]) * (getpackageDetails($scope.packagerow[i]["Packagename"]) - (GetPackageTotaldiscount($scope.packagerow[i]["Packagename"]))) / 100),
                           "IncludedServiceLevelTaxAmount": $scope.getpackagestotaltax($scope.fianlPackagesArray[i]["Packagename"]),
                       },
                       success: function (data) {
                           // alert("Your Service "+ $scope.packagerow[i]["Packagename"]+ " Is Stored Into Draft");
                       },
                       error: function (req, status, errorObj) {
                           alert("invoice Package Not Added " + errorObj.toString());
                       }
                   });
                   $scope.BalancePayment=(document.getElementById("BillingAmount").value-$scope.payingAmount)
                   $scope.billamount = document.getElementById("BillingAmount").value;
                   $scope.balanceamount = $scope.BalancePayment;
                   $scope.payAmount = $scope.payingAmount;

                      // document.getElementById("payingAmount").value;

                   if ($scope.newinvoiceid == 0) {
                       //  alert($scope.newinvoiceid.length);
                   }
                   else {
                       if ($scope.goforinvoice == 0) {

                           $scope.myinvoice.push({
                               InvoiceID: $scope.newinvoiceid,
                               TransactionID: $scope.UNIQUETRANSACTIONID,
                               MemberID: $scope.newMemberid,
                               FName: $scope.Fname,
                               Mname: $scope.Mname,
                               Lname: $scope.Lname,
                               InvoiceDate: $scope.day1,
                               InvoiceType: "New_Invoice",
                               InvoiceTime: $scope.str,
                               MobileNumber: $scope.smobilenumber,
                               PackagePrice: $scope.totalpackageprice,
                               DiscountInAmount: $scope.totalpackagediscount,
                               TotalTaxInAmount: $scope.totaltaxapplied,
                               TotalTaxInPercentage: $scope.packageleveltaxtotal,
                               TotalAmount: (($scope.packageleveltaxtotal * (parseInt($scope.totalpackageprice) - parseInt($scope.totalpackagediscount)) / 100) + ($scope.totaltaxapplied) + (parseInt($scope.totalpackageprice) - parseInt($scope.totalpackagediscount))),
                               BillingAmount: $scope.billamount,
                               PaidAmount: $scope.payingAmount,
                               BalanceAmount: $scope.balanceamount,
                               ModeOfPayment: $scope.paymentMethod,
                               IncludedPackages: JSON.stringify($scope.myPackages1),
                           })


                           //   alert("Billing Amount :" + document.getElementById("BillingAmount").value.toString());


                           //  insert in Transactions
                           $.ajax({
                               async: true,
                               crossDomain: true,
                               url: "http://gym.excellencea.com/api/Invoice",
                               method: "POST",
                               data:
                               {
                                   "InvoiceID": $scope.InvoiceNumberinInvoice,
                                   "MemberID": $scope.newMemberid,
                                   //   "InvoiceID": $scope.newinvoiceid,
                                   "TransactionID": $scope.UNIQUETRANSACTIONID,
                                   "FName": $scope.Fname,
                                   "Mname": $scope.Mname,
                                   "Lname": $scope.Lname,
                                   "Remark": $scope.remarks,
                                   "InvoiceDate": $scope.day1,
                                   "InvoiceType": "New_Invoice",
                                   "InvoiceTime": $scope.str,
                                   "MobileNumber": $scope.MobileNumber,
                                   "PackagePrice": $scope.totalpackageprice,
                                   "DiscountInAmount": $scope.totalpackagediscount,
                                   "TotalTaxInAmount": $scope.totaltaxapplied,
                                   "TotalTaxInPercentage": $scope.packageleveltaxtotal,
                                   "TotalAmount": (($scope.packageleveltaxtotal * (parseInt($scope.totalpackageprice) - parseInt($scope.totalpackagediscount)) / 100) + ($scope.totaltaxapplied) + (parseInt($scope.totalpackageprice) - parseInt($scope.totalpackagediscount))),
                                   "BillingAmount": document.getElementById("BillingAmount").value.toString(),
                                   "PaidAmount": $scope.payAmount,
                                   "BalanceAmount": document.getElementById("BalancePayment").value.toString(),
                                   "ModeOfPayment": $scope.paymentMethod,
                                   "IncludedPackages": JSON.stringify($scope.myPackages1),
                                   "IncludedPackagesTax": JSON.stringify($scope.packagetaxes).toString().replace(/\\/g, ""),
                               },
                               success: function () {
                                   //alert("Transaction Generated Sucessufully")
                                   //location.reload();
                                   if (!alert('Transaction Generated Sucessufully..!')) { }// window.location.reload(); }

                               },
                               error: function (req, status, errorObj) {

                                   alert("Invoice Not Added : " + errorObj.toString());
                               }
                           });

                           $scope.goforinvoice = 1;
                       }
                   }
                   $scope.packagesleveltaxtotal += ($scope.packageleveltaxtotal * (parseInt($scope.totalpackageprice) - parseInt($scope.totalpackagediscount)) / 100);
                   $scope.myservices = "";
                   $scope.totalpackagediscount = null;
                   $scope.totalpackageprice = null;
                   $scope.totaltaxapplied = null;
                   $scope.packageleveltaxtotal = null;

               }// Last For Loop


               $scope.servicestaxes1 = [];
               for (var i = 0; i < $scope.fianlPackagesArray.length; i++) {
                   for (var ty = 0; ty < $scope.taxes.length; ty++) {
                       for (var bb = 0; bb < $scope.packagewithservice.length; bb++) {
                           if ($scope.packagewithservice[bb]["PackageName"] == $scope.fianlPackagesArray[i]["Packagename"] && $scope.taxes[ty]["Product_Type"] == "Service level Tax" && $scope.packagewithservice[bb]["IncludeServiceName"] == $scope.taxes[ty]["Product_Name"]) {
                               if ($scope.servicestaxes1.indexOf($scope.packagewithservice[i].Product_Name) === -1) {
                                   $scope.servicestaxes1.push({
                                       PackageName: $scope.packagewithservice[bb]["PackageName"],
                                       GYM_ID: $scope.taxes[ty]["GYM_ID"],
                                       Branch_ID: $scope.taxes[ty]["Branch_ID"],
                                       Product_Name: $scope.taxes[ty]["Product_Name"],
                                       TaxName: $scope.taxes[ty]["TaxName"],
                                       Product_Type: $scope.taxes[ty]["Product_Type"],
                                   })

                                   $.ajax({
                                       async: true,
                                       crossDomain: true,
                                       url: "http://gym.excellencea.com/api/InvoiceTax",
                                       method: "POST",
                                       data:
                                       {
                                           "InvoiceID": $scope.InvoiceNumberinInvoice,
                                           "MemberID": $scope.newMemberid,
                                           "TransactionID": $scope.UNIQUETRANSACTIONID,
                                           "PackageOrServiceName": $scope.packagewithservice[bb]["PackageName"] + "(" + $scope.taxes[ty]["Product_Name"] + ")",
                                           "TaxName": $scope.taxes[ty]["TaxName"],
                                           "Taxpercentage": $scope.taxes[ty]["Percentage"],
                                           "Taxlevel": $scope.taxes[ty]["Product_Type"],
                                       },
                                       success: function () {
                                           // alert("Invoice Generated Sucessufully")
                                       },
                                       error: function (req, status, errorObj) {
                                           alert("Service Tax Not Added : " + errorObj.toString());
                                       }
                                   });
                               }

                           }
                       }
                   }
               }





               //  insert in Invoice
               $.ajax({
                   async: true,
                   crossDomain: true,
                   url: "http://gym.excellencea.com/api/invoiceTransaction",
                   method: "POST",
                   data:
                   {
                       "InvoiceID": $scope.InvoiceNumberinInvoice,
                       "MemberID": $scope.newMemberid,
                       "TransactionID": $scope.UNIQUETRANSACTIONID,
                       "GYMID": $scope.SubmitGymID,
                       "BranchID": $scope.SubmitBranchID,
                       "Date": $scope.day1,
                       "BillingAmount": $scope.billamount,
                       "Paid": $scope.payAmount,
                       "Balance": $scope.balanceamount,
                   },
                   success: function () {

                   },
                   error: function (req, status, errorObj) {
                       alert("invoice Transaction Not Added : " + errorObj.toString());
                   }
               });

       }

       $scope.BalancePayment = null;
       $scope.getBalancePatment = function(payingAmount)
       {
          // alert(document.getElementById("BillingAmount").value +"="+ payingAmount)
           $scope.BalancePayment=(document.getElementById("BillingAmount").value-payingAmount)
       }
});



