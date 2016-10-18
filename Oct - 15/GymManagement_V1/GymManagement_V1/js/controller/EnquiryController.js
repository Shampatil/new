'use strict';
gymManagementApp.controller('EnquiryController', function ($scope, $state, $http, $rootScope, $location, Idle, $route, exDialog, commonService, $localStorage, userSessionService) {
    $scope.init();

//<!-------------------------------------------------------- Start of Enqury  ------------------------------------------------------------------------------------------
    //@Package     :- EnquiryController.js
    //@Sub-Package :- Enquiry.html
    //@Category    :- Controller
    //@Link        :- /index.html#/dashboard/Enquiry
    //@Since       :-
    //@Filesource  :- \\datacentre\Master\Development\Sham Patil\Gym Managment\Development\16-june-2016\GymManagement_V1\GymManagement_V1\js\controller\EnquiryController.js
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------->

    $scope.init = function () {
        Idle.watch();
        $location.path('/dashboard/Enquiry');
        $scope.press = 0;
        // Enquiry Source Array
        $scope.EnquirySource = ['Web Site', 'Gym Visit', 'Phone Call', 'Advertise', 'Refferal'];
        // Marrital Status Array
        $scope.MarritalStatus = ['Single','Married', 'Widower', 'Widow', 'Divorced'];
        // Gender Array
        $scope.Gender = ['Male', 'Female', 'Other'];
        // Interested Services Array
        $scope.InterestedServices = ['Fitness', 'Personal  Training', 'Aerobics', 'Zumba', 'Steam', 'Outdoor Activities'];
        // Days Array
        $scope.Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        // Days Array
        $scope.SelectBranch = ['Shivaji Nagar', 'Kalewadi', 'Aundh', 'Baner', 'Sangvi', 'Chinchwad', 'Fc Road'];
        // States Array
        $scope.states = [
        'Maharashtra',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chhattisgarh',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jammu & Kashmir',
        'Jharkhand',
        'Karnataka',
        ' Kerala',
        ' Madhya Pradesh',
        ' Andhra Pradesh ',
        ' Manipur',
        ' Meghalaya',
        ' Mizoram',
        ' Nagaland',
        ' Odisha (Orissa)',
        ' Punjab',
        ' Rajasthan',
        ' Sikkim',
        ' Tamil Nadu',
        ' Telangana',
        ' Tripura',
        ' Uttar Pradesh',
        ' Uttarakhand',
        ' West Bengal',
        'Andaman and Nicobar',
        ' Chandigarh',
        ' Dadra and Nagar Haveli',
        ' Daman and Diu',
        ' Lakshadweep',
        'Delhi – National Capital Territory',
        ' Puducherry (Pondicherry)'
        ]
    };

    $('#birthday').Zebra_DatePicker({
        view: 'year'
    });



    // Birthdate Picker
    $('#datepicker-example10').Zebra_DatePicker(
        {
            view: 'years',
            format: 'M d, Y',
            direction: [-1, 40000]

        });


    //Initialized Variables
    
    $scope.submitForm = function () {
        $scope.press = 1;
        // Parameters passing for Web Service
        // Birth date 
        var dd = document.getElementById("datepicker-example10").value;
        // selected inquiry source
        var enq_selectedinquirysource = $("#enquirysource Option:selected").text();
        // selected gender
        var enq_selectedgender = $("#gender Option:selected").text();
        // selected marrital status
        var enq_selectedmarritalstatus = $("#marritalstatus Option:selected").text();
        // Selected Services
        var enq_selectedservices = $("#interested_services Option:selected").text();
        // Selected Days
        var enq_selecteddays = $("#interested_days Option:selected").text();
        // first name
        var enq_firstname = $scope.Fname;
        // Middle name
        var enq_middlename = $scope.Mname;
        // Last name
        var enq_lastname = $scope.Lname;
        // Birth Date
        var enq_birthdate = dd;
        // Email Id
        var enq_emailid = $scope.Email;
        // Mobile Number
        var enq_mobilenumber = $scope.Mobile;
        // Address
        var enq_address = $scope.Address;
        // city
        var enq_city = $scope.City;
        // State
        var enq_state = $("#select_states Option:selected").text();
        // Pin
        var enq_pin = $scope.PinCode;
        // Comment
        var enq_comment = document.getElementById("comment").value;
        // Branch Name
        var enq_Branch = $("#interested_branch Option:selected").text();


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

        //alert("interested_services     :" + enq_selectedservices);
        //alert("Selected days     :" + enq_selecteddays);
        //alert("date   :" + dd);


        ////// Posting Data through Web Service /////////////
           var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://gym.excellencea.com/api/enquiry",
            "method": "POST",
            "data":
                {
                "Fname": enq_firstname,
                "Mname": enq_middlename,
                "Lname": enq_lastname,
                "BirthDate": dd,
                "Email": enq_emailid,
                "MobileNumber": enq_mobilenumber,
                "Gender": enq_selectedgender,
                "MarritalStatus": enq_selectedmarritalstatus,
                "Address": enq_address,
                "City": enq_city,
                "Pincode": enq_pin,
                "State": enq_state,
                "SourceOfInquiry": enq_selectedinquirysource,
                "InterestedDays": enq_selecteddays,
                "InterestedServices": enq_selectedservices,
                "Comment": enq_comment,
                "BranchName": enq_Branch,
                "EnquiryDate": $scope.startingdate1,
                "Status":"Pending"
                }
        /////////////////////////////////////////////////////
        }
        $.ajax(settings).done(function (response) {
            console.log(response);

            alert("“Thank You…, We will contact you soon…!!!”");
            window.location.href = "index.html#/dashboard/home";

        });

       // $("#Reset").click()
        /////////////////////////////////////////////////////////////////////////////////////////////////////
    }
});




