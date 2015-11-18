/**
 * Service for retrieve teams data
 */
angular.module('footballApp.servies').factory('teamService', ['$resource', function ($resource) {
    return $resource('/content', null, {
        getTeams: {
            method: 'GET',
            url: 'https://feedmonster.onefootball.com/feeds/il/en/competitions/9/1231/teamsOverview.json',
            isArray: false
        },
        getTeamById: {
            method: 'GET',
            url: 'https://vintagemonster.onefootball.com/api/teams/en/:id.json',
            params: {
                id: '@id'
            },
            isArray: false
        },
        getTeamStats: {
            method: 'GET',
            url: 'https://vintagemonster.onefootball.com/api/season-stats/teams/en/:id/:seasonId.json?games_n=100',
            params: {
                id: '@id',
                seasonId: '@seasonId'
            },
            isArray: false
        }
    });
}]);