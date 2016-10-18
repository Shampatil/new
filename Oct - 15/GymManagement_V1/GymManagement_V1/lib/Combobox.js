var app = angular.module('my-app', ['ui.bootstrap']);

app.controller('treeController', function ($scope) {
    $scope.callMe = function () {
        alert("test");
    };

    $scope.tree = [{
        name: "Gym",
        link: "#",
        subtree: [{
            name: "Swimming",
            link: "#"
        }]
    }, {
        name: "Swimming",
        link: "#",
        subtree: [{
            name: "Mary",
            link: "#"
        }]
    }, {
        name: "divider",
        link: "#"
    }, {
        name: "Diet",
        link: "#"
    }, {
        name: "divider",
        link: "#"
    }, {
        name: "Workout",
        link: "#"
    }];

});

app.directive('tree', function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            tree: '='
        },
        templateUrl: 'template-ul.html'
    };
});

app.directive('leaf', function ($compile) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            leaf: "="
        },
        templateUrl: 'template-li.html',
        link: function (scope, element, attrs) {
            if (angular.isArray(scope.leaf.subtree)) {
                element.append("<tree tree='leaf.subtree'></tree>");
                element.addClass('dropdown-submenu');
                $compile(element.contents())(scope);
            } else {
                element.bind('click', function () {
                    alert("You have clicked on " + scope.leaf.name);
                });

            }
        }
    };
});

