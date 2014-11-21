'use strict';

angular.module('codemotion.models', ['ngResource', 'codemotion.configuration'])
    .factory('Game', [
        '$resource',
        'API_URLS',
        function ($resource, URLS) {
            return $resource(
                URLS.GAMES + '/:id',
                {id: '@id'}, {},
                {
                    arrayKeys: 'game',
                    fields: {
                        descriptionShort: {
                            validators: [{maxLength: 2}]
                        },
                        synopsis: true,
                        backgroundColour: {
                            loader: function (value) {
                                return '#' + value;
                            },dumper: function (value) {
                                return value.replace(/#/, '');
                            }
                        },
                        videoUrl: true,
                        hostOperators: {
                            isArray: true,
                            resource: 'Operator'
                        }
                    }
                });
        }
    ])
    .factory('Operator', [
        '$resource',
        'API_URLS',
        function ($resource, URLS) {
            return $resource(URLS.OPERATOR, {gameId: '@gameId', id: '@id'});
        }
    ]);

