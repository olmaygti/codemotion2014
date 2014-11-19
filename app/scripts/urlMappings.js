(function (app) {
    "use strict";

    app.config(['$stateProvider', '$urlRouterProvider', 'APP_URLS', 'TEMPLATE_URLS',
        function ($stateProvider, $urlRouterProvider, URLS, TEMPLATES) {
            $stateProvider
                .state('testEditable', {
                    url: '/test/eZopQ0Dtqs/editable-component',
                    templateUrl: 'templates/editable-component/testing.html',
                    controller: 'TestController'
                })
                .state('gamesList', {
                    url: URLS.GAMES_LIST,
                    templateUrl: TEMPLATES.GAMES,
                    controller: 'GamesCtrl'
                })
                .state('showGame', {
                    url: URLS.SHOW_GAME,
                    templateUrl: TEMPLATES.SHOW_GAME,
                    controller: 'GameCtrl',
                })
                .state('showGame.overview', {
                    url: URLS.OVERVIEW,
                    templateUrl: TEMPLATES.OVERVIEW
                })
                .state('showGame.playProfile', {
                    url: URLS.PLAY_PROFILE,
                    views: {
                        main: {
                            templateUrl: TEMPLATES.PLAY_PROFILE
                        }
                    }
                });

            $urlRouterProvider.when('', '/games');
            $urlRouterProvider.when('/', '/games');
            $urlRouterProvider.otherwise('/games');
        }
    ]);
})(angular.module('codemotion'));
