'use strict';
/**
 * create angular app
 */
var app = angular.module('footballApp', ['ngResource', 'ui.router', 'ngAnimate', 'footballApp.controllers', 'footballApp.servies', 'templates-dist', 'LocalStorageModule']);
angular.module('footballApp.controllers', []);
angular.module('footballApp.servies', ['ngResource']);

/**
 * configure states
 */
app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('teams', {
            url: '/teams',
            views: {
                main: {
                    controller: 'TeamsController',
                    templateUrl: 'app/templates/teams.html'
                }
            }
        })
        .state('team', {
            url: '/team/:id',
            views: {
                main: {
                    controller: 'TeamController',
                    templateUrl: 'app/templates/team.html'
                }
            }
        });
}]);

app.run(['$rootScope', '$state', '$timeout', 'localStorageService', 'alertService', function ($rootScope, $state, $timeout, localStorageService, alertService) {
    $(document).ready(function () {
        var spinner = $('#spinner-container');
        var officeSpinner = fabric.Spinner(spinner[0], 'sixteen');
        officeSpinner.start();
        /**
         * Put $state.go to the end of digest cycle
         * because on app run $state.current is not initialized
         */
        $timeout(function () {
            /**
             * Ignore load previous team when go to direct page
             */
            if (_.isEmpty($state.current.name)) {
                //if there is stored team open it otherwise open teams
                if (!_.isEmpty(localStorageService.get('selectedTeam'))) {
                    $state.go('team', {id: localStorageService.get('selectedTeam')});
                    alertService.add('info', 'Welcome Back!', 'hello', 2000)
                }
                else {
                    $state.go('teams');
                }
            }
        });

        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams) {
                if (toState['name'] == 'team') {
                    /**
                     * Store opened team to local storage
                     */
                    localStorageService.set('selectedTeam', toParams['id']);
                }
            })

    });
}]);


/**
 * Load google package for charts
 * used Frozen Charts Version 43. due to multiple issues in official release version
 */
google.charts.load('43', {packages: ['bar', 'corechart']});
// When google api required for charts is loaded bootstrap application
google.setOnLoadCallback(function () {
    angular.bootstrap(document.body, ['footballApp']);
});