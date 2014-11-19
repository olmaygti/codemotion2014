'use strict';

angular.module('codemotion.models', ['ngResource', 'codemotion.configuration'])
    .factory('Game', [
        '$resource',
        'API_URLS',
        function ($resource, URLS) {
            // Careful, we have the game_id embedded in the URL for a given screenshot
            return $resource(
                URLS.GAMES + '/:id',
                {id: '@id'}, {});
        }
    ]);
