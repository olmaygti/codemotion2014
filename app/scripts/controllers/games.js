'use strict';

angular.module('codemotion')
    .controller('GamesCtrl', ['$scope', '$http', 'API_URLS', function ($scope, $http, API_URLS) {
        $http.get(API_URLS.GAMES).then(function success(response) {
            $scope.games = response.data.game;
        });
    }])
    .controller('GameCtrl', ['$http', '$stateParams', '$q', '$scope', 'API_URLS', function ($http, $stateParams, $q, $scope, API_URLS) {
        $scope.data = {
            editingProfile: false,
            loadingGame: true
        };

        $http.get(API_URLS.GAMES + '/' + $stateParams.gameId).then(function (response) {
            response.data.profile.backgroundColour = '#' + response.data.profile.backgroundColour;
            $scope.game = response.data;
            $scope.shadowCopy = angular.copy(response.data);
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
            $http.put(url, $scope.game).then(function (response) {
                alert('Game saved');
                $scope.game = response.data;
                $scope.shadowCopy = angular.copy(response.data);
                $scope.switchToEdit(false);
                return _.map($scope.game.hostOperators, function iterator(operator) {
                    return $http.post(url + '/operator/' + operator.id, operator).then(function (response) {
                        console.log(response.headers('Location'));
                    });
                });
            }).then(function (operatorsPromises) {
                $q.all(operatorsPromises).then(function success(operatorResponses) {
                    alert('success');
                });
            });

        }
    }]);
