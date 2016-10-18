'use strict';

gymManagementApp.controller('careersAvailableController', function ($scope, $state, $http, $rootScope, $location, Idle, $route, exDialog, commonService, $localStorage, userSessionService) {

    $scope.init = function () {
        Idle.watch();
        $location.path('/dashboard/careersAvailable');
        $scope.test1 = 'This Is About us Page';

        $scope.availablejobs = [
    { id: 1, position: 'Massager', description: 'Massage therapy is the scientific manipulation of the soft tissues of the body for the purpose of normalizing those tissues and consists of manual techniques that include applying fixed or movable pressure, holding, and/or causing movement of or to the body.', availability: true, noofpost: 1 },
    { id: 2, position: 'Fitness Trainer', description: 'As a fitness instructor, you would lead and organise group and individual exercise programmes to help people (clients) to improve their health and fitness. Your work could involve a range of activities or you could specialise in a particular one', availability: true, noofpost: 3 },
    { id: 3, position: 'Yoga Trainer', description: 'Yoga instructors help to guide students in yoga through a variety of postures, or asanas, and breathing exercises referred to as pranayama. Instructors provide hands-on direction to make sure students are performing movements properly and applying the breathing techniques. Yoga instructors may work in a class or in a one-on-one setting.', availability: false, noofpost: 4 },
    { id: 4, position: 'Zumba Trainer', description: 'People who want to work as Dance Teachers need to have degree programs offered by some Colleges and Performing Arts schools. Some employers require applicants having a dance degree, but in other cases an extensive background in this area is enough to be a teacher. There are employers that require past work experience and also a certification in a dance teaching method. These certifications include techniques such as belly dance, classical ballet, ballroom dance, among others.', availability: false, noofpost: 7 },
    { id: 5, position: 'Spa Trainer', description: 'As a Fitness Instructor you will become part of dedicated Wellbeing team that provides a unique fitness experience for our guests throughout their patronage', availability: false, noofpost: 9 }
        ];

            };
    $scope.init();

});
