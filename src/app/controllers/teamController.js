angular.module('footballApp.controllers').controller('TeamController', ['$scope', 'teamService', '$stateParams', 'alertService', '$q', '$log', '$rootScope', function ($scope, teamService, $stateParams, alertService, $q, $log, $rootScope) {
    function getTeamId() {

        if (!_.isEmpty($stateParams) && !_.isEmpty($stateParams['id'])) {
            return $stateParams['id'];
        }
        else {
            return null;
        }
    }

    /**
     * get season id from data
     * @param data
     * @returns {*}
     */
    function getSeasonId(data) {
        return data['data']['team']['matches']['last']['seasonId'];
    }

    function getTeamName(data) {
        return data['data']['team']['name']
    }

    /**
     * callback that will be executed when team statistics successfully retrieved
     * @param data
     */
    function teamStatsRetrieved(data) {
        $scope.statistics.resolve(data);
        $scope.ready = true;
        $rootScope.loading = false;
    }

    /**
     * callback that will be executed when team successfully retrieved
     * required to get team name and current seasonId
     * @param data
     */
    function teamRetrieved(data) {
        $scope.name = getTeamName(data);
        // retrieve current season statistics
        teamService.getTeamStats({
            id: getTeamId(),
            seasonId: getSeasonId(data)
        }).$promise.then(teamStatsRetrieved, retrievalFailed);
    }

    /**
     * callback that will be executed when retrieval failed
     * @param data
     */
    function retrievalFailed(err) {
        $log.error(formatString('Retrieval failed for "{id}" {error}', {
            id: getTeamId(),
            error: err
        }));
        alertService.add('error', 'Something went wrong :(', 'TeamController');
        $rootScope.loading = false;
    }

    /**
     * is controller ready, content will not be shown if not ready
     * @type {boolean}
     */
    $scope.ready = false;
    /**
     * show progress indicator
     * @type {boolean}
     */
    $rootScope.loading = true;

    /**
     * create statistics deferred that will be propagated to chart
     */
    $scope.statistics = $q.defer();
    $scope.statisticsPromise = $scope.statistics.promise;
    /**
     * name of team
     * @type {string}
     */
    $scope.name = 'Resolving...';

    /**
     * if team id is not null -> retrieve team
     */
    if (getTeamId() != null) {
        teamService.getTeamById({'id': getTeamId()}).$promise.then(teamRetrieved, retrievalFailed);
    }
    else {
        alertService.add('error', 'Something went wrong :(', 'TeamController');
    }
}]);