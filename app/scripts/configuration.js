(function () {
    "use strict";

    var configModule = angular.module('codemotion.configuration',[])
        .constant('TEMPLATE_URLS',{
            GAMES: 'views/games.html',
            SHOW_GAME: 'views/game.html',
            PLAY_PROFILE: 'templates/_play.html',
            OVERVIEW: 'templates/overview_profile.html',
            DISTRIBUTION_RIGHTS: 'templates/games/marketplace/distribution_rights.html',
            VISIBILITY: '/templates/games/visibility/_visibility.html',
            LOGIN: 'views/login.html',
            FORBIDDEN: 'views/forbidden.html'
        })
        .constant('API_URLS', {
            GAMES: '@@backendUrl/games',
            GAME_PROFILE: '@@backendUrl/games/:game_id/profile/',
            SCREENSHOTS: '@@backendUrl/games/:game_id/screenshots',
            ICONS: '@@backendUrl/games/:game_id/icons',
            HERO_IMAGES: '@@backendUrl/games/:game_id/heroImages',
            GAME_RULES: '@@backendUrl/games/:game_id/rules',
            GAME_ARTWORK: '@@backendUrl/games/:game_id/artworks',
            GAME_ARCHETYPES: '@@backendUrl/games/:game_id/archetypes',
            GAME_CERTIFICATIONS: '@@backendUrl/games/:game_id/certifications',
            GAME_DETAILS: '@@backendUrl/games/:game_id/details/',
            SUPPORTED_COUNTRIES: '@@backendUrl/games/:game_id/supportedCountries',
            OPERATOR_EXCLUSIVITY: '@@backendUrl/games/:game_id/operatorExclusivity/:operator_id',
            OPERATORS: '@@backendUrl/operators/',
            COUNTRIES: '@@backendUrl/countries/',
            LANGUAGES: '@@backendUrl/languages/',
            SUPPORTED_LANGUAGES: '@@backendUrl/games/:game_id/supportedLanguages',
            VISIBILITY: '@@backendUrl/games/:game_id/visibility/:type',
            COMMERCIAL_TIERS: '@@backendUrl/commercialTiers/',
            GAME_COMMERCIAL_TIER: '@@backendUrl/games/:game_id/commercialTiers/:tier_id',
            GAME_COMMERCIAL_TIERS: '@@backendUrl/games/:game_id/commercialTiers',
            PUBLISH: '@@backendUrl/publication/:object_id/:environment_id/:section_id',
            LOG: '@@backendUrl/audit/',
            UI_SECTION: '@@backendUrl/uiSection/'
        })
        .constant('APP_URLS', {
            GAMES_LIST: '/games',
            SHOW_GAME: '/games/{gameId}',
            PLAY_PROFILE: '/playProfile',
            MARKETPLACE: '/marketplace',
            OVERVIEW: '/overview',
            DISTRIBUTION_RIGHTS: '/distributionRights/{operatorId}',
            VISIBILITY: '/visibility',
            LOGIN: '/login/?token&error&message',
            USER: '/user',
            FORBIDDEN: '/forbidden'

        })
    ;

    configModule.config(['API_URLS', 'BACKEND_URL', function (API_URLS, BACKEND_URL) {
        _(API_URLS).each(function (value, key) {
            API_URLS[key] = value.replace(/@@backendUrl/, BACKEND_URL);
        });
    }]);
}());
