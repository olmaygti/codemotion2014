'use strict';

angular.module('codemotion')
    .controller('GamesCtrl', ['$scope', '$http', 'Game', 'API_URLS', function ($scope, $http, Game, API_URLS) {
        $scope.games = Game.query();
    }])
    .controller('GameCtrl', ['$http', '$stateParams', '$q', '$scope', 'Game', 'API_URLS', function ($http, $stateParams, $q, $scope, Game, API_URLS) {
        $scope.data = {
            editingProfile: false,
            loadingGame: true
        };

        Game.get({id: $stateParams.gameId}).$promise.then(function (game) {
            $scope.game = game;
            $scope.shadowCopy = angular.copy(game);
        }).finally(function () {
            $scope.data.loadingGame =false;
        });

        $scope.switchToEdit = function (editMode) {
            $scope.data.editingProfile = editMode;
            if (!editMode) {
                $scope.game = angular.copy($scope.shadowCopy);
            }
        }

        $scope.save = function () {
            var url = API_URLS.GAMES + '/' + $stateParams.gameId;
            $scope.game.$update().then(function (resource) {
                alert('Game saved');
                $scope.game = resource;
                $scope.shadowCopy = angular.copy(resource);
                $scope.switchToEdit(false);
                return _.map($scope.game.hostOperators, function iterator(operator) {
                    return $http.post(url + '/operator/' + operator.id, operator);
                });
            }).then(function (operatorsPromises) {
                $q.all(operatorsPromises).then(function success(operatorResponses) {
                    alert('success');
                });
            });

        }
    }]);
