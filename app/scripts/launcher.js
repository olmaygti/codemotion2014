(function () {
    'use strict';

    angular.module('codemotion.launcher', [])
    .run(['$http' ,function ($http) {
        $http.get('config.json').success(function(data) {
            angular.module('codemotion.configuration').constant('BACKEND_URL', data.backend_url);

            angular.bootstrap(angular.element('body'), [data.appName]);
        });
    }]);
})();
