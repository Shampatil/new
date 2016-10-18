'use strict';
gymManagementApp.controller('ServiceListController', function ($scope, $state, $http, $rootScope, $location, Idle, $route, exDialog, commonService, $localStorage, userSessionService) {

    $scope.init = function () {

        //$scope.openView = function (viewId) {

        //    $state.go('dashboard.addServices', { 'id': viewId });
        //};

        Idle.watch();
        $location.path('/dashboard/ServiceList');
        $scope.test1 = 'This Is About us Page';

        $scope.selected = {};

        $scope.getTemplate = function (mem) {
            if (mem.ID === $scope.selected.ID) {
                return 'edit';
            }
            else return 'display';
        };

        $scope.editEmployee = function (mem) {
            $scope.selected = angular.copy(mem);
        };

        $scope.reset = function () {
            $scope.selected = {};
        };





        //Strat Session Code


        //if (sessionStorage.S_Module == "Service" && sessionStorage.S_View == "True") {

        //    //alert("session create");
        //    $scope.LoginName = sessionStorage.UserName;
        //}
        //else {
        //    // alert("session not created");
        //    $state.go('dashboard.home', { url: "/home", templateUrl: 'Views/dashboard/home.html', controller: 'homeController' });
        //}


        //End Session Code

        //Strat Date Code

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

        //End Date Code

        function check() {

            $http({
                url: "http://gym.excellencea.com/api/service",
                method: "GET",
                params: {
                    "status": "Draft"
                }
            }).then(function (response) {
                $scope.draft = response.data;
                //alert(JSON.stringify(response.data))
            })
        }
        check();

        //Strat Get Service List Function Code

        function service() {
            var httpRespose = $http.get("http://gym.excellencea.com/api/service");
            httpRespose.then(function (response) {
                //alert(JSON.stringify(response.data));
                $scope.service = response.data;
            });
        }
        service();

        //End Get Service List Function Code

        //Strat Get Package List Function Code

        function Package() {
            var httpRespose = $http.get("http://gym.excellencea.com/api/package");
            httpRespose.then(function (response) {
                //alert(JSON.stringify(response.data));
                $scope.package = response.data;

            });
        }

        Package();

        //End Get Package List Function Code  





        //Start Get ClickedRow Code 

        $scope.selectedRow = 0;
        $scope.setClickedRow = function (row) {
            $scope.selectedRow = row - 1;
            console.log(row.fn);

        }

        //End Get ClickedRow Code 

        //Start Submit Aproval  Code 

        $scope.aproveservice = function (mem) {

            var Aproval = $("#Aproval Option:selected").text();

            $http({
                url: "http://gym.excellencea.com/api/Service/update",
                method: "POST",
                params: {
                    "id": document.getElementById("ID").value,
                    "status": Aproval,
                    "aprovalby": $scope.LoginName,
                    "aprovaldate": $scope.day1,
                    "comment": document.getElementById("Aprovalpackcomment").value
                }
            }).then(function (response) {
                //alert(JSON.stringify(id))

                service();
                alert("Selected Service Successfully Aproved");
                window.location.reload();

            })
        }

        $scope.Delete = function (DELID) {
            $scope.Delid = DELID;
            if (confirm("Are You Sure?") == true) {

                $http({
                    url: "http://gym.excellencea.com/api/Service/disable",
                    method: "POST",
                    params: {
                        "ID": $scope.Delid,
                        "disable": "Lost"


                    }
                }).then(function (response) {
                    alert("Successfully Delete Service");
                    location.reload();
                })

            }
            else {

            }
        }
    };

    $scope.init();
});
