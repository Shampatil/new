'use strict';

gymManagementApp.controller('patientSearchController', function ($scope, $http, $localStorage, $location, $rootScope, $filter, DTOptionsBuilder, DTColumnDefBuilder, exDialog, visitNotesService, accessControlService, Idle, commonService, userSessionService) {

    var loggedInUserDetailsCookie;
    var history = null;

    $scope.init = function () {
        Idle.watch();
        localStorage.setItem('visitingDetailId', null);
        localStorage.setItem('patientId', null);
        $rootScope.displayTitle = false;
        if (!userSessionService.ValidateLoggedInUserSession()) {
            return;
        }

        loggedInUserDetailsCookie = userSessionService.LoggedInUserDetails;

        //Set tab on refresh
        $scope.states.activeItem = 2;
        $location.path('/dashboard/patientSearch');
        $scope.doctorId = loggedInUserDetailsCookie.UserId;
        $scope.loggedInUserId = loggedInUserDetailsCookie.UserId;
        DoctorInfo(loggedInUserDetailsCookie.UserId);        

        $rootScope.loading = true;
        accessControlService.CanUserAccessLink(loggedInUserDetailsCookie.RoleId, "Patient Summary", function (data) {
            $scope.IsPatientSummaryVisible = data;
            $rootScope.loading = false;
        });
    }

    $scope.newData = [];
    $scope.searchResult = false;
    $scope.alertError = false;
    $scope.IsVisitHistoryPage = true;
    $rootScope.visitingDetailId = "";
    $scope.init();
    $scope.PatientSearch = [];
    $scope.currentPage = 0;
    $scope.selectedPage = 1;
    $scope.currentPaginationIndex = 0;
    $scope.searchPagination = null;
    $scope.currentSearchVisitNumber = 0;
    $scope.VisitHistoryRowCss = [];

    $(document).unbind('keydown').bind('keydown', function (event) {
        var doPrevent = false;
        if ($('#myModal').is(':visible') && event.keyCode === 8) {
            var d = event.srcElement || event.target;
            if ((d.tagName.toUpperCase() === 'INPUT' &&
                 (
                     d.type.toUpperCase() === 'TEXT' ||
                     d.type.toUpperCase() === 'PASSWORD' ||
                     d.type.toUpperCase() === 'FILE' ||
                     d.type.toUpperCase() === 'SEARCH' ||
                     d.type.toUpperCase() === 'EMAIL' ||
                     d.type.toUpperCase() === 'NUMBER' ||
                     d.type.toUpperCase() === 'DATE')
                 ) ||
                 d.tagName.toUpperCase() === 'TEXTAREA') {
                doPrevent = d.readOnly || d.disabled;
            }
            else {
                doPrevent = true;
            }
        }
        if (doPrevent) {
            event.preventDefault();

        }
    });

    $scope.$on('$locationChangeStart', function (event, next, current) {
        if ($('#myModal').is(':visible')) {
            event.preventDefault();
        }
        if ($('#ui-datepicker-div').is(':visible')) {
            $('#ui-datepicker-div').hide();
        }
    });

    $http.post('PracticeManagement.Services/api/PatientVisit/SpecialityList')
         .then(function successCallback(response) {
             $scope.SpecialityList = response.data;
             $rootScope.loading = false;
             $('#Speciality').typeahead({
                 source: $scope.SpecialityList,
                 display: 'SpecialityName',
             });

         }, function errorCallback(response) {
             $rootScope.loading = false;
             ShowError("Exception occurred while getting specialities.");
         });

    $scope.Search = function () {
        $scope.Patients = null;
        $scope.PatientsFiltered = null;
        $scope.searchPagination = null;
        $scope.currentPaginationIndex = 0;
        $scope.currentSearchVisitNumber = 0;

        if ($scope.newData == undefined) {
            setErrorMessage(true, "Please enter Patient Name or UHID.");
            $scope.searchResult = false;
            return;
        }
        else {
            if (($scope.newData.Name == "" || $scope.newData.Name == undefined) && ($scope.newData.UHID == "" || $scope.newData.UHID == undefined)) {
                setErrorMessage(true, "Please enter Patient Name or UHID.");
                $scope.searchResult = false;
                return;
            }
        }
        var data = JSON.stringify({
            "PatientName": $scope.newData.Name,
            "UHID": $scope.newData.UHID,
            "IsAdvancedSearch": false,
            "DoctorId": $scope.doctorId

        });

        SearchPatients(data);
        $rootScope.loading = true;
    };


    function DoctorInfo(userId) {
        if (commonService.userDetail == null || commonService.userDetail.length == 0) {
            $scope.loading = true;
            commonService.GetUserDetails(userId, function (data) {
                if (data != undefined) {
                    $scope.DoctorInfo = data;
                }
                $scope.loading = true;
            });
        }
        //var data = JSON.stringify({
        //    "UsersId": userId,
        //});

        //$http.post('PracticeManagement.Services/api/UserInfo/UserInfo', data)
        //    .then(function successCallback(response) {
        //        if (response.data != undefined) {
        //            $scope.DoctorInfo = response.data;
        //        }
        //    }, function errorCallback(response) {
        //        exDialog.openMessage($scope, "Error occured while fetching records.", "Clinical Document", "error");
        //    });
    }

    function SearchPatients(data) {

        $http.post('PracticeManagement.Services/api/PatientInfo/SearchPatientList', data)
            .then(function successCallback(response) {
                $rootScope.loading = false;
                if (response.data != undefined && response.data.length > 0) {
                    $scope.Patients = null;
                    $scope.PatientsFiltered = null;
                    $scope.searchPagination = null;
                    $scope.searchResult = true;
                    $scope.alertError = false;
                    $scope.Patients = response.data;
                    $scope.PatientsFiltered = chunk(response.data, 8);
                    $scope.searchPagination = chunk($scope.range($scope.PatientsFiltered.length), 10);
                    $scope.currentPaginationIndex = 0;
                    $scope.ShowSummary(0, $scope.PatientsFiltered[0][0].PatientId, true);
                    $scope.currentPage = 0;
                    $scope.selectedPage = 1;
                    $scope.apply;
                }
                else {
                    setErrorMessage(true, "No Records Found.");
                    $scope.searchResult = false;
                    $scope.Patients = null;
                    $scope.PatientsFiltered = null;
                    $scope.searchPagination = null;
                    $scope.currentPaginationIndex = 0;
                }
            }, function errorCallback(response) {
                $rootScope.loading = false;
                exDialog.openMessage($scope, "Error occured while fetching records.", "Patient Search", "error");
            });
    }

    $scope.IsNumber = function (item) {
        $scope.alertError = false;
        if (!isFinite(item.MobileNumber)) {// when not a number set it to empty.
            $scope.alertErrorNumber = true;
            item.MobileNumber = null;
        }
    }

    $scope.ClearFromToDate = function (item, isVisitDate) {
        $scope.alertError = false;
        if (isVisitDate) {
            item.FromDate = null;
            item.ToDate = null;
        }
        else
            item.DateVisited = null;
    }

    $scope.GetPatientList = function (filter, resetSearch) {
        $scope.searchResult = false;
        $scope.alertError = false;

        if (resetSearch) {
            $scope.newData.Name = $scope.PatientSearch.PatientName;
            $scope.newData.UHID = $scope.PatientSearch.UHID;
            $('#patientToDate').datepicker("option", "minDate", null);
            $scope.PatientSearch = [];
            return false;
        }

        $scope.Patients = null;
        $scope.PatientsFiltered = null;
        $scope.searchPagination = null;
        $scope.currentPaginationIndex = 0;
        $scope.currentSearchVisitNumber = 0;

        if (!filter) {
            clearAdvanceSearchResult();
            setErrorMessage(true, "Please enter or select at least one criteria in order to search.");
            return;
        }
        else {
            if (isNullEmptyOrUndefined(filter.PatientName) && isNullEmptyOrUndefined(filter.UHID) && isNullEmptyOrUndefined(filter.VisitNumber) &&
                isNullEmptyOrUndefined(filter.MobileNumber) && isNullEmptyOrUndefined(filter.SpecialityName) && isNullEmptyOrUndefined(filter.TreatingDoctor) &&
                isNullEmptyOrUndefined(filter.FromDate) && isNullEmptyOrUndefined(filter.ToDate)) {
                clearAdvanceSearchResult();
                setErrorMessage(true, "Please enter or select at least one criteria in order to search.");
                return;
            }
        }

        var isVisitNumber = filter.VisitNumber ? true : false;
        filter.VisitNumber = !filter.VisitNumber || filter.VisitNumber == undefined ? 0 : filter.VisitNumber;
        $scope.currentSearchVisitNumber = filter.VisitNumber;

        filter.FromDate = filter.FromDate ? setDate(filter.FromDate) : null;
        filter.ToDate = filter.ToDate ? setDate(filter.ToDate) : null;
        filter.ToDate ? filter.ToDate.setHours('23', '59', 0, 0) : null;
        if (filter.FromDate && filter.ToDate && filter.FromDate > filter.ToDate) {
            setErrorMessage(true, "From Date should not be greater than To Date.");
            filter.FromDate = filter.FromDate ? $filter('date')(filter.FromDate, "dd/MM/yyyy") : null;
            filter.ToDate = filter.ToDate ? $filter('date')(filter.ToDate, "dd/MM/yyyy") : null;
            return;
        }

        filter.IsAdvancedSearch = true;

        var item = {
            VisitNumber: filter.VisitNumber,
            FromDate: filter.FromDate,
            ToDate: filter.ToDate,
            DoctorName: filter.TreatingDoctor,
            Speciality: filter.SpecialityName,
            PatientName: filter.PatientName,
            UHID: filter.UHID,
            MobileNumber: filter.MobileNumber,
            IsAdvancedSearch: true,
            DoctorId: $scope.doctorId

        };

        var data = JSON.stringify(item);

        filter.FromDate = filter.FromDate ? $filter('date')(filter.FromDate, "dd/MM/yyyy") : null;
        filter.ToDate = filter.ToDate ? $filter('date')(filter.ToDate, "dd/MM/yyyy") : null;
        filter.DateVisited = filter.DateVisited ? $filter('date')(filter.DateVisited, "dd/MM/yyyy") : null;
        filter.VisitNumber = isVisitNumber ? filter.VisitNumber : "";

        SearchPatients(data);
    }

    $scope.ClearRecords = function () {
        $scope.newData = {};
        $scope.alertError = false;
    };

    function clearAdvanceSearchResult() {
        $scope.Patients = null;
        $scope.PatientsFiltered = null;
        $scope.searchPagination = null;
        $scope.currentPaginationIndex = 0;
    }

    $scope.AdvanceSearch = function () {
        $scope.newData = {};
        $scope.Patients = null;
        $scope.PatientsFiltered = null;
        $scope.searchResult = false;
        $scope.alertError = false;
    };
    $scope.showAdvanceSearch = function () {
        $scope.newData.showAdvanceSearch = true;
        $scope.PatientSearch.PatientName = $scope.newData.Name;
        $scope.PatientSearch.UHID = $scope.newData.UHID;
        $scope.alertError = false;        
        if (!$scope.PatientSearch.SpecialityName) {
            $scope.PatientSearch.SpecialityName = loggedInUserDetailsCookie.Speciality;
        }
        if (!$scope.PatientSearch.TreatingDoctor) {
            $scope.PatientSearch.TreatingDoctor = $scope.DoctorInfo.DoctorName;
        }
    };
    $scope.hideAdvanceSearch = function () {
        $scope.newData.showAdvanceSearch = false;
        $scope.newData.Name = $scope.PatientSearch.PatientName;
        $scope.newData.UHID = $scope.PatientSearch.UHID;
        $scope.PatientSearch = [];
        $scope.alertError = false;
    };

    $scope.tableRowExpanded = false;
    $scope.tableRowIndexExpandedCurr = "";
    $scope.tableRowIndexExpandedPrev = "";
    $scope.patientIdExpanded = "";

    $scope.ShowSummary = function (index, PatientId, defaultExpand) {

        var data = JSON.stringify({
            "PatientId": PatientId
        });

        $http.post('PracticeManagement.Services/api/PatientVisit/ShowPatientVisit', data)
           .then(function successCallback(response) {
               if (typeof $scope.VisitHistoryCollapse === 'undefined') {
                   $scope.createVisitHistoryCollapse();
               }

               if ($scope.tableRowExpanded === false && $scope.tableRowIndexExpandedCurr === "" && $scope.patientIdExpanded === "") {
                   $scope.tableRowIndexExpandedPrev = "";
                   $scope.tableRowExpanded = true;
                   $scope.tableRowIndexExpandedCurr = index;
                   $scope.patientIdExpanded = PatientId;
                   $scope.VisitHistoryCollapse[index] = true;
                   $scope.VisitHistoryRowCss[index] = "trFirstExpanded";
               } else if ($scope.tableRowExpanded === true) {
                   if ($scope.tableRowIndexExpandedCurr === index && $scope.patientIdExpanded === PatientId && !defaultExpand) {
                       $scope.tableRowExpanded = false;
                       $scope.tableRowIndexExpandedCurr = "";
                       $scope.patientIdExpanded = "";
                       $scope.VisitHistoryCollapse[index] = false;
                       $scope.VisitHistoryRowCss[index] = "";
                   } else {
                       $scope.tableRowIndexExpandedPrev = $scope.tableRowIndexExpandedCurr;
                       $scope.tableRowIndexExpandedCurr = index;
                       $scope.patientIdExpanded = PatientId;
                       $scope.VisitHistoryCollapse[$scope.tableRowIndexExpandedPrev] = false;
                       $scope.VisitHistoryCollapse[$scope.tableRowIndexExpandedCurr] = true;
                       $scope.VisitHistoryRowCss[$scope.tableRowIndexExpandedPrev] = "";
                       $scope.VisitHistoryRowCss[$scope.tableRowIndexExpandedCurr] = "trFirstExpanded";
                   }
               }

               if (response.data != undefined) {
                   $scope.patientVisitHistory = response.data;
               }
               $rootScope.loading = false;
           }, function errorCallback(response) {
               $rootScope.loading = false;
               exDialog.openMessage($scope, "Error occured while fetching records.", "Patient Search", "error");
           });
    };


    $scope.createVisitHistoryCollapse = function () {
        $scope.VisitHistoryCollapse = [];
        $scope.VisitHistoryRowCss = [];
        for (var i = 0; i < $scope.Patients.length; i += 1) {
            $scope.VisitHistoryCollapse.push(false);
            $scope.VisitHistoryRowCss.push("");
        }
    };

    $scope.getSearchSeletionClass = function (VisitNumber) {
        var rowCss = ""
        if ($scope.currentSearchVisitNumber != 0 && $scope.currentSearchVisitNumber == VisitNumber) {
            rowCss = "selectedRow";
        }
        return rowCss;
    }

    $scope.ImageForPreview = null;
    $scope.PreviewImage = function (data) {
        $scope.ImageForPreview = data;
    }

    $scope.ShowPatientVisit = function (visitDetailId, patientID, SpecialityName) {

        if (SpecialityName != undefined || SpecialityName != null) {
            if (SpecialityName.indexOf("OBSTETRIC") > -1) {
                $scope.DoctorsSpeciality = 1;
            }
            else if (SpecialityName.indexOf("PEDIATRIC") > -1) {
                $scope.DoctorsSpeciality = 2;
            }
            else {
                $scope.DoctorsSpeciality = 3;
            }
        }
        
        var patientInfo = $filter('filter')($scope.patientVisitHistory, { VisitingDetailId: visitDetailId }, true)[0];
        $scope.IsTreatingDr = patientInfo.DoctorId == loggedInUserDetailsCookie.UserId;

        $rootScope.loading = true;
        var visitingDetailId = visitDetailId;
        $scope.VisitingDetailId = visitingDetailId;
        var patientId = patientID

        $scope.VisitingDetailId = visitingDetailId;
        $scope.ImageForPreview = null;

        var SuccessMethod = function (data) {
            $scope.VisitingDetails = data;
        }

        visitNotesService.ShowVisitedPatient(patientId, visitingDetailId, $scope.Patients, $scope.DoctorsSpeciality, $scope.patientVisitHistory, SuccessMethod);


        var data = JSON.stringify({
            "VisitingDetailId": visitingDetailId,
            "PatientId": patientId,
            "IsCurrentVisit": false
        });
        debugger;
        $rootScope.loading = true;
        $http.post('PracticeManagement.Services/api/PatientInfo/ListPatientDetails', data)
           .then(function successCallback(response) {
               $rootScope.loading = false;
               if (response.data != undefined) {
                   $scope.PatientSummary = response.data;
               }
           }, function errorCallback(response) {
               $rootScope.loading = false;
               exDialog.openMessage($scope, "Error occured while fetching records.", "Patient Search", "error");
           });

        $scope.VisitHealthParams = null;
        $rootScope.loading = true;
        var config = {
            method: 'GET',
            url: 'PracticeManagement.Services/api/VitalParameters/GetHealthParametersByVisit',
            params: { visitGuid: visitingDetailId }
        };

        $http(config).success(function (data, status, headers, config) {
            $scope.VisitHealthParams = data;
            $rootScope.loading = false;

        }).error(function (data, status, headers, config) {
            $rootScope.loading = false;
            setErrorMessage("Exception occoured while loading vital parameters for visit.", true)
        });

        $('#myModal').modal('show')
    };

    function chunk(arr, size) {
        var newArr = [];
        for (var i = 0; i < arr.length; i += size) {
            newArr.push(arr.slice(i, i + size));
        }

        return newArr;
    }

    $scope.setPage = function () {
        $scope.currentPage = this.n - 1;
        $scope.selectedPage = this.n ;
        $scope.createVisitHistoryCollapse();
    };

    $scope.firstPage = function () {
        $scope.currentPaginationIndex = $scope.currentPaginationIndex - 1;
        if ($scope.currentPaginationIndex < 0) {
            $scope.currentPaginationIndex = 0;
        }
    };

    $scope.lastPage = function () {
        $scope.currentPaginationIndex = $scope.currentPaginationIndex + 1;
        if ($scope.searchPagination == null) {
            $scope.currentPaginationIndex = 0;
        } else if ($scope.currentPaginationIndex > $scope.searchPagination.length - 1) {
            $scope.currentPaginationIndex = $scope.searchPagination.length - 1;
        }
    };

    $scope.range = function (input, total) {
        var ret = [];
        if (!total) {
            total = input;
            input = 1;
        }
        for (var i = input; i <= total; i++) {
            ret.push(i);
        }
        return ret;
    };

    $scope.sort = function (sortBy) {
        $scope.Header = [];
        $scope.columnToOrder = sortBy;

        $scope.Patients = $filter('orderBy')($scope.Patients, $scope.columnToOrder, $scope.reverse);
        $scope.PatientsFiltered = chunk($scope.Patients, 8);
        var iconName;
        if ($scope.reverse)
            iconName = 'glyphicon glyphicon-sort-by-attributes-alt';
        else
            iconName = 'glyphicon glyphicon-sort-by-attributes';

        if (sortBy === 'PatientName') {
            $scope.Header[0] = iconName;
        }
        else if (sortBy === 'UHID') {
            $scope.Header[1] = iconName;
        } else if (sortBy === 'DOB') {
            $scope.Header[2] = iconName;
        } else {
            $scope.Header[3] = iconName;
        }

        $scope.reverse = !$scope.reverse;
        $scope.createVisitHistoryCollapse();
    };

    $scope.redirectToPatientSummary = function (patientId) {
        localStorage.setItem('patientId', patientId);
        localStorage.setItem('IsVisited', true);
        $location.path('/dashboard/patientInfo/PatientSummary');
    }

    function isNullEmptyOrUndefined(str) {
        if (str == null || str == undefined || $.trim(str) == "") {
            return true;
        } else {
            return false;
        }
    }

    function setErrorMessage(isVisible, message) {
        $scope.alertError = isVisible;
        $scope.errorMessage = message;
    }

    $scope.UpdateReviewNotes = function (ReviewEdit, patientDetail) {

        if (patientDetail.ReviewNotes == null || patientDetail.ReviewNotes == undefined) {
            patientDetail.ReviewNotes = "";
        }

        var config = {
            method: 'POST',
            url: 'PracticeManagement.Services/api/ClinicalDocument/ReviewNotesUpdate',
            params: { visitGuid: patientDetail.VisitingDetailId, reviewNotes: patientDetail.ReviewNotes }

        };

        $http(config).success(function (data, status, headers, config) {
            $scope.ReviewEdit = false;
            if (data) {
                exDialog.openMessage($scope, "Review Notes Updated successfully.");
            }
            else {
                exDialog.openMessage($scope, "Failed to update review notes.", "Clinical Documentation", "error");
            }
        }).error(function (data, status, headers, config) {
            $rootScope.loading = false;
            exDialog.openMessage($scope, "Error occured while updating review notes.", "Clinical Documentation", "error");
        });

    };

});
