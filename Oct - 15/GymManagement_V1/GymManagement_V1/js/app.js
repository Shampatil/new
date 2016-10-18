/// <reference path="controller/folllowUpController.js" />
// Check the patient portal service required or not
//var _IsPatientPortalServiceAvailable = true;

var gymManagementApp = angular.module('gymManagementApp', [
  'ngIdle',
  'ngStorage',
  'ngRoute',
  'ui.router',
  'angular.filter',
  'ngExDialog',
  'datatables',
  'angularjs-dropdown-multiselect',
  'ui.bootstrap',
  'ngMaterial',
  'ui.numeric',
  'ngDraggable',
  'ngTagsInput',
]);

gymManagementApp.config(function ($stateProvider, $urlRouterProvider, KeepaliveProvider, IdleProvider) {
    $urlRouterProvider.otherwise("/dashboard")
    $stateProvider
    .state('dashboard', { url: "/dashboard", templateUrl: 'Views/dashboard/Dashboard.html', controller: 'dashboardController' })
    .state('dashboard.home', { url: "/home", templateUrl: 'Views/dashboard/home.html', controller: 'homeController' })
    .state('dashboard.aboutUs ', { url: "/aboutUs", templateUrl: 'Views/dashboard/aboutUs.html', controller: 'aboutUsController' })
    .state('dashboard.Enquiry ', { url: "/Enquiry", templateUrl: 'Views/dashboard/Enquiry.html', controller: 'EnquiryController' })
    .state('dashboard.contactUs ', { url: "/contactUs", templateUrl: 'Views/dashboard/contactUs.html', controller: 'contactUsController' })
    .state('dashboard.career ', { url: "/career", templateUrl: 'Views/dashboard/career.html', controller: 'careerController' })
    .state('dashboard.services ', { url: "/services", templateUrl: 'Views/dashboard/services.html', controller: 'servicesController' })
    .state('dashboard.packages ', { url: "/packages", templateUrl: 'Views/dashboard/packages.html', controller: 'packagesController' })
    .state('dashboard.careersAvailable ', { url: "/careersAvailable", templateUrl: 'Views/dashboard/careersAvailable.html', controller: 'careersAvailableController' })
    .state('dashboard.renewal ', { url: "/renewal", templateUrl: 'Views/dashboard/renewal.html', controller: 'renewalController' })
    .state('dashboard.newAdmission ', { url: "/newAdmission", templateUrl: 'Views/dashboard/newAdmission.html', controller: 'newAdmissionController' })
    .state('dashboard.searchEnquiry ', { url: "/searchEnquiry", templateUrl: 'Views/dashboard/searchEnquiry.html', controller: 'searchEnquiryController' })
    .state('dashboard.searchMember ', { url: "/searchMember", templateUrl: 'Views/dashboard/searchMember.html', controller: 'searchMemberController' })
    .state('dashboard.Demo', { url: "/Demo", templateUrl: 'Views/dashboard/Demo.html', controller: 'DemoController' })
    .state('dashboard.addServices ', { url: "/addServices", templateUrl: 'Views/dashboard/addServices.html', controller: 'addServicesController' })
    .state('dashboard.addPackages ', { url: "/addPackages", templateUrl: 'Views/dashboard/addPackages.html', controller: 'addPackagesController' })
    .state('dashboard.demo2 ', { url: "/demo2", templateUrl: 'Views/dashboard/demo2.html', controller: 'demo2Controller' })
    .state('dashboard.followUp ', { url: "/followUp", templateUrl: 'Views/dashboard/followUp.html', controller: 'followUpController' })
    .state('dashboard.followUp1 ', { url: "/followUp1", templateUrl: 'Views/dashboard/followUp1.html', controller: 'followUp1Controller' })
    .state('dashboard.balancePayment ', { url: "/balancePayment", templateUrl: 'Views/dashboard/balancePayment.html', controller: 'balancePaymentController' })
    .state('dashboard.balancePayment2 ', { url: "/balancePayment2", templateUrl: 'Views/dashboard/balancePayment2.html', controller: 'balancePayment2Controller' })
    .state('dashboard.addonPackages ', { url: "/addonPackages", templateUrl: 'Views/dashboard/addonPackages.html', controller: 'addonPackagesController' })
    .state('dashboard.newBalancePayment ', { url: "/newBalancePayment", templateUrl: 'Views/dashboard/newBalancePayment.html', controller: 'newBalancePaymentController' })

     .state('dashboard.newAddonPackagesController', { url: "/newAddonPackages", templateUrl: 'Views/dashboard/newAddonPackages.html', controller: 'newBalancePaymentController' })
     .state('dashboard.newRenewal', { url: "/newRenewal", templateUrl: 'Views/dashboard/newRenewal.html', controller: 'newRenewalController' })
    .state('dashboard.workout', { url: "/workout", templateUrl: 'Views/dashboard/workout.html', controller: 'workoutController' })
    .state('dashboard.addWorkoutComponents', { url: "/addWorkoutComponents", templateUrl: 'Views/dashboard/addWorkoutComponents.html', controller: 'addWorkoutComponentsController' })
    .state('dashboard.ServiceList', { url: "/ServiceList", templateUrl: 'Views/dashboard/ServiceList.html', controller: 'ServiceListController' })

    //.state('login', { url: "/login", templateUrl: 'views/login/login.html', controller: 'loginController' })
    //.state('loginLocation', { url: "/loginLocation", templateUrl: 'views/login/loginLocation.html', controller: 'loginController' })
    //.state('dashboard', { url: "/dashboard", templateUrl: 'views/dashboard/Dashboard.html', controller: 'dashboardController' })
    //.state('dashboard.notifications', { url: "/notifications", templateUrl: 'views/dashboard/Notifications.html', controller: 'notificationsController' })

    IdleProvider.idle(1800);
    IdleProvider.timeout(10);
    KeepaliveProvider.interval(10);
});

gymManagementApp.config(['exDialogProvider', function (exDialogProvider) {
    exDialogProvider.setDefaults({
        template: 'ngExDialog/commonDialog.html', //from cache
        //template: 'ngExDialog/commonDialog_0.html', //from file
        width: '330px'
    });
}]);

gymManagementApp.directive('percentage', ['$filter', function ($filter) {
    return {
        require: 'ngModel',
        link: function (elem, $scope, attrs, ngModel) {
            ngModel.$formatters.push(function (val) {
                return $filter('number')(val) + '%'
            });
            ngModel.$parsers.push(function (val) {
                return val.replace(/[\%]/, '')
            });
        }
    }
}]);

gymManagementApp.config(function ($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('blue');

});

gymManagementApp.directive('disableContents', function () {
    return {
        compile: function (tElem, tAttrs) {
            var inputs = tElem.find('input');
            inputs.attr('ng-disabled', tAttrs['disableContents']);
            var selects = tElem.find('select');
            selects.attr('ng-disabled', tAttrs['disableContents']);
            var buttons = tElem.find('button');
            buttons.attr('ng-disabled', tAttrs['disableContents']);
            var textarea = tElem.find('textarea');
            textarea.attr('ng-disabled', tAttrs['disableContents']);
        }
    }
});

gymManagementApp.directive('jqdatepicker', function ($parse) {
    return function ($scope, element, attrs, controller) {
        var ngModel = $parse(attrs.ngModel);
        var showOn = attrs.hideIcon ? "focus" : "both"
        $(function () {
            element.datepicker({
                showOn: showOn,
                //buttonImage: "Images/metallic/calendar.png",
                buttonImageOnly: true,
                dateFormat: 'yy-mm-dd',
                changeMonth: true,
                changeYear: true,
                beforeShow: function (element, datepicker) {
                    if (attrs.minDate) {
                        angular.element(element).datepicker("option", "minDate", attrs.minDate);
                    }
                    if (attrs.maxDate) {
                        angular.element(element).datepicker("option", "maxDate", attrs.maxDate);
                    }
                }
            }).attr('readonly', 'true');
        });
    }
});

gymManagementApp.run(function ($rootScope, Idle, $location) {
    $rootScope.$on('IdleStart', function () { });
    $rootScope.$on('IdleTimeout', function () {
        $('#SesssionModal').modal('show');
    });
    $rootScope.$on('IdleEnd', function () { });
});

//function to set date format
function setDate(dateString) {
    var parts = dateString.split("/");
    var date = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
    return date;
}

gymManagementApp.directive('ngFiles', ['$parse', function ($parse) {
    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
        });
    };

    return {
        link: fn_link
    }
}]);

gymManagementApp.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput == text) {
                        text = parseInt(text);
                        if (text > 120) {
                            transformedInput = "120";
                        }
                    }

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
}
);


