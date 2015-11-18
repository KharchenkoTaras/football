angular.module('footballApp.controllers').controller('GroupPointsController', ['$scope', '$stateParams', function ($scope, $stateParams) {
    $scope.chart = null;
    /**
     * Initialize data for chart
     * @param $promise promise that will be resolved when statistic downloaded
     */
    $scope.initialize = function ($promise) {
        $promise.then(function (data) {
            var team = data['data'];
            var currentTeamIndex;
            _.forEach(team['groups'][0]['ranking'], function (rank, index) {
                var data = [rank['team']['name'], rank['team']['teamStats']['points'], [rank['team']['teamStats']['points']]]
                if (rank['team']['id'] == $stateParams['id']) {
                    currentTeamIndex = index;
                }
                $scope.config.data.push(data);
            });

            /**
             * create and draw google chart
             */
            var data = google.visualization.arrayToDataTable($scope.config.data);
            $scope.chart = new google.charts.Bar($('#GroupPointsChart')[0]);
            $scope.chart.draw(data, google.charts.Bar.convertOptions($scope.config.options));

            /**
             * colorize current team
             */
            function colorize() {
                var svg = $('#GroupPointsChart').find('svg');
                var bars = svg.find('path');
                bars[currentTeamIndex].setAttribute('fill', '#FF9900');
            }

            google.visualization.events.addListener($scope.chart, 'ready', colorize);
            google.visualization.events.addListener($scope.chart, 'select', colorize);
            google.visualization.events.addListener($scope.chart, 'onmouseover', colorize);

        })
    };

    $scope.$on('$destroy', function () {
        if ($scope.chart != null) {
            $scope.chart.clearChart();
            google.visualization.events.removeAllListeners($scope.chart);
        }
    })
    $scope.config = {
        data: [
            ['', 'Points', {role: 'annotation'}]
        ],
        options: {
            height: 700,
            fontName: '"Segoe UI Light WestEuropean","Segoe UI Light","Segoe WP Light","Segoe UI","Segoe WP",Tahoma,Arial,sans-serif',
            legend: {position: 'none'},
            bar: {groupWidth: '80%'},
            axisTitlesPosition: 'none',
            hAxis: {
                gridlines: {color: 'transparent'},
                textStyle: {color: 'transparent'}
            },
            bars: 'horizontal' // Required for Material Bar Charts.
        }
    };
}]);