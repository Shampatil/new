'use strict';
gymManagementApp.controller('addPackagesController', function ($scope, $state, $http, $rootScope, $location, Idle, $route, exDialog, commonService, $localStorage, userSessionService) {

    $scope.init = function () {


        //var viewId = $state.params.id;
        //console.log(viewId);






        //if (sessionStorage.P_Module == "Package" && sessionStorage.P_Add == "True") {

        //    //alert("session create");
        //    $scope.Name = sessionStorage.UserName;
        //}
        //else {
        //    // alert("session not created");
        //    $state.go('dashboard.home', { url: "/home", templateUrl: 'Views/dashboard/home.html', controller: 'homeController' });
        //}


        Idle.watch();
        $location.path('/dashboard/addPackages');
        $scope.press != 0;

        $scope.row = [{}];
        $scope.nrow = [];

        $scope.CurrentDate = new Date();


        $('#ServiceStartdate').Zebra_DatePicker(
       {
           view: 'years',
           direction: true,
           pair: $('#ServiceEndDate'),
       });




        $('#ServiceEndDate').Zebra_DatePicker({
            view: 'years',
            direction: 1,
        });
    };

    $scope.init();

    $scope.choices = [];
    $scope.removeChoice = function (item) {
        $scope.choices.splice(item, 1);
    };

    var total = 0;
    $scope.addNewChoice = function () {
        var newItemNo = $scope.choices.length + 1;
        $scope.choices.push({});
    };

    $scope.totall = function () {
        var totaltax = 0;
        var servicetax = $scope.tt;
        angular.forEach($scope.choices, function (choice) {
            totaltax += parseFloat(choice.taxRate);
            $scope.newtotaltax = totaltax;
        })

        if (isNaN(totaltax))
        {
            totaltax = 0;
        }
        return totaltax;
    }
    
    var httpRespose = $http.get("http://gym.excellencea.com/api/service");

    httpRespose.then(function (response) {

        // alert(JSON.stringify(response.data));
        $scope.service = response.data;
    });


    //function service() {

    //    $http({
    //        url: "http://gym.excellencea.com/api/service",
    //        method: "GET",
    //        params: {
    //            "status": "Aproved"

    //        }
    //    }).then(function (response) {
    //        $scope.service = response.data;
    //        //alert(JSON.stringify(response.data))
    //    })
    //}

    //service();


    $scope.addRow = function () {
        var newItemNo = $scope.row.length + 1;
        $scope.row.push({
        });
    };




    $scope.rRow = function (lastItem) {
        $scope.row.splice(lastItem, 1)({
        });
    };


    $scope.getProductDetails = function (row) {
        angular.forEach($scope.service, function (p) {
            if (p.Servicename == row.Servicename) {
                row.product_mrp = parseInt(p.ServiceCharge);
                row.Tax = parseFloat(p.TotalTax);
                row.item_description = p.Servicename;
                row.contain = p.ServiceDesciption;
            }
        })
    }

    $scope.total_amount = function () {
        var total = 0;
        var service = "";

        $scope.row.forEach(function (row) {
            if (row.final == null) {
                $scope.t = 0;
                $scope.discount = "";
                $scope.final = 0;
            }
            else {
                total += row.final;
                $scope.t = total;
                service += row.all;
                $scope.s = service;
            }

            if(isNaN(total))
            {
                total = 0;
            }
        });
        return total;

    }

    $scope.amount_after_discount = function () {
        var total = 0;
        var service = "";

     //   console.log(JSON.stringify($scope.row))


        $scope.row.forEach(function (row) {
            if (row.amount == null) {
                $scope.t = 0;
                $scope.discount = "";
                $scope.final = 0;
            }
            else {
                total += row.amount;
                $scope.t = total;

                service += row.all;
                $scope.s = service;
            }

        });
        return total;
    }



    $scope.total_tax = function () {
        var total = 0;
        $scope.row.forEach(function (row) {
            if (row.Tax != null) {
                total += parseFloat(row.Tax);
                $scope.tt = total;
            }
            else {

            }

        });
        return total;
    }


    $scope.total_rupess = function () {
        var total = 0;
        $scope.row.forEach(function (row) {
            if (row.final == null) {
                $scope.final = 0;
            }
            else {
                total += parseInt(row.final);
            }
        });
        return total;
    }

    $scope.total_disc = function () {
        var total = 0;
        $scope.row.forEach(function (row) {
            if (row.final == null) {

            }
            else {
                total += parseInt(row.final);
            }
        });
        return total;
    }


    $scope.total_taxamount = function () {

        var total = 0;
         $scope.row.forEach(function (row) {
            if (row.taxamount == null) {
            }
            else {
                total += parseInt(row.taxamount);
            }
        });
        return total;

    }

    $scope.total_packtaxamount = function () {
        var total = 0;
        $scope.choices.forEach(function (row) {
            if (row.packtaxamount == null) {

            }
            else {
                total += parseInt(row.packtaxamount);

            }

        });
        return total;

    }


    $scope.allIterationInOneFunction = function()
    {

    }


    //$scope.total_taxwithamount = function () {
    //    var total = 0;
    //    $scope.row.forEach(function (row) {
    //        if (row.cost == null) {

    //        }
    //        else {
    //            total += parseInt(row.cost);

    //        }

    //    });
    //    return total;

    //}

    //////////////////////////////////////////////////////////////tax details//////////////////////////////////////////////////////////////////////

    $scope.rows = [{}];
    $scope.nrows = [];

    var httpRespose = $http.get("http://gym.excellencea.com/api/Tax");
    httpRespose.then(function (response) {
        // alert(JSON.stringify(response.data));
        $scope.Tax = response.data;
    });

    $scope.addRows = function () {
        var newItemNo = $scope.rows.length + 1;
        $scope.rows.push({ 'id': '' + newItemNo });
    };


    $scope.tRows = function (lastItem) {

        $scope.rows.splice(lastItem, 1)({

        });
    };


    $scope.gettax = function (rows) {
        angular.forEach($scope.Tax, function (T) {
            if (T.ID == rows.id) {
                rows.Tax_Name = T.GMStaxname;
                rows.Tax_Percentage = parseFloat(T.GMSTaxRate);
            }
        })
    }


    $scope.T_Total = function () {
        var total = 0;

        $scope.rows.forEach(function (row) {
            if (row.taxtotal == null) {
                $scope.tax = 0;
            }
            else {
                total += row.taxtotal;
                $scope.tax = total;
            }
        });
        return total;

    }


    $scope.addService = function () {
        check();
    }

    function check() {

        $scope.press != 1;
        $http({
            url: "http://gym.excellencea.com/api/package/validation",
            method: "GET",
            params: {
                "packagename": $scope.PackageName

            }
        }).then(function (response) {
            if (response.data == true) {
                alert("Package Name Already Created");
            }
            else {


                var pack_name = $scope.PackageName;
                var services = $scope.all;
                var mrp = $scope.t;
                var discount = document.getElementById("discount").value;
                var taxname = $scope.taxname;
                //var startdate = document.getElementById("ServiceStartdate").value;
                //var enddate = document.getElementById("ServiceEndDate").value;
                var servicediscount = $scope.dis;
                var CretedDate = $scope.CurrentDate;
                var cretedby = $scope.Name;
                var temp1 = 0;
                var temp0 = 0;


                $.ajax({
                    async: true,
                    crossDomain: true,
                    url: "http://gym.excellencea.com/api/package",
                    method: "POST",
                    data: {

                        "Packagename": pack_name,
                        "Desciption": document.getElementById("packageDescription").value,
                        "SelectedService": document.getElementById("services").value,
                        "PackageMRP": document.getElementById("MRP").value,
                        //"StartDate": startdate,
                        //"EndDate": enddate,
                        "TotalTaxInAmount": document.getElementById("TotalTaxAmount").value,
                        "TotalTaxInPercentage": document.getElementById("PackageTotalTax").value,
                        "Discount": document.getElementById("discount").value,
                        "TotalAmount": document.getElementById("grossPackagePrice").value,
                        "ValidityDays": document.getElementById("validity").value,
                        "IncludedServiceLevelTaxPercentage": document.getElementById("TotalTax").value,
                        "IncludedServiceLevelTaxAmount": document.getElementById("ServiceLevelTotalTax").value,
                        "CreatedBy": cretedby,
                        "CreatedDate": "",
                        "AprovalStatus": "Draft"

                    },
                    success: function (data) {

                        var Tax = $scope.choices;

                        var taxLength = Tax.length;
                       

                        $.each(Tax, function () {
                            $.ajax({
                                async: true,
                                crossDomain: true,
                                url: "http://gym.excellencea.com/api/Servicewithtax",
                                method: "POST",
                                data: {
                                    "Product_Name": pack_name,
                                    "TaxName": this.taxName,
                                    "Percentage": this.taxRate,
                                    "Product_Type": "Package Level Tax"
                                },
                                success: function (data) {

                                    temp0 = temp0 + 1;
                                },
                                error: function (req, status, errorObj) {
                                    alert(errorObj.toString());
                                }
                            });
                        });

                        var service = $scope.row;
                        var serviceLength = service.length;
                        
                        $.each(service, function () {
                            $.ajax({
                                async: true,
                                crossDomain: true,
                                url: "http://gym.excellencea.com/api/packagewithservice",
                                method: "POST",
                                data: {
                                    "PackageName": pack_name,
                                    "IncludeServiceName": this.Servicename,
                                    "ServicePrice": this.amount,
                                    "ServiceDiscount": this.dis,
                                    "PriceAfter_Discount": this.final,
                                    "TotalTax": this.Tax,
                                    "DiscountType": document.getElementById("ServiceDiscounttype").value,
                                    "TotalTaxinPercentage": document.getElementById("TotalTax").value,
                                    "TotalTaxinAmount": document.getElementById("totaltaxamount").value
                                },
                                success: function (data) {
                                    temp1 = temp1+1;
                                },
                                error: function (req, status, errorObj) {
                                    alert(errorObj.toString());
                                }

                            });
                        });

                        //console.log("(temp1 - 1) = " + (temp1) + "&& serviceLength = " + serviceLength);
                        //console.log("(temp0 - 1) = " + (temp0) + "&& taxLength == " + taxLength);

                        //if ((temp1) == serviceLength && (temp0) == taxLength)
                        //{
                        //    alert("Package created Successfully");
                        //    location.reload();
                        //}
                    }
                })
            }
        });
    }
});
