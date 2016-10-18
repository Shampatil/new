gymManagementApp.factory('visitNotesService', function ($filter, $http, exDialog) {//($filter, $http, $scope, exDialog) {
    
    
    var patientInfo = null;
    var history = null;

    var VisitingDetails = {};

    return {
        ShowVisitedPatient: function (patientId, visitingDetailId, PatientScheduleList, DoctorsSpeciality, PatientVisitHistory, SuccessMethod) {
            
            VisitingDetails = {};
            patientInfo = null;
            history = null;
                 
            if (PatientScheduleList)
            patientInfo = $filter('filter')(PatientScheduleList, { VisitingDetailId: visitingDetailId }, true)[0];
            if (PatientVisitHistory != null) {
                history = $filter('filter')(PatientVisitHistory, { VisitingDetailId: visitingDetailId }, true)[0];
            }

            if (DoctorsSpeciality == 1) {
                //$scope.loading = true;     
                GetObstericDetails(patientId, visitingDetailId, SuccessMethod);
            }
            else if (DoctorsSpeciality == 2) {
                //$scope.loading = true;
                GetPediatricDetails(patientId, visitingDetailId, SuccessMethod);
            }
            else {
                //$scope.loading = true;
                GetVsisitDetails(patientId, visitingDetailId, SuccessMethod);
            }

            return true;
        },
    };

    function getFormatedTime(timeStr) {
        var time = null;
        if (timeStr) {
            var date = new Date();
            var timeParts = timeStr.split(":");
            date.setHours(timeParts[0], timeParts[1], 0, 0);
            time = $filter('date')(date, "hh:mm a");
        }
        return time;
    }

    function GetVsisitDetails(patientId, visitingDetailId, SuccessMethod) {
        var config = {
            method: 'GET',
            url: 'PracticeManagement.Services/api/ClinicalDocument/GetVisitById',
            params: { visitGuid: visitingDetailId,flag:false }
        };
                
        $http(config).success(function (data, status, headers, config) {
            VisitingDetails = data;
            if (VisitingDetails.OpFollowupTime != null)
                VisitingDetails.OpFollowupTime = getFormatedTime(VisitingDetails.OpFollowupTime);

            if (VisitingDetails.AdmissionTime != null)
                VisitingDetails.AdmissionTime = getFormatedTime(VisitingDetails.AdmissionTime);

            if (VisitingDetails.SurgeryTime != null)
                VisitingDetails.SurgeryTime = getFormatedTime(VisitingDetails.SurgeryTime);


            if (patientInfo) {
            VisitingDetails.PatientInfo = patientInfo;
            }            
            else if (history != null) {
                VisitingDetails.PatientInfo = history;                
            }

            var followup = $filter('filter')(VisitingDetails.FollowUp, { FollowupId: VisitingDetails.FollowupId }, true)[0];
            if (followup) {
                VisitingDetails.FollowupName = followup.Name;
            }
            SuccessMethod(VisitingDetails);
            return true;
            //$scope.loading = false;
        });
    }

    function GetObstericDetails(patientId, visitingDetailId, SuccessMethod) {
        //$scope.loading = true;
        var config = {
            method: 'GET',
            url: 'PracticeManagement.Services/api/ClinicalDocument/GetObstetricVisitById',
            params: { visitGuid: visitingDetailId,flag:false }
        };

        $http(config).success(function (data, status, headers, config) {
            VisitingDetails = data;
            if (patientInfo) {
            VisitingDetails.PatientInfo = patientInfo;
            }
            else if (history != null) {
                VisitingDetails.PatientInfo = history;                
            }

            var selectedPsycologicalStatus = [];
            VisitingDetails.PastObjstetricHistoryNo = "New";
            //VisitingDetails.UserId = loggedInUseretailsCookie.UserId;
            GetObstetricPastHistoryList();
            formatDates();
            if (!isNullEmptyOrUndefined(VisitingDetails.ObstetricVisitingDetail)) {
                if (VisitingDetails.ObstetricVisitingDetail.PsychologicalStatus_Calm)
                    selectedPsycologicalStatus.push({ id: 1 });
                if (VisitingDetails.ObstetricVisitingDetail.PsychologicalStatus_Anxious)
                    selectedPsycologicalStatus.push({ id: 2 });
                if (VisitingDetails.ObstetricVisitingDetail.PsychologicalStatus_Agitated)
                    selectedPsycologicalStatus.push({ id: 3 });
                if (VisitingDetails.ObstetricVisitingDetail.PsychologicalStatus_Depressed)
                    selectedPsycologicalStatus.push({ id: 4 });
            }
            VisitingDetails.SelectedPsycologicalStatus = selectedPsycologicalStatus;
            SuccessMethod(VisitingDetails);
            return true;
            
        }).error(function (data, status, headers, config) {
            //$scope.loading = false;
        });
    }

    function GetPediatricDetails(patientId, visitingDetailId, SuccessMethod) {
        //$scope.loading = true;
        var config = {
            method: 'GET',
            url: 'PracticeManagement.Services/api/ClinicalDocument/GetPediatricVisitById',
            params: { visitGuid: visitingDetailId, flag: false }
        };

        $http(config).success(function (data, status, headers, config) {
            
            VisitingDetails = data;

            if (VisitingDetails.OpFollowupTime != null)
                VisitingDetails.OpFollowupTime = getFormatedTime(VisitingDetails.OpFollowupTime);

            if (VisitingDetails.AdmissionTime != null)
                VisitingDetails.AdmissionTime = getFormatedTime(VisitingDetails.AdmissionTime);

            if (VisitingDetails.SurgeryTime != null)
                VisitingDetails.SurgeryTime = getFormatedTime(VisitingDetails.SurgeryTime);

            if (patientInfo) {
            VisitingDetails.PatientInfo = patientInfo;
            }
            else if (history != null) {
                VisitingDetails.PatientInfo = history;                
            }

            var Siblings = [];
            var siblingsCount;
            if (!isNullEmptyOrUndefined(VisitingDetails.PediatricVisitingDetail)) {
                siblingsCount = VisitingDetails.PediatricVisitingDetail.NumberOfSiblingsWithAge;
            }
            if (siblingsCount != null && siblingsCount.length > 0)
                Siblings = siblingsCount.split(',');
            VisitingDetails.Siblings = Siblings;

            VisitingDetails.Followup_Date = $filter('date')(VisitingDetails.Followup_Date, "dd/MM/yyyy - hh:mm a");


            var followup = $filter('filter')(VisitingDetails.FollowUp, { FollowupId: VisitingDetails.FollowupId }, true)[0];
            if (followup) {
                VisitingDetails.FollowupName = followup.Name;
            }

            GetPastHistoryList();
            
            SuccessMethod(VisitingDetails);

            return true;


        }).error(function (data, status, headers, config) {
            //$scope.loading = false;
        });
    }

    function GetPastHistoryList() {
        var pastMedicalHistory = "";
        var familyHistory = "";
        if (!isNullEmptyOrUndefined(VisitingDetails.PediatricVisitingDetail)) {

        if (VisitingDetails.PediatricVisitingDetail.DiabetesType2) {
            pastMedicalHistory = pastMedicalHistory + "Diabetes Type II, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.DiabetesType1) {
            pastMedicalHistory = pastMedicalHistory + "Diabetes Type I, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.Hypertension) {
            pastMedicalHistory = pastMedicalHistory + "Hypertension, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.Thyroid) {
            pastMedicalHistory = pastMedicalHistory + "Thyroid, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.Migraine) {
            pastMedicalHistory = pastMedicalHistory + "Migraine, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.IschemicHeartDisease) {
            pastMedicalHistory = pastMedicalHistory + "Ischemic Heart Disease, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.Epilepsy) {
            pastMedicalHistory = pastMedicalHistory + "Epilepsy, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.Asthma) {
            pastMedicalHistory = pastMedicalHistory + "Asthma, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.Tuberculosis) {
            pastMedicalHistory = pastMedicalHistory + "Tuberculosis, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.BloodTransfusion) {
            pastMedicalHistory = pastMedicalHistory + "Blood Transfusion, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.Thromboembolism) {
            pastMedicalHistory = pastMedicalHistory + "Thromboembolism, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.PsychiatryProblems) {
            pastMedicalHistory = pastMedicalHistory + "Psychiatry Problems, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.Surgery) {
            pastMedicalHistory = pastMedicalHistory + "Surgery, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.Hypercholestrolemia) {
            pastMedicalHistory = pastMedicalHistory + "Hypercholesterolemia, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.Other) {
            pastMedicalHistory = pastMedicalHistory + "Other, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.HospitalizationInLastThreeMonths) {
            pastMedicalHistory = pastMedicalHistory + "Hospitalization in last 3 Months";
        }

        
        pastMedicalHistory = pastMedicalHistory.replace(/,\s*$/, "");

        VisitingDetails.PediatricVisitingDetail.PastMedicalSurgicalHistory = pastMedicalHistory;


        if (VisitingDetails.PediatricVisitingDetail.Family_DiabetesType2) {
            familyHistory = familyHistory + "Diabetes Type II, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.Family_DiabetesType1) {
            familyHistory = familyHistory + "Diabetes Type I, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.Family_Hypertension) {
            familyHistory = familyHistory + "Hypertension, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.Family_Thyroid) {
            familyHistory = familyHistory + "Thyroid, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.Family_Stroke) {
            familyHistory = familyHistory + "Stroke, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.Tuberculosis) {
            familyHistory = familyHistory + "Tuberculosis, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.Family_Cancers) {
            familyHistory = familyHistory + "Cancers, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.Family_Twins) {
            familyHistory = familyHistory + "Twins, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.Family_Thromboembolism) {
            familyHistory = familyHistory + "Thromboembolism, ";
        }
        if (VisitingDetails.PediatricVisitingDetail.Family_PhysicallyOrMentallyChallenged) {
            familyHistory = familyHistory + "Physically/Mentally Challenged, ";
        }

        
        familyHistory = familyHistory.replace(/,\s*$/, "");

        VisitingDetails.PediatricVisitingDetail.PastFamilyHistory = familyHistory;
        }
    }

    function GetObstetricPastHistoryList() {
        var pastMedicalHistory = "";
        var familyHistory = "";
        if (!isNullEmptyOrUndefined(VisitingDetails.ObstetricVisitingDetail)) {

        if (VisitingDetails.ObstetricVisitingDetail.SurgicalHistory_IsDiabetesType2) {
            pastMedicalHistory = pastMedicalHistory + "Diabetes Type II, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.SurgicalHistory_IsDiabetesType1) {
            pastMedicalHistory = pastMedicalHistory + "Diabetes Type I, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.SurgicalHistory_IsHypertension) {
            pastMedicalHistory = pastMedicalHistory + "Hypertension, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.SurgicalHistory_IsThyroid) {
            pastMedicalHistory = pastMedicalHistory + "Thyroid, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.SurgicalHistory_IsMigraine) {
            pastMedicalHistory = pastMedicalHistory + "Migraine, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.SurgicalHistory_IsIschemicHeartDisease) {
            pastMedicalHistory = pastMedicalHistory + "Ischemic Heart Disease, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.SurgicalHistory_IsEpilepsy) {
            pastMedicalHistory = pastMedicalHistory + "Epilepsy, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.SurgicalHistory_IsAsthma) {
            pastMedicalHistory = pastMedicalHistory + "Asthma, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.SurgicalHistory_IsTuberculosis) {
            pastMedicalHistory = pastMedicalHistory + "Tuberculosis, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.SurgicalHistory_IsBloodTransfusion) {
            pastMedicalHistory = pastMedicalHistory + "Blood Transfusion, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.SurgicalHistory_IsThromboembolism) {
            pastMedicalHistory = pastMedicalHistory + "Thromboembolism, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.SurgicalHistory_IsPsychiatryProblem) {
            pastMedicalHistory = pastMedicalHistory + "Psychiatry Problems, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.SurgicalHistory_IsSurgery) {
            pastMedicalHistory = pastMedicalHistory + "Surgery, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.SurgicalHistory_IsHypercholesterolemia) {
            pastMedicalHistory = pastMedicalHistory + "Hypercholesterolemia, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.SurgicalHistory_IsOther) {
            pastMedicalHistory = pastMedicalHistory + "Other, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.SurgicalHistory_IsHospitalizationInLast3Monts) {
            pastMedicalHistory = pastMedicalHistory + "Hospitalization in last 3 Months";
        }

        pastMedicalHistory = pastMedicalHistory.replace(/,\s*$/, "");

        VisitingDetails.ObstetricVisitingDetail.PastMedicalSurgicalHistory = pastMedicalHistory;


        if (VisitingDetails.ObstetricVisitingDetail.FamilyHistory_IsDiabetesType2) {
            familyHistory = familyHistory + "Diabetes Type II, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.FamilyHistory_IsDiabetesType1) {
            familyHistory = familyHistory + "Diabetes Type I, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.FamilyHistory_IsHypertension) {
            familyHistory = familyHistory + "Hypertension, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.FamilyHistory_IsThyroid) {
            familyHistory = familyHistory + "Thyroid, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.FamilyHistory_Stroke) {
            familyHistory = familyHistory + "Stroke, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.FamilyHistory_Tuberculosis) {
            familyHistory = familyHistory + "Tuberculosis, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.FamilyHistory_Cancers) {
            familyHistory = familyHistory + "Cancers, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.FamilyHistory_Twins) {
            familyHistory = familyHistory + "Twins, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.FamilyHistory_Thromboembolism) {
            familyHistory = familyHistory + "Thromboembolism, ";
        }
        if (VisitingDetails.ObstetricVisitingDetail.FamilyHistory_PhysicallyMentallyChallenged) {
            familyHistory = familyHistory + "Physically/Mentally Challenged, ";
        }

        familyHistory = familyHistory.replace(/,\s*$/, "");

        VisitingDetails.ObstetricVisitingDetail.PastFamilyHistory = familyHistory;
        }        
    }

    function formatDates() {
        //Formate Dates
        if (!isNullEmptyOrUndefined(VisitingDetails.ObstetricVisitingDetail)) {
            if (!isNullEmptyOrUndefined(VisitingDetails.ObstetricVisitingDetail.LMP))
                VisitingDetails.ObstetricVisitingDetail.LMP = $filter('date')(VisitingDetails.ObstetricVisitingDetail.LMP, "dd/MM/yyyy");
            if (!isNullEmptyOrUndefined(VisitingDetails.ObstetricVisitingDetail.EDD))
                VisitingDetails.ObstetricVisitingDetail.EDD = $filter('date')(VisitingDetails.ObstetricVisitingDetail.EDD, "dd/MM/yyyy");
            if (!isNullEmptyOrUndefined(VisitingDetails.ObstetricVisitingDetail.DatingScanDate))
                VisitingDetails.ObstetricVisitingDetail.DatingScanDate = $filter('date')(VisitingDetails.ObstetricVisitingDetail.DatingScanDate, "dd/MM/yyyy");
            if (!isNullEmptyOrUndefined(VisitingDetails.ObstetricVisitingDetail.C11_13WeeksScanDate))
                VisitingDetails.ObstetricVisitingDetail.C11_13WeeksScanDate = $filter('date')(VisitingDetails.ObstetricVisitingDetail.C11_13WeeksScanDate, "dd/MM/yyyy");
            if (!isNullEmptyOrUndefined(VisitingDetails.ObstetricVisitingDetail.AnamalyScanDate))
                VisitingDetails.ObstetricVisitingDetail.AnamalyScanDate = $filter('date')(VisitingDetails.ObstetricVisitingDetail.AnamalyScanDate, "dd/MM/yyyy");
        }

        if (!isNullEmptyOrUndefined(VisitingDetails)) {
            VisitingDetails.Followup_Date = $filter('date')(VisitingDetails.Followup_Date, "dd/MM/yyyy - hh:mm a");

            var followup = $filter('filter')(VisitingDetails.FollowUp, { FollowupId: VisitingDetails.FollowupId }, true)[0];
            if (followup) {
                VisitingDetails.FollowupName = followup.Name;
            }
        }

        angular.forEach(VisitingDetails.PastObstetricHistory, function (item) {
            if (!isNullEmptyOrUndefined(item.Date))
                item.Date = $filter('date')(item.Date, "dd/MM/yyyy");
        });

        if (VisitingDetails.OpFollowupTime != null)
            VisitingDetails.OpFollowupTime = getFormatedTime(VisitingDetails.OpFollowupTime);

        if (VisitingDetails.AdmissionTime != null)
            VisitingDetails.AdmissionTime = getFormatedTime(VisitingDetails.AdmissionTime);

        if (VisitingDetails.SurgeryTime != null)
            VisitingDetails.SurgeryTime = getFormatedTime(VisitingDetails.SurgeryTime);
    }

    function isNullEmptyOrUndefined(str) {
        if (str == null || str == undefined || $.trim(str) == "") {
            return true;
        } else {
            return false;
        }
    }

});