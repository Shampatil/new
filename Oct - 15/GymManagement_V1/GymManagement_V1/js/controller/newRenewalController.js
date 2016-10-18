'use strict';

gymManagementApp.controller('newRenewalController', function ($scope, $uibModal, $log, $state, $http, $rootScope, $location, Idle, $route, exDialog, commonService, $localStorage, userSessionService) {

    $scope.init = function () {
         Idle.watch();

         $scope.isDisabled = false;
         $scope.authorisedby = "sham";
         $scope.GMSPackages = [];
         $scope.startsubmitting = 0;
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
         $scope.packagevalideDays = 0;

         $scope.invoiceDate = $scope.startingdate1;
         //var ddddd = "GYM" + (Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000).toString().s;
         //alert(ddddd);
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
         $scope.fianlPackagesArray = '';



         $scope.pkgName = '';
         $scope.pkgdays = '';
       
         $scope.StartDate = "0"

         $scope.SubmitGymID = "GMS-001"
         $scope.SubmitBranchID = "GMS-001-PF"
         $scope.GMSinvoicePackage = '';




         $http({ method: "GET", url: "http://gym.excellencea.com/api/invoicePackage" })
            .success(function (result)
             {
                $scope.GMSinvoicePackage = result;
                $http({ method: "GET", url: "http://gym.excellencea.com/api/Package" })
                    .success(function (result)
                    {
                        $scope.GMSPackages = result;
                        $scope.GMSpackages1 = [];
                        for (var i = 0; i < $scope.GMSPackages.length; i++) {
                            if ($scope.GMSPackages[i]["AprovalStatus"] == "Aproved") {
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
                                    StartDate: $scope.GMSPackages[i]["StartDate"],
                                    EndDate: $scope.GMSPackages[i]["EndDate"],
                                })
                            }
                        }
                    })
            .error(function (result) {
                if (!alert('Packages Detail Loading Failed..!')) {
                    window.location.reload();
                }
            });
           });

         $http({ method: "GET", url: "http://gym.excellencea.com/api/member" }).success(function (result) {
             $scope.GMSMember = result;
         });


         $scope.GMSNewPackages = [];
         $scope.Selectmember = function (MemberId, ID, GYMID, BranchID, InquiryID, AdmissionDate, EnquiryDate, Fname, Mname, Lname, BirthDate, Email, Mobile, Gender, MarritalStatus)
         {
             $scope.GMSNewPackages = [];
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


             for (var i = 0; i < $scope.GMSpackages1.length; i++)
             {
                 for (var j = 0; j < $scope.GMSinvoicePackage.length; j++)
                 {
                     if ($scope.GMSPackages[i]["AprovalStatus"] == "Aproved" && $scope.GMSPackages[i]["Packagename"] == $scope.GMSinvoicePackage[j]["Packagename"] && $scope.MemberId == $scope.GMSinvoicePackage[j]["MemberID"])
                     {
                         $scope.packagevalideDays = parseInt($scope.GMSPackages[i]["ValidityDays"]);
                         $scope.GMSNewPackages.push({
                             Packagename: $scope.GMSPackages[i]["Packagename"],
                             PackageMRP: $scope.GMSPackages[i]["PackageMRP"],
                             AprovalStatus: $scope.GMSPackages[i]["AprovalStatus"],
                             PhotoURL: $scope.GMSPackages[i]["PhotoURL"],
                             TotalTaxInPercentage: $scope.GMSPackages[i]["TotalTaxInPercentage"],
                             ValidityDays: parseInt($scope.GMSPackages[i]["ValidityDays"]),
                             IncludedServiceLevelTaxAmount: $scope.GMSPackages[i]["IncludedServiceLevelTaxAmount"],
                             IncludedServiceLevelTaxPercentage: $scope.GMSPackages[i]["IncludedServiceLevelTaxPercentage"],
                             TotalTaxInAmount: $scope.GMSPackages[i]["TotalTaxInAmount"],
                             StartDate: $scope.GMSinvoicePackage[j]["StartDate"],
                             EndDate: $scope.GMSinvoicePackage[j]["EndDate"],
                             packageValidityDays: parseInt($scope.GMSinvoicePackage[j]["ValidityDays"]),
                         })
                     }
                 }
             }

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
                                     EndDate: $scope.GetpackageExpiryDate($scope.packagerow[key][key2]["StartDate"], (parseInt($scope.packagerow[key][key2]["ValidityDays"]))),
                                     AddonValidityDays: $scope.packagerow[key][key2]["ValidityDays"],
                                 });
                             }
                         }
                     }
                 }
             }
         }



         $scope.getStartDate = function () {
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
         }

         $scope.getExpirydate = function (sdate, vdate) {

             //  alert(vdate + "\n" + sdate)

             $scope.validforDays = vdate;
             $scope.packagevalidityindays = sdate;

             if ($scope.packagevalidityindays == undefined) {
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
                 $scope.packagevalidityindays = year + "-" + month + "-" + day;
             }


             var ddd = isNaN($scope.validforDays)
             if (ddd == true) {
                 $scope.validforDays = 0;
             }
             if ($scope.validforDays == null) {
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


         //$scope.getvaliditydays = function () {
         //    for (var i = 0; i < $scope.packagevalidity.length; i++) {
         //        for (var val = 0; val < $scope.packagevalidity.length; val++) {
         //            if ($scope.fianlPackagesArray[i]["Packagename"] == $scope.packagevalidity[val]["Packagename"] && $scope.fianlPackagesArray[i]["Packagename"] != null) {
         //                $scope.packagestartdate = $scope.packagevalidity[val]["StartDate"];
         //                $scope.packageEndDate = $scope.packagevalidity[val]["EndDate"];
         //                $scope.packageValidityDays = $scope.packagevalidity[val]["ValidityDays"];

         //                return $scope.packagevalidity[val]["ValidityDays"];
         //            }
         //        }
         //    }
         //}



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


        // console.log(JSON.stringify($scope.fianlPackagesArray));




        //$http.get("http://gym.excellencea.com/api/member")
        //  .then(function (response) {
        //      $scope.MemberId = "PL001MEM-" + (parseInt(response.data.length) + 100001).toString().substr(1, 5);
        //  });

        //$http({ method: "GET", url: "http://gym.excellencea.com/api/member" })
        //.success(function (result) {
        //    $scope.MemberId = "PL001MEM-" + (parseInt(result.length) + 100001).toString().substr(1, 5);
        //})
        //.error(function (result) {
        //    if (!alert('Failed to load Data..!')) {
        //        window.location.reload();
        //    }
        //});


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

         $location.path('/dashboard/newRenewal');
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




            $("#paymentMethod").change(function () {
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


            var revenues = [
                { Packagena: '1s',Includeser:'1s',serviceprice:'1s' }
            ];

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


            $http({ method: "GET", url: "http://gym.excellencea.com/api/enquiry" })
                .success(function (result) {
                    $scope.Enqueries = result;
                })
                .error(function (result) {
                    if (!alert('Failed to load enquiry Details..!')) {
                        window.location.reload();
                    }
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

            $scope.getpackagesarray = function (pkgName,pkgdays)
            {
                for (var i = 0; i < $scope.GMSinvoicePackage.length; i++)
                {
                    if ($scope.GMSinvoicePackage[i]["Packagename"] == pkgName && $scope.GMSinvoicePackage[i]["MemberID"] == $scope.MemberId)
                    {
                       // alert($scope.GMSinvoicePackage[i]["Packagename"] + "==" + pkgName + "==" + $scope.GMSinvoicePackage[i]["MemberID"] + "==" + $scope.MemberId + "==" + $scope.GMSinvoicePackage[i]["ValidityInDays"])
                        $scope.pkgdays = parseInt($scope.GMSinvoicePackage[i]["ValidityInDays"]);
                        $scope.pkgName = $scope.GMSinvoicePackage[i]["Packagename"];
                        $scope.pkgmemberID = $scope.GMSinvoicePackage[i]["MemberID"];
                        $scope.pkgstrtdt = $scope.GMSinvoicePackage[i]["StartDate"];
                        $scope.pkgendDate = $scope.GetpackageExpiryDate($scope.pkgstrtdt, $scope.pkgdays)

                        for (var j = 0; j < $scope.GMSPackages.length; j++)
                        {
                            if ($scope.GMSPackages[j]["Packagename"] == pkgName)
                            {
                                $scope.pkgAddonDays = parseInt($scope.GMSPackages[j]["ValidityDays"]) + parseInt($scope.pkgdays);
                                $scope.pkgAddonExpiryDate = $scope.GetpackageExpiryDate($scope.pkgstrtdt, $scope.pkgAddonDays)
                            }
                        }
                    }
                }
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

            $scope.getpackageDetails = function (packagerow)
            {
                var sum = 0;
                for (var i = 0; i < $scope.packagewithservice.length; i++)
                {
                    if (packagerow == $scope.packagewithservice[i]["PackageName"] && packagerow != null)
                    {
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
                        if ($scope.packagewithservice[i]["DiscountType"] == 'Percentage')
                        {
                            sum += (parseInt($scope.packagewithservice[i]["ServiceDiscount"]) * parseInt($scope.packagewithservice[i]["ServicePrice"]) / 100);
                        }
                        else if ($scope.packagewithservice[i]["DiscountType"] == 'Rupees')
                        {
                            sum += parseInt($scope.packagewithservice[i]["ServiceDiscount"]);
                        }
                    }
                }
                if (sum != null)
                {

                }
                else
                {
                    sum = 0;
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
                                        EndDate: $scope.GetpackageExpiryDate($scope.packagerow[key][key2]["StartDate"], (parseInt($scope.packagerow[key][key2]["ValidityDays"]))),
                                    });
                                }
                            }
                        }
                    }
                }

                for(var i = 0; i < $scope.fianlPackagesArray.length; i++) {
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
                        if ($scope.packagewithservice[i]["Packagename"] == $scope.taxes[j]["Product_Name"] && $scope.taxes[j]["Product_Name"]!=null) {
                            if ($scope.taxes[j]["Product_Type"] == "Package Level Tax") {
                                sum += parseInt($scope.taxes[j]["Percentage"]);
                            }
                        }
                    }
                }
                return sum;
            }

            $scope.getpackageLevelTaxTotal = function (packagerow)
            {
                var sum = 0;
                $scope.packageinvoice();
                for (var i = 0; i < $scope.taxes.length; i++)
                {
                    if (packagerow == $scope.taxes[i]["Product_Name"] && $scope.taxes[i]["Product_Type"] == "Package Level Tax" && packagerow != null && $scope.taxes[i]["Product_Name"] != null)
                    {
                        if ($scope.taxes[i]["Percentage"] != null)
                        {
                            sum += parseInt($scope.taxes[i]["Percentage"]);
                        }
                        else
                        {
                            sum += 0;
                        }
                       
                    }
                    else
                    {
                        sum += 0;
                    }
                }
                return sum
            }


            $scope.getpackageleveltaxtotalinrupees = function ()
            {
                $scope.fianlPackagesArray = [];
                for (var key in $scope.packagerow)
                {
                    $scope.s1 = 0
                    if ($scope.packagerow.hasOwnProperty(key))
                    {
                        for (var key2 in $scope.packagerow[key])
                        {
                            for (var key3 in $scope.packagerow[key][key2])
                            {
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

                                if ($scope.taxes[k]["Product_Name"] == $scope.packagewithservice[j]["PackageName"] && $scope.taxes[k]["Product_Name"] == $scope.fianlPackagesArray[i]["Packagename"] && $scope.taxes[k]["Product_Type"] == "Package Level Tax" && $scope.taxes[k]["Percentage"] != null && $scope.taxes[k]["Percentage"] != 'undefined' && $scope.taxes[k]["Product_Name"]!=null) {
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
                            $scope.totalpackageprice += parseInt($scope.packagewithservice[j]["ServicePrice"]);
                            $scope.totalpackagediscount += (parseInt($scope.packagewithservice[j]["ServicePrice"]) - discountamount);
                            $scope.totaltaxapplied += discountamount * $scope.packagewithservice[j]["TotalTax"] / 100;
                            discountamount = null;
                        }
                    }

                    for (var k = 0; k < $scope.taxes.length; k++)
                    {
                        if ($scope.fianlPackagesArray[i]["Packagename"] == $scope.taxes[k]["Product_Name"] && $scope.taxes[k]["Product_Type"] == "Package Level Tax" && $scope.fianlPackagesArray[i]["Packagename"] != null && $scope.taxes[k]["TaxName"] != null && $scope.taxes[k]["Percentage"] != null) {
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
                if ($scope.gettotalpackagestaxinrupees != null)
                {

                }
                else
                {
                    $scope.gettotalpackagestaxinrupees = 0;
                }
                return parseInt($scope.gettotalpackagestaxinrupees);
            }


            $scope.Formprint = function()
            {
                console.log(JSON.stringify($scope.GMSinvoicePackage).toString().substring($scope.GMSinvoicePackage.Length - 1), 1);


                var yourString = "/installers/";
                var result = yourString.substring(1, yourString.length - 2);
                console.log(result)

            }


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////            Submit Renewal Package    /////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            $scope.submitinvoiceForm = function () {
                $scope.GMSInvoicePackage =''
                $scope.submitted = false;
                


                if ($scope.startsubmitting == 0)
                {
                    $scope.startsubmitting = ($scope.startsubmitting) + 1;



                $http({ method: "GET", url: "http://gym.excellencea.com/api/invoicePackage" })
                   .success(function (result)
                   {
                       $scope.GMSInvoicePackage = result;
                       for (var ss = 0; ss < $scope.GMSInvoicePackage.length; ss++) {
                           for (var pp = 0; pp < $scope.fianlPackagesArray.length; pp++) {
                               console.log("found GMSInvoicePackage")
                               if ($scope.GMSInvoicePackage[ss]["Packagename"] == $scope.fianlPackagesArray[pp]["Packagename"] && $scope.GMSInvoicePackage[ss]["MemberID"] == $scope.MemberId) {
                                   $http({
                                       url: "http://gym.excellencea.com/api/invoice/delete",
                                       method: "POST",
                                       params: {
                                           "Packagename": $scope.GMSInvoicePackage[ss]["Packagename"],
                                           "InvoiceID": $scope.GMSInvoicePackage[ss]["InvoiceID"],
                                           "TransactionID": $scope.GMSInvoicePackage[ss]["TransactionID"],
                                           "MemberID": $scope.GMSInvoicePackage[ss]["MemberID"],
                                       }
                                   }).then(function (response) {
                                      // alert("Successfully Delete Service");
                                   })
                               }
                               
                           }
                       }

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
                               for (var tx = 0; tx < $scope.taxes.length; tx++)
                               {
                                   if ($scope.taxes[tx]["Product_Name"] == $scope.fianlPackagesArray[i]["Packagename"] && $scope.taxes[tx]["Product_Type"] == "Package Level Tax" && $scope.fianlPackagesArray[i]["Packagename"] != null) {
                                       {
                                           $scope.packagetaxes.push({
                                               InvoiceID: $scope.InvoiceNumberinInvoice,
                                               MemberID: $scope.MemberId,
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
                                                   "MemberID": $scope.MemberId,
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
                                               InvoiceID: $scope.InvoiceNumberinInvoice,
                                               MemberID: $scope.MemberId,
                                               TransactionID: $scope.UNIQUETRANSACTIONID,
                                               PackageOrServiceName: $scope.packagewithservice[bb]["PackageName"] + "(" + $scope.taxes[ty]["Product_Name"] + ")",
                                               TaxName: $scope.taxes[ty]["TaxName"],
                                               Taxpercentage: $scope.taxes[ty]["Percentage"],
                                               Taxlevel: $scope.taxes[ty]["Product_Type"],
                                           })
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
                                               "MemberID": $scope.MemberId,
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

                               //for (var val = 0; val < $scope.packagevalidity.length; val++) {
                               //    if ($scope.fianlPackagesArray[i]["Packagename"] == $scope.packagevalidity[val]["Packagename"] && $scope.fianlPackagesArray[i]["Packagename"] != null) {
                               //        $scope.packagestartdate = $scope.packagevalidity[val]["StartDate"];
                               //        $scope.packageEndDate = $scope.packagevalidity[val]["EndDate"];
                               //        $scope.packageValidityDays = $scope.packagevalidity[val]["ValidityDays"];
                               //    }
                               //}


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





                               

                               for (var jj = 0; jj < $scope.GMSPackages.length; jj++) {
                                   if ($scope.GMSPackages[jj]["Packagename"] == $scope.fianlPackagesArray[i]["Packagename"]) {
                                       $scope.daysofvalidity = parseInt($scope.GMSPackages[jj]["ValidityDays"]);
                                       $scope.EndDateofpackage = $scope.GetpackageExpiryDate($scope.fianlPackagesArray[i]["StartDate"], (parseInt($scope.fianlPackagesArray[i]["ValidityDays"]) + $scope.daysofvalidity));
                                   }
                               }

                              // alert($scope.pkgdays);

                               $.ajax({
                                   async: true,
                                   crossDomain: true,
                                   url: "http://gym.excellencea.com/api/invoicePackage",
                                   method: "POST",
                                   data: {
                                       "Packagename": $scope.fianlPackagesArray[i]["Packagename"],
                                       "InvoiceID": $scope.InvoiceNumberinInvoice,
                                       "TransactionID": $scope.UNIQUETRANSACTIONID,
                                       "MemberID": $scope.MemberId,
                                       "PackagePrice": $scope.totalpackageprice,
                                       "DiscountInAmount": $scope.totalpackagediscount,
                                       "TotalAmount": (($scope.packageleveltaxtotal * (parseInt($scope.totalpackageprice) - parseInt($scope.totalpackagediscount)) / 100) + ($scope.totaltaxapplied) + (parseInt($scope.totalpackageprice) - parseInt($scope.totalpackagediscount))),
                                       "StartDate": $scope.fianlPackagesArray[i]["StartDate"],
                                       "ValidityInDays": $scope.pkgAddonDays,
                                       "EndDate": $scope.pkgAddonExpiryDate,
                                       "TotalTaxInPercentage": $scope.packageleveltaxtotal,
                                       "TotalTaxInAmount": ($scope.packageleveltaxtotal * (parseInt($scope.totalpackageprice) - parseInt($scope.totalpackagediscount)) / 100),
                                       "IncludedServiceLevelTaxAmount": $scope.getpackagestotaltax($scope.fianlPackagesArray[i]["Packagename"]),
                                   },
                                   success: function (data) {
                                       // alert("Your Service "+ $scope.packagerow[i]["Packagename"]+ " Is Stored Into Draft");

                                       console.log(JSON.stringify($scope.myPackages1))
                                   },
                                   error: function (req, status, errorObj) {
                                       alert("invoice Package Not Added " + errorObj.toString());
                                   }
                               });




                               $scope.billamount = document.getElementById("BillingAmount").value;
                               $scope.balanceamount = document.getElementById("BalancePayment").value;
                               $scope.payAmount = document.getElementById("payingAmount").value;

                               if ($scope.newinvoiceid == 0) {

                               }
                               else {
                                   if ($scope.goforinvoice == 0) {
                                       $scope.myinvoice.push({
                                           InvoiceID: $scope.newinvoiceid,
                                           TransactionID: $scope.UNIQUETRANSACTIONID,
                                           MemberID: $scope.MemberId,
                                           FName: document.getElementById("Fname").value,
                                           Mname: document.getElementById("Mname").value,
                                           Lname: document.getElementById("Lname").value,
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

                                       //  insert in Transactions
                                       $.ajax({
                                           async: true,
                                           crossDomain: true,
                                           url: "http://gym.excellencea.com/api/Invoice",
                                           method: "POST",
                                           data:
                                           {
                                               "InvoiceID": $scope.InvoiceNumberinInvoice,
                                               "MemberID": $scope.MemberId,
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
                                               setInterval(50000);

                                               if (!alert('Transaction Generated Sucessufully..!')) {
                                                 //  window.location.reload();
                                                   // window.location = "index.html#/dashboard/newRenewal";
                                               }

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
                                                       "MemberID": $scope.MemberId,
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
                                   "MemberID": $scope.MemberId,
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


                   })        
                    .error(function (result) {
                        if (!alert('Failed to Renew..!')) {
                            window.location.reload();
                        }
                    });
                   
                }
                else {
                    //alert("This Invoice Is Already Submitted")
                    if (!alert('Plese Wait till Package Renewal Process Complete..!'))
                    {
                        setInterval(window.location.reload(), 10000);

                     //   window.location.reload();
                    }
                }
            }

         //   $scope.payingAmount = null;
    };

        $scope.init();




        //$scope.selectEnquiry = function (InquiryID, Fname, Mname, Lname, BirthDate, Email, MobileNumber, Gender, MarritalStatus, Address, City, Pincode, State, SourceOfInquiry, InterestedDays, InterestedServices, EnquiryDate, BranchName, Comment) {
        //    $scope.id = InquiryID;
        //    $scope.Fname = Fname;
        //    $scope.Mname = Mname;
        //    $scope.Lname = Lname;
        //    $scope.BirthDate = BirthDate;
        //    $scope.Email = Email;
        //    $scope.MobileNumber = MobileNumber;
        //    $scope.Gender = Gender;
        //    $scope.MarritalStatus = MarritalStatus;
        //    $scope.Address = Address;
        //    $scope.City = City;
        //    $scope.Pincode = Pincode;
        //    $scope.State = State;
        //    $scope.SourceOfInquiry = SourceOfInquiry;
        //    $scope.InterestedDays = InterestedDays;
        //    $scope.InterestedServices = InterestedServices;
        //    $scope.EnquiryDate = EnquiryDate;
        //    $scope.BranchName = BranchName;
        //    $scope.Comment = Comment;
        //}


});



