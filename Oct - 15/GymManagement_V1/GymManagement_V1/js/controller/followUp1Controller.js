'use strict';
gymManagementApp.controller('followUp1Controller', function ($scope, $state, $http, $rootScope, $location, Idle, $route, exDialog, commonService, $localStorage, userSessionService) {


    //<!-------------------------------------------------------- Start of Enqury  ------------------------------------------------------------------------------------------
    //@Package     :- EnquiryController.js
    //@Sub-Package :- Enquiry.html
    //@Category    :- Controller
    //@Link        :- /index.html#/dashboard/Enquiry
    //@Since       :-
    //@Filesource  :- \\datacentre\Master\Development\Sham Patil\Gym Managment\Development\16-june-2016\GymManagement_V1\GymManagement_V1\js\controller\EnquiryController.js
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
    $scope.init();
    $scope.init = function () {
        Idle.watch();
        $location.path('/dashboard/followUp1');

        $scope.Press = 0;
        $scope.Statuses = [
   { ServiceID: 1, Status: 'Lost' },
   { ServiceID: 2, Status: 'Enrolled' },
   { ServiceID: 3, Status: 'Pending' }
        ];
        $scope.LostReasons = [
                            { ServiceID: 1, Reason: 'High Cost' },
                            { ServiceID: 2, Reason: 'No Apropriate Equipment' },
                            { ServiceID: 3, Reason: 'No Yoga' },
                            { ServiceID: 4, Reason: 'No Trainers' },
                            { ServiceID: 5, Reason: 'Trainers Availability' },
                            { ServiceID: 6, Reason: 'Spa Not Availabil' },
                            { ServiceID: 7, Reason: 'Steam Bath Not Availabil' },
                             { ServiceID: 8, Reason: 'Swimming Pool Not Availabil' },
                             { ServiceID: 9, Reason: 'Trial Room Availabil' },
                            ];

        $scope.FollowUpBy = "sham";

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


        // Get Enquiry Records
        //$http.get("http://gym.excellencea.com/api/enquiry")
        //.then(function (response)
        //{
        //    $scope.Enqueries = response.data;
        //});





        $scope.GMSFollowups = [];
        $http({ method: "GET", url: "http://gym.excellencea.com/api/enquiry" })
        .success(function (result) {
            $scope.Enqueries = result;
                $scope.GMSFollowups = [];
                for (var i = 0; i < $scope.Enqueries.length; i++)
                {
                    if ($scope.Enqueries[i]["Status"] != "Admitted")
                    {
                      //  alert($scope.Enqueries[i]["Status"]);
                        $scope.GMSFollowups.push({
                            InquiryID: $scope.Enqueries[i]["InquiryID"],
                            Fname: $scope.Enqueries[i]["Fname"],
                            Mname: $scope.Enqueries[i]["Mname"],
                            Lname: $scope.Enqueries[i]["Lname"],
                            BirthDate: $scope.Enqueries[i]["BirthDate"],
                            Email: $scope.Enqueries[i]["Email"],
                            MobileNumber: $scope.Enqueries[i]["MobileNumber"],
                            Gender: $scope.Enqueries[i]["Gender"],
                            MarritalStatus: $scope.Enqueries[i]["MarritalStatus"],
                            Address: $scope.Enqueries[i]["Address"],
                            City: $scope.Enqueries[i]["City"],
                            State: $scope.Enqueries[i]["State"],
                            SourceOfInquiry: $scope.Enqueries[i]["SourceOfInquiry"],
                            InterestedDays: $scope.Enqueries[i]["InterestedDays"],
                            InterestedServices: $scope.Enqueries[i]["InterestedServices"],
                            Comment: $scope.Enqueries[i]["Comment"],
                            Pincode: $scope.Enqueries[i]["Pincode"],
                            Status: $scope.Enqueries[i]["Status"],
                        })
                    }
                }
             })
        .error(function (result) {
            if (!alert('Packages Detail Loading Failed..!')) {
                window.location.reload();
            }
        });

        // Enquiry Status
        $scope.services = [
            { ServiceID: 1, ServiceName: 'Enrolled' },
            { ServiceID: 2, ServiceName: 'Pending' },
            { ServiceID: 3, ServiceName: 'Lost' }
        ];


        $scope.selectedRow = 0;
    
        //Selecting the Record from search table
        $scope.setClickedRow = function (InquiryID,Fname,Mname,Lname,BirthDate,Email,MobileNumber,Gender,MarritalStatus,Address,City,Pincode,State,SourceOfInquiry,InterestedDays,InterestedServices,EnquiryDate,BranchName,Comment) {
         //   $scope.selectedRow = index;
            $scope.InquiryID=InquiryID,
            $scope.Fname=Fname,
            $scope.Mname=Mname,
            $scope.Lname=Lname,
            $scope.BirthDate=BirthDate,
            $scope.Email=Email,
            $scope.MobileNumber=MobileNumber,
            $scope.Gender=Gender,
            $scope.MarritalStatus=MarritalStatus,
            $scope.Address=Address,
            $scope.City=City,
            $scope.Pincode=Pincode,
            $scope.State=State,
            $scope.SourceOfInquiry=SourceOfInquiry,
            $scope.InterestedDays=InterestedDays,
            $scope.InterestedServices=InterestedServices,
            $scope.EnquiryDate=EnquiryDate,
            $scope.BranchName=BranchName,
            $scope.Comment = Comment
        };



        $scope.addfollowup = function () {
            $scope.Press = 1;
            $scope.ReasonforLost = '';

            if (document.getElementById("SelectedStatus").value == 'string:Lost')
            {
                $scope.ReasonforLost = document.getElementById("SelectedLostReason").value;
            }
            else
            {
                $scope.ReasonforLost = 'N\A';
            }

            $.ajax({
                async: true,
                crossDomain: true,
                url: "http://gym.excellencea.com/api/followup",
                method: "POST",
                data:
                {
                    "EnquiryID": $scope.InquiryID,
                    "GYMID": $scope.GYMID,
                    "BranchId": $scope.BranchId,
                    "FollowUpBy": $scope.FollowUpBy,
                    "FollowUpDate": $scope.day1,
                    "FollowUpStatus": document.getElementById("SelectedStatus").value,
                    "FollowUpRemarks": document.getElementById("comment").value,
                    "LostReason": $scope.ReasonforLost,
                },
                success: function (data) {

                    //  alert('Your Followup Added');

                    if (!alert('Your Followup Added..!')) { window.location.reload(); }
                }
            });
        }

    }

    



});

