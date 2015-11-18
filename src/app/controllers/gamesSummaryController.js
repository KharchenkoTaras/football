angular.module('footballApp.controllers').controller('GamesSummaryController', ['$scope', 'alertService', '$timeout', '$stateParams', function ($scope, alertService, $timeout, $stateParams) {
    $scope.chart = null;
    /**
     * Initialize data for chart
     * @param $promise promise that will be resolved when statistic downloaded
     */
    $scope.initialize = function ($promise) {
        $promise.then(function (data) {
            var team = data['data'];
            // calculate wins/draw/defeat
            _.forEach(team['games'], function (game) {
                switch (game['resultStatus']) {
                    case 'win':
                        $scope.config.data[1][1]++;
                        break;
                    case 'draw':
                        $scope.config.data[2][1]++;
                        break;
                    case 'defeat':
                        $scope.config.data[3][1]++;
                        break;
                }
            });

            /**
             * create and draw google chart
             */
            var data = google.visualization.arrayToDataTable($scope.config.data);
            $scope.chart = new google.visualization.PieChart($('#GamesSummaryChart')[0]);
            $scope.chart.draw(data, $scope.config.options);
        })
    };

    /**
     * clear chart on destroy
     */
    $scope.$on('$destroy', function () {
        if ($scope.chart != null) {
            $scope.chart.clearChart();
            google.visualization.events.removeAllListeners($scope.chart);
        }
    })
    /**
     * initialize static configuration for data
     */
    $scope.config = {
        data: [
            ['Result', 'Count'],
            ['Win', 0],
            ['Drawn', 0],
            ['Defeat', 0]
        ],
        options: {
            pieSliceText: 'none',
            tooltip: {trigger: 'none'},
            pieHole: 0.4,
            height: 400,
            legend: {
                position: 'bottom',
                textStyle: {
                    fontSize: 16
                }
            }
        }
    };
}]);