/**
 * User notifications service
 */
angular.module('footballApp.servies').factory('alertService', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
    function closeAlertIdx(index) {
        return $rootScope.alerts.splice(index, 1);
    };

    function closeAlert(alert) {

        return closeAlertIdx($rootScope.alerts.indexOf(alert));
    };

    var alertServiceFactory = {};
    $rootScope.alerts = [];
    $rootScope.closeAlert = closeAlert;
    /*
     * @param type = {success, info, warning, danger}
     */
    alertServiceFactory.add = function (type, msg, id, timeout) {
        var alert = _.find($rootScope.alerts, function (item) {
            return item.id == id;
        });

        if (_.isEmpty(alert)) {
            alert = {
                type: type,
                msg: msg,
                id: id
            };
            $rootScope.alerts.push(alert);
        }
        else {
            alert.type = type;
            alert.msg = msg;
        }

        if (timeout) {
            $timeout(function () {
                $rootScope.closeAlert(alert);
            }, timeout);
        }
    };
    alertServiceFactory.clear = function () {
        $rootScope.alerts = [];
    }


    return alertServiceFactory;
}]);
