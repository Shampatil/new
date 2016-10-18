'use strict';
//<!-------------------------------------------------------- Start of validation  ------------------------------------------------------------------------------------------
//@Package     :-
//@Sub-Package :-
//@Category    :-
//@Link        :-
//@Since       :-
//@Filesource  :-
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
gymManagementApp.controller('DemoController', function ($scope, $state, $http, $rootScope, $location, Idle, $route, exDialog, commonService, $localStorage, userSessionService) {


    var mytotal;

    $scope.init = function () {
        Idle.watch();
        $location.path('/dashboard/Demo');

        var httpRespose = $http.get("http://gym.excellencea.com/api/servicewithtax");
        httpRespose.then(function (response) {
            $scope.taxes = response.data;
        });

        // Get Enquiry Records
        $http.get("http://gym.excellencea.com/api/packagewithservice")
        .then(function (response) {
            $scope.packagewithservice = response.data;
        });

        //$http.get("http://gym.excellencea.com/api/packagewithservice")
        //.then(function (response) {
        //    $scope.packagewithservice1 = response.data;
        //});

        $scope.selectedRow = 0;

        $scope.setClickedRow = function (index) {
            $scope.selectedRow = index - 1;
            console.log(index.fn);
            //$("#searchtable").hide();
        }

        //var httpRespose = $http.get("http://gym.excellencea.com/api/service");
        //httpRespose.then(function (response) {
        //    $scope.service = response.data;
        //});



        //var httpRespose = $http.get("http://gym.excellencea.com/api/package");
        //httpRespose.then(function (response) {
        //    $scope.jsonpackages = response.data;
        //});



    };
    $scope.init();

    $scope.messagewarning = function (sss) {
        alert("You selected Discount type "+ sss +" Please be Careful...!!!")
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

    $scope.getpackagesarray = function ()
    {
        //var sum = 0;
        //for (var i = 0; i < $scope.packagewithservice.length; i++)
        //{
        //    for (var j = 0; j < $scope.packagerow.length; j++)
        //    {
        //        if ($scope.packagerow[i]["Packagename"] != $scope.packagewithservice[j]["PackageName"])
        //        {
        //          //  $scope.packagesarray.push($scope.packagewithservice[j]["PackageName"]);
        //            $scope.packagewithservice1.splice($scope.packagewithservice[j]["PackageName"]);
        //        }
        //    }
        //}
        //return sum;
    }


    $scope.packagerow = [{}];
    $scope.packagerow1 = [{}];
    $scope.packagenrow = [];

    $scope.addpackage = function ()
    {
        $scope.packagerow.push({
        });
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
            if (packagerow == $scope.packagewithservice[i]["PackageName"])
            {
                sum += parseInt($scope.packagewithservice[i]["ServicePrice"]);
            }
        }
        return sum
    }

    $scope.GetPackageTotaldiscount = function (packagerow)
    {
        var sum = 0;
        for (var i = 0; i < $scope.packagewithservice.length; i++) {
            if (packagerow == $scope.packagewithservice[i]["PackageName"])
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
        return sum
    }

    $scope.getpackagestotalprice = function ()
    {
        var sum = 0;
        for (var i = 0; i < $scope.packagerow.length; i++) {
            for (var j = 0; j < $scope.packagewithservice.length; j++) {
                if($scope.packagerow[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"])
                {
                    sum +=parseInt($scope.packagewithservice[j]["ServicePrice"]);
                }
            }
        }
        return sum;
    }

    //$scope.getpackageLevelTaxTotal = function (packagerow)
    //{
    //        for (var j = 0; j < $scope.taxes.length; j++)
    //        {
    //            if (packagerow == $scope.taxes[j]["Product_Name"] && $scope.taxes[j]["Product_Type"] == "Package Level Tax")
    //            {
    //                sum += parseInt($scope.taxes[j]["Percentage"]);
    //            }
    //        }
    //     return sum;
    //}





    $scope.getpackagestotaltax = function ()
    {
        var sum = 0;
        var temp = 0;
        for (var i = 0; i < $scope.packagerow.length; i++) {
            for (var j = 0; j < $scope.packagewithservice.length; j++)
            {
                if ($scope.packagerow[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"])
                {
                    if ($scope.packagewithservice[j]["DiscountType"] == "Percentage") {
                        temp = parseInt($scope.packagewithservice[j]["ServicePrice"] * $scope.packagewithservice[j]["ServiceDiscount"] / 100);
                    }
                    else if ($scope.packagewithservice[j]["DiscountType"] == "Rupees") {
                        temp = parseInt($scope.packagewithservice[j]["ServiceDiscount"]);
                    }

                    var sss = (($scope.packagewithservice[j]["ServicePrice"]-(temp)) * $scope.packagewithservice[j]["TotalTax"]) / 100;
                    sum += sss;
                }
            }
        }
        return sum;
    }


    $scope.getpackagestotalDiscount = function ()
    {
        var sum = 0;
        for (var i = 0; i < $scope.packagerow.length; i++)
        {
            for (var j = 0; j < $scope.packagewithservice.length; j++)
            {
                if ($scope.packagerow[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"])
                {
                    if ($scope.packagewithservice[j]["DiscountType"] == "Percentage")
                    {
                        sum +=parseInt($scope.packagewithservice[j]["ServicePrice"] * $scope.packagewithservice[j]["ServiceDiscount"] / 100);
                    }
                    else if ($scope.packagewithservice[j]["DiscountType"] == "Rupees")
                    {
                        sum += parseInt($scope.packagewithservice[j]["ServiceDiscount"]);
                    }
                }
            }
        }
        return sum;
    }

    $scope.getpackagestaxtotal = function ()
    {
        var sum = 0;
        for (var i = 0; i < $scope.packagewithservice.length; i++)
        {
            for (var j = 0; j < $scope.taxes.length; j++)
            {
                if ($scope.packagewithservice[i]["Packagename"] == $scope.taxes[j]["Product_Name"])
                {
                    if ($scope.taxes[j]["Product_Type"] == "Package Level Tax")
                    {
                        sum +=parseInt($scope.taxes[j]["Percentage"]);
                    }
                }
            }
        }
        return sum;
    }

    $scope.getpackageLevelTaxTotal = function (packagerow) {
        var sum = 0;

        $scope.packageinvoice();

        for (var i = 0; i < $scope.taxes.length; i++)
        {
            if (packagerow == $scope.taxes[i]["Product_Name"] && $scope.taxes[i]["Product_Type"] == "Package Level Tax" && packagerow != null)
            {
                sum += parseInt($scope.taxes[i]["Percentage"]);
            }
        }
        return sum
    }


    $scope.getpackageleveltaxtotalinrupees = function ()
    {
        var packagestotaldiscount=0;
        for (var i = 0; i < $scope.packagerow.length; i++)
        {
            var eachpackageprice = 0;
            for (var j = 0; j < $scope.packagewithservice.length; j++)
            {

                if ($scope.packagerow[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"])
                {
                    if ($scope.packagewithservice[j]["DiscountType"] == "Percentage")
                    {
                        packagestotaldiscount += parseInt($scope.packagewithservice[j]["ServicePrice"] * $scope.packagewithservice[j]["ServiceDiscount"] / 100);
                    }
                    else if ($scope.packagewithservice[j]["DiscountType"] == "Rupees") {
                        packagestotaldiscount += parseInt($scope.packagewithservice[j]["ServiceDiscount"]);
                    }
                }


                if ($scope.packagerow[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"])
                {
                    eachpackageprice += parseInt($scope.packagewithservice[j]["ServicePrice"]);
                }

                var eachpackagetotaltax = 0;
                for (var k = 0; k < $scope.taxes.length; k++)
                {
                    if ($scope.packagerow[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"])
                    {
                        eachpackageprice +=parseInt($scope.packagewithservice[j]["ServicePrice"]);

                        if ($scope.taxes[k]["Product_Name"] == $scope.packagewithservice[j]["PackageName"] && $scope.taxes[k]["Product_Name"] == $scope.packagerow[i]["Packagename"] && $scope.taxes[k]["Product_Type"] == "Package Level Tax" && $scope.taxes[k]["Percentage"] != null && $scope.taxes[k]["Percentage"] != 'undefined')
                        {
                            eachpackagetotaltax += parseInt($scope.taxes[k]["Percentage"]);
                        }
                    }
                }

                if (eachpackagetotaltax > 0)
                {
                    console.log(eachpackageprice);
                    console.log("Package name :" + $scope.packagewithservice[j]["PackageName"] + "  each package total :" + eachpackagetotaltax);
                }
                
            }
        }
        console.log("Total Discount On Package :" + packagestotaldiscount);


        //var allpackagestotal = 0;
        //var allpackageleveltaxtotal;
        //for (var i = 0; i < $scope.packagerow.length; i++) {
        //    var eachpackagetotal = 0;
        //    for (var j = 0; j < $scope.packagewithservice.length; j++)
        //    {
        //        if ($scope.packagerow[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"])
        //        {
        //            eachpackagetotal += parseInt($scope.packagewithservice[j]["ServicePrice"]);
        //            allpackagestotal += parseInt($scope.packagewithservice[j]["ServicePrice"]);
        //        }
        //    }
        //    for (var k = 0; k < $scope.taxes.length; k++)
        //    {
                
        //        if ($scope.packagerow[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"] && $scope.taxes[k]["Product_Type"] == "Package Level Tax")
        //        {
        //            console.log("Each package Total :" + eachpackagetotal);
        //          //  allpackageleveltaxtotal = eachpackagetotal *  $scope.taxes[k]["Percentage"];
        //        }
        //    }
        //}
        //console.log("All Packages Total :"+ allpackagestotal);





    }



    $scope.packageinvoice = function () {
        $scope.discountamount = 0;
        for (var i = 0; i < $scope.packagerow.length; i++) {
            for (var j = 0; j < $scope.packagewithservice.length; j++) {

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





    $scope.submitinvoiceForm = function()
    {
        $scope.myservices = "\n";
        $scope.totalpackageprice = 0;
        $scope.totalpackagediscount = 0;
        $scope.totaltaxapplied = 0;
        $scope.packageleveltaxtotal = 0;
      
        
        for (var i = 0; i < $scope.packagerow.length; i++)
        {
            for (var j = 0; j < $scope.packagewithservice.length; j++)
            {
                if ($scope.packagerow[i]["Packagename"] == $scope.packagewithservice[j]["PackageName"])
                    {
                    if ($scope.packagewithservice[j]["DiscountType"] == "Rupees")
                            {
                                var discountamount = $scope.packagewithservice[j]["ServicePrice"] - $scope.packagewithservice[j]["ServiceDiscount"];
                            }
                            else if ($scope.packagewithservice[j]["DiscountType"] == "Percentage")
                            {
                                var discountamount = $scope.packagewithservice[j]["ServicePrice"] - ($scope.packagewithservice[j]["ServiceDiscount"] * $scope.packagewithservice[j]["ServicePrice"] / 100);
                            }

                     $scope.myservices +="{"+("ServiceName :"+$scope.packagewithservice[j]["IncludeServiceName"] + "," +
                       "Price: "+ $scope.packagewithservice[j]["ServicePrice"] + "," +
                       "Discount: "+ $scope.packagewithservice[j]["ServiceDiscount"] + "," +
                       "DiscountType: "+ $scope.packagewithservice[j]["DiscountType"] + "," +
                       "TotalTax: "+ $scope.packagewithservice[j]["TotalTax"] + "," +
                        "Discount Rupees: " + (parseInt($scope.packagewithservice[j]["ServicePrice"]) - discountamount) + "," +
                        "Price After Discount: " + discountamount + "," +
                        "Total Tax On service: " + discountamount * $scope.packagewithservice[j]["TotalTax"] / 100) + "}\n";

                    //alert($scope.packagewithservice[j]["IncludeServiceName"] + "\n" +
                    //    $scope.packagewithservice[j]["ServicePrice"] + "\n" +
                    //    $scope.packagewithservice[j]["ServiceDiscount"] + "\n" +
                    //    $scope.packagewithservice[j]["DiscountType"] + "\n" +
                    //    $scope.packagewithservice[j]["TotalTax"] + "\n" +
                    //    $scope.packagewithservice[j]["PriceAfter_Discount"] + "\n"+
                    //    "Discount Rupees :"+(parseInt($scope.packagewithservice[j]["ServicePrice"]) - discountamount) +"\n"+
                    //    "Price After Discount :" + discountamount);

                    $scope.totalpackageprice +=parseInt($scope.packagewithservice[j]["ServicePrice"]);
                    $scope.totalpackagediscount += (parseInt($scope.packagewithservice[j]["ServicePrice"]) - discountamount);
                    $scope.totaltaxapplied += discountamount * $scope.packagewithservice[j]["TotalTax"] / 100;
                    discountamount = null;
                }

               
            }

            for (var k = 0; k < $scope.taxes.length; k++)
            {
                if ($scope.packagerow[i]["Packagename"] == $scope.taxes[k]["Product_Name"] && $scope.taxes[k]["Product_Type"] == "Package Level Tax" && $scope.packagerow[i]["Packagename"] != null)
                {
                    $scope.packageleveltaxtotal += parseInt($scope.taxes[k]["Percentage"]);
                }
            }

            alert("Packagename :"+ $scope.packagerow[i]["Packagename"] +
                "\n" + "Package Price :" + $scope.totalpackageprice +
                "\n" + "Package Total Discount :" + $scope.totalpackagediscount +
                "\n" + "Package Price After Discount :" + (parseInt($scope.totalpackageprice)-parseInt($scope.totalpackagediscount)) + 
                "\n" + "Package Total Tax :" + $scope.totaltaxapplied +
                "\n" + "Package Total after service Level Discount And Taxes :" + ((parseInt($scope.totalpackageprice) - $scope.totalpackagediscount) + $scope.totaltaxapplied) +
                "\n" + "Included Services :" + $scope.myservices +
                "\n" + "Package Level Tax Total In % :" + $scope.packageleveltaxtotal +
                "\n" + "Package Level Tax Total In Rupees :" + ($scope.packageleveltaxtotal*(parseInt($scope.totalpackageprice)-parseInt($scope.totalpackagediscount))/100)+
                "\n" + "Package Gross Price :" + (($scope.packageleveltaxtotal * (parseInt($scope.totalpackageprice) - parseInt($scope.totalpackagediscount)) / 100) + ($scope.totaltaxapplied) + (parseInt($scope.totalpackageprice) - parseInt($scope.totalpackagediscount))));
            $scope.packagesleveltaxtotal += ($scope.packageleveltaxtotal * (parseInt($scope.totalpackageprice) - parseInt($scope.totalpackagediscount)) / 100);
            $scope.myservices = "";
            $scope.totalpackagediscount = null;
            $scope.totalpackageprice = null;
            $scope.totaltaxapplied = null;
            $scope.packageleveltaxtotal = null;
        }
        alert($scope.packagesleveltaxtotal)
    }
});



