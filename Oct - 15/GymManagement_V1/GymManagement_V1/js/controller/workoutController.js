'use strict';

gymManagementApp.controller('workoutController', function ($scope, $state, $http, $rootScope, $location, Idle, $route, exDialog, commonService, $localStorage, userSessionService) {
    $scope.init();

    $scope.init = function () {
        Idle.watch();
        $location.path('/dashboard/workout');

        $scope.TodayDate = function () {
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
            return $scope.startingdate1
        };

        $scope.newInvoiceServices = [];

        $http({ method: "GET", url: "http://gym.excellencea.com/api/member" })
         .success(function (result) {
             $scope.GMSMembers = result;
             $http({ method: "GET", url: "http://gym.excellencea.com/api/invoiceservice" })
                 .success(function (result1) {
                     $scope.GMSinvoiceServices = result1;
                     for (var j = 0; j < $scope.GMSMembers.length; j++) {
                         for (var i = 0; i < $scope.GMSinvoiceServices.length; i++) {
                             if ($scope.GMSinvoiceServices[i]["Service"] == "Dance" && $scope.GMSMembers[j]["MemberId"] == $scope.GMSinvoiceServices[i]["MemberID"] && $scope.GMSMembers[j]["Fname"] != null && $scope.GMSMembers[j]["Mname"] != null && $scope.GMSMembers[j]["Lname"] != null && $scope.GMSMembers[j]["Height"] != null&& $scope.GMSMembers[j]["Weight"] != null&& $scope.GMSMembers[j]["BG"] != null&& $scope.GMSMembers[j]["BP"] != null&& $scope.GMSMembers[j]["Diabetes"] != null&& $scope.GMSMembers[j]["hospitalized"] != null&& $scope.GMSMembers[j]["injuries_Head"] != null&& $scope.GMSMembers[j]["injuries_bones"] != null&& $scope.GMSMembers[j]["injuries_Neck"] != null) {
                                 $scope.newInvoiceServices.push({
                                     InvoiceID: $scope.GMSinvoiceServices[i]["InvoiceID"],
                                     TransactionID: $scope.GMSinvoiceServices[i]["TransactionID"],
                                     MemberID: $scope.GMSinvoiceServices[i]["MemberID"],
                                     Packagename: $scope.GMSinvoiceServices[i]["Packagename"],
                                     Service: $scope.GMSinvoiceServices[i]["Service"],
                                     Price: $scope.GMSinvoiceServices[i]["Price"],
                                     DiscountInPercentage: $scope.GMSinvoiceServices[i]["DiscountInPercentage"],
                                     DiscountInAmount: $scope.GMSinvoiceServices[i]["DiscountInAmount"],
                                     TotalAmount: $scope.GMSinvoiceServices[i]["TotalAmount"],
                                     AddedBy: $scope.GMSinvoiceServices[i]["AddedBy"],
                                     AddedDate: $scope.GMSinvoiceServices[i]["AddedDate"],
                                     TotalTaxInPercentage: $scope.GMSinvoiceServices[i]["TotalTaxInPercentage"],
                                     TotalTaxInAmount: $scope.GMSinvoiceServices[i]["TotalTaxInAmount"],
                                     TaxesList: $scope.GMSinvoiceServices[i]["TaxesList"],
                                     GymID: $scope.GMSinvoiceServices[i]["GymID"],
                                     BranchID: $scope.GMSinvoiceServices[i]["BranchID"],
                                     Fname:$scope.GMSMembers[j]["Fname"],
                                     Mname:$scope.GMSMembers[j]["Mname"],
                                     Lname:$scope.GMSMembers[j]["Lname"],
                                     Email:$scope.GMSMembers[j]["Email"],
                                     Mobile:$scope.GMSMembers[j]["Mobile"],
                                     Gender: $scope.GMSMembers[j]["Gender"],
                                     Height: $scope.GMSMembers[j]["Height"],
                                     Weight: $scope.GMSMembers[j]["Weight"],
                                     BG: $scope.GMSMembers[j]["BG"],
                                     BP: $scope.GMSMembers[j]["BP"],
                                     Diabetes: $scope.GMSMembers[j]["Diabetes"],
                                     hospitalized: $scope.GMSMembers[j]["hospitalized"],
                                     injuries_Head: $scope.GMSMembers[j]["injuries_Head"],
                                     injuries_bones: $scope.GMSMembers[j]["injuries_bones"],
                                     injuries_Neck: $scope.GMSMembers[j]["injuries_Neck"],
                                 })
                             }
                         }
                     }
         })
         .error(function (result) {
             if (!alert('Failed to load Data..!')) {
                 window.location.reload();
             }
         });

         })
         .error(function (result) {
             if (!alert('Failed to load Data..!')) {
                 window.location.reload();
             }
         });


        $scope.SelectMember = function(MemberID,Fname,Mname,Lname,Email,Mobile,Gender,Packagename,Service,Price,Height,Weight,BG,BP,Diabetes,hospitalized,injuries_Head,injuries_bones,injuries_Neck)
        {
            $scope.MemberID = MemberID,
            $scope.Fname = Fname,
            $scope.Mname = Mname,
            $scope.Lname = Lname,
            $scope.Email = Email,
            $scope.Mobile= Mobile,
            $scope.Gender = Gender,
            $scope.Packagename = Packagename,
            $scope.Service = Service,
            $scope.Price = Price,
            $scope.Height = Height,
            $scope.Weight = Weight,
            $scope.BG = BG,
            $scope.BP = BP,
            $scope.Diabetes = Diabetes,
            $scope.hospitalized = hospitalized,
            $scope.injuries_Head = injuries_Head,
            $scope.injuries_bones = injuries_bones,
            $scope.injuries_Neck = injuries_Neck
        }


        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        $scope.Workouts = [];


        $scope.removeWorkout = function (item) {
            $scope.Workouts.splice(item, 1);
        };

        $scope.addNewWorkout = function () {
            var newItemNo = $scope.Workouts.length + 1;
            $scope.Workouts.push({});
        };

        $scope.removeWorkout(Option)
        {
            angular.forEach($scope.service, function () {
                alert(Option.toString())
            })
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        $scope.Weekdays = [{ "ID": 4, "WeekDay": "Monday" }, { "ID": 5, "WeekDay": "Tuesday" }, { "ID": 6, "WeekDay": "Wednesday" }, { "ID": 7, "WeekDay": "Thursday" }, { "ID": 8, "WeekDay": "Friday" }, { "ID": 9, "WeekDay": "Saturday" }, { "ID": 10, "WeekDay": "Sunday" }];
        $scope.ExcersiseType = [{ "ID": 4, "GMSworkoutType": "Warm Up" }, { "ID": 5, "GMSworkoutType": "Routine Exercise" }];


    }


});
