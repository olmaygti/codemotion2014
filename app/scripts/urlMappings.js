(function (app) {
    "use strict";

    app.config(['$stateProvider', '$urlRouterProvider', 'APP_URLS', 'TEMPLATE_URLS',
        function ($stateProvider, $urlRouterProvider, URLS, TEMPLATES) {
            $stateProvider
                .state('gamesList', {
                    url: URLS.GAMES_LIST,
                    templateUrl: TEMPLATES.GAMES,
                    controller: 'GamesCtrl'
                })
                .state('showGame', {
                    url: URLS.SHOW_GAME,
                    templateUrl: TEMPLATES.SHOW_GAME,
                    controller: 'GameCtrl',
                });

            $urlRouterProvider.when('', '/games');
            $urlRouterProvider.when('/', '/games');
            $urlRouterProvider.otherwise('/games');
        }
    ]);
})(angular.module('codemotion'));
