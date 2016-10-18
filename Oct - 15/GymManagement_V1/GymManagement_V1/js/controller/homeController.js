'use strict';
gymManagementApp.controller('homeController', function ($scope, $state, $http, $rootScope, $location, Idle, $route, exDialog, commonService, $localStorage, userSessionService) {

    $scope.init = function () {
        Idle.watch();
        $location.path('/dashboard/home');
        $scope.test = "Hi Sham test ";
        $scope.test1 = "Excellencea.com ";
        $scope.imgs = [
                '../../Images/1.jpg',
                '../../Images/2.jpg',
                '../../Images/3.jpg',
                '../../Images/4.jpg',
                '../../Images/5.jpg',
                '../../Images/6.jpg',
                '../../Images/7.jpg'
        ];

     $scope.slides = [
    { image: 'images/1.jpg', description: 'Image 00' },
    { image: 'images/2.jpg', description: 'Image 01' },
    { image: 'images/3.jpg', description: 'Image 02' },
    { image: 'images/4.jpg', description: 'Image 03' },
    { image: 'images/5.jpg', description: 'Image 04' }
     ];
    };


    $scope.packageslist = [
{ packageid: 1, Package: 'Platinum', description: 'Massage therapy is the scientific manipulation of the soft tissues of the body for the purpose of normalizing those tissues and consists of manual techniques that include applying fixed or movable pressure, holding, and/or causing movement of or to the body.', ServicesInclude: 'zumba, Cardio, Gym, Steam', validity: '1 Year', persons: '2', Price: '10000', packagephoto: '/Images/PlanetImages/PlanetLogo/Planet Fitness Gym Logo.png' },
{ packageid: 1, Package: 'Super Family', description: 'Massage therapy is the scientific manipulation of the soft tissues of the body for the purpose of normalizing those tissues and consists of manual techniques that include applying fixed or movable pressure, holding, and/or causing movement of or to the body.', ServicesInclude: 'Zumba, Fitness, Gym', validity: '', persons: '2', Price: '7000', packagephoto: '/Images/PlanetImages/PlanetLogo/Planet Fitness Gym Logo.png' },
{ packageid: 1, Package: 'Gold', description: 'Massage therapy is the scientific manipulation of the soft tissues of the body for the purpose of normalizing those tissues and consists of manual techniques that include applying fixed or movable pressure, holding, and/or causing movement of or to the body.', ServicesInclude: 'Swimming, Dance Gym, Zumba', validity: '', persons: '1', Price: '5000', packagephoto: '/Images/PlanetImages/PlanetLogo/Planet Fitness Gym Logo.png' },
{ packageid: 1, Package: 'Silver', description: 'Massage therapy is the scientific manipulation of the soft tissues of the body for the purpose of normalizing those tissues and consists of manual techniques that include applying fixed or movable pressure, holding, and/or causing movement of or to the body.', ServicesInclude: 'Swimming, Boxing, Cardio', validity: '', persons: '1', Price: '4000', packagephoto: '/Images/PlanetImages/PlanetLogo/Planet Fitness Gym Logo.png' },
{ packageid: 1, Package: 'Super Saver', description: 'Massage therapy is the scientific manipulation of the soft tissues of the body for the purpose of normalizing those tissues and consists of manual techniques that include applying fixed or movable pressure, holding, and/or causing movement of or to the body.', ServicesInclude: 'zumba, Swimming, Cardio,', validity: '', persons: '1', Price: '3000', packagephoto: '/Images/PlanetImages/PlanetLogo/Planet Fitness Gym Logo.png' },
{ packageid: 1, Package: 'Fitness', description: 'Massage therapy is the scientific manipulation of the soft tissues of the body for the purpose of normalizing those tissues and consists of manual techniques that include applying fixed or movable pressure, holding, and/or causing movement of or to the body.', ServicesInclude: 'Gym', validity: '', persons: '1', Price: '2000', packagephoto: '/Images/PlanetImages/PlanetLogo/Planet Fitness Gym Logo.png' },
{ packageid: 1, Package: 'Platinum', description: 'Massage therapy is the scientific manipulation of the soft tissues of the body for the purpose of normalizing those tissues and consists of manual techniques that include applying fixed or movable pressure, holding, and/or causing movement of or to the body.', ServicesInclude: 'zumba, Cardio, Gym, Steam', validity: '1 Year', persons: '2', Price: '10000', packagephoto: '/Images/PlanetImages/PlanetLogo/Planet Fitness Gym Logo.png' },
{ packageid: 1, Package: 'Super Family', description: 'Massage therapy is the scientific manipulation of the soft tissues of the body for the purpose of normalizing those tissues and consists of manual techniques that include applying fixed or movable pressure, holding, and/or causing movement of or to the body.', ServicesInclude: 'Zumba, Fitness, Gym', validity: '', persons: '2', Price: '7000', packagephoto: '/Images/PlanetImages/PlanetLogo/Planet Fitness Gym Logo.png' },
{ packageid: 1, Package: 'Gold', description: 'Massage therapy is the scientific manipulation of the soft tissues of the body for the purpose of normalizing those tissues and consists of manual techniques that include applying fixed or movable pressure, holding, and/or causing movement of or to the body.', ServicesInclude: 'Swimming, Dance Gym, Zumba', validity: '', persons: '1', Price: '5000', packagephoto: '/Images/PlanetImages/PlanetLogo/Planet Fitness Gym Logo.png' },
{ packageid: 1, Package: 'Silver', description: 'Massage therapy is the scientific manipulation of the soft tissues of the body for the purpose of normalizing those tissues and consists of manual techniques that include applying fixed or movable pressure, holding, and/or causing movement of or to the body.', ServicesInclude: 'Swimming, Boxing, Cardio', validity: '', persons: '1', Price: '4000', packagephoto: '/Images/PlanetImages/PlanetLogo/Planet Fitness Gym Logo.png' },
{ packageid: 1, Package: 'Super Saver', description: 'Massage therapy is the scientific manipulation of the soft tissues of the body for the purpose of normalizing those tissues and consists of manual techniques that include applying fixed or movable pressure, holding, and/or causing movement of or to the body.', ServicesInclude: 'zumba, Swimming, Cardio,', validity: '', persons: '1', Price: '3000', packagephoto: '/Images/PlanetImages/PlanetLogo/Planet Fitness Gym Logo.png' },
{ packageid: 1, Package: 'Fitness', description: 'Massage therapy is the scientific manipulation of the soft tissues of the body for the purpose of normalizing those tissues and consists of manual techniques that include applying fixed or movable pressure, holding, and/or causing movement of or to the body.', ServicesInclude: 'Gym', validity: '', persons: '1', Price: '2000', packagephoto: '/Images/PlanetImages/PlanetLogo/Planet Fitness Gym Logo.png' }
    ];
    $scope.init();



});