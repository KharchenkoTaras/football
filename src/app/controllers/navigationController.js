/**
 * stub controller for navigation bar
 */
angular.module('footballApp.controllers').controller('NavigationController', ['$scope', '$state', function ($scope, $state) {
    if ($.fn.NavBar) {
        $('.ms-NavBar').NavBar();
    }
    $scope.state = $state;
}]);