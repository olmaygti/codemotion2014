'use strict';

angular.module('codemotion.models', ['ngResource', 'codemotion.configuration'])
    .factory('Game', [
        '$resource',
        'API_URLS',
        function ($resource, URLS) {
            return $resource(
                URLS.GAMES + '/:id',
                {id: '@id'}, {}, {
                    arrayKeys: 'game'
                });
        }
    ]);

