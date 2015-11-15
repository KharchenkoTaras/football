'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('footballApp', ['ngResource', 'ui.router']);
angular.module("footballApp.controllers", []);

app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('home', {
            'url': '/home',
            'views': {
                'navigation': {
                    'templateUrl': 'app/templates/navigationBar.html'
                }//,
                //'content': {
                //    'templateUrl': 'templates/navigationBar.html'
                //}
            }
        });
}]);

app.run(['$rootScope', '$state', function ($rootScope, $state) {
    $state.go('home');
}]);
