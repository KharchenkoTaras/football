angular.module('footballApp.controllers').controller('TeamsController', ['$scope', '$rootScope', 'teamService', 'alertService', '$state', '$log', function ($scope, $rootScope, teamService, alertService, $state, $log) {
    $rootScope.loading = true;
    /**
     * retrieve teams of England premier league
     * @type {*|{method, url, isArray}}
     */
    $scope.data = teamService.getTeams();
    $scope.data.$promise.then(function (data) {
            $scope.teams = data.teams;
            $rootScope.loading = false;
        },
        function (err) {
            $log.error(err);
            alertService.add('error', 'Something went wrong :(');
        });
    $scope.selectTeam = function (id) {
        $state.go('team', {id: id});
    };
}]);