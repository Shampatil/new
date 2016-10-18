gymManagementApp.factory('userSessionService', function ($localStorage, $location, Idle, $rootScope) {
    var userSessionService = [{}];
    userSessionService.LoggedInUserDetails = null;
    userSessionService.PatientId = null;
    userSessionService.VisitingDetailId = null;

    userSessionService.ValidateSessionDetails = function () {
        Idle.watch();
        $rootScope.$emit("PatientInfo", {});
        $rootScope.displayTitle = true;

        userSessionService.LoggedInUserDetails = JSON.parse(localStorage.getItem('LoggedInUserDetails'));
        if (userSessionService.LoggedInUserDetails == null) {
            $location.path('/home');
            return false;
        }

        userSessionService.PatientId = localStorage.getItem('patientId');
        if (userSessionService.PatientId == null) {
            $location.path('/dashboard/outPatient');
            return false;
        }
        return true;
    };

    userSessionService.ValidateVisitingDetailId = function () {
        userSessionService.VisitingDetailId = localStorage.getItem('visitingDetailId');
        if (userSessionService.VisitingDetailId == null) {
            $location.path('/dashboard/outPatient');
            return false;
        }
        return true;
    };

    userSessionService.ValidateLoggedInUserSession = function () {
        userSessionService.LoggedInUserDetails = JSON.parse(localStorage.getItem('LoggedInUserDetails'));
        if (userSessionService.LoggedInUserDetails == null) {
            $location.path('/home');
            return false;
        }
        return true;
    };

    return userSessionService;
});