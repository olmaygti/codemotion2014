(function () {
    "use strict";

    var configModule = angular.module('codemotion.configuration',[])
        .constant('TEMPLATE_URLS',{
            GAMES: 'views/games.html',
            SHOW_GAME: 'views/game.html',
            PLAY_PROFILE: 'templates/_play.html',
            FORBIDDEN: 'views/forbidden.html'
        })
        .constant('API_URLS', {
            GAMES: '@@backendUrl/games',
            GAME_PROFILE: '@@backendUrl/games/:game_id/profile/',
        })
        .constant('APP_URLS', {
            GAMES_LIST: '/games',
            SHOW_GAME: '/games/{gameId}',
        })
    ;

    configModule.config(['API_URLS', 'BACKEND_URL', function (API_URLS, BACKEND_URL) {
        _(API_URLS).each(function (value, key) {
            API_URLS[key] = value.replace(/@@backendUrl/, BACKEND_URL);
        });
    }]);
}());
