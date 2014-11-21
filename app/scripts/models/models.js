'use strict';

angular.module('codemotion.models', ['ngResource', 'codemotion.configuration'])
    .factory('Game', [
        '$resource',
        'API_URLS',
        function ($resource, URLS) {
            // Careful, we have the game_id embedded in the URL for a given screenshot
            return $resource(
                URLS.GAMES + '/:id',
                {id: '@id'}, {},{
                    initFunction: function () {
                        var self = this;
                        _(this.hostOperators).each(function (operator) {
                            operator.gameId = self.id;
                        });
                    },
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
                    },
                    arrayKeys: 'game'
                });
        }
    ])
    .factory('Operator', [
        '$resource',
        'API_URLS',
        function ($resource, URLS) {
            // Careful, we have the game_id embedded in the URL for a given screenshot
            return $resource(
                URLS.OPERATOR,
                {id: '@id', gameId: '@gameId'}, {},{
                });
        }
    ]);

