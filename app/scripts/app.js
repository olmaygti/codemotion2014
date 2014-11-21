'use strict';

angular.module('codemotion', [
  'ngResource',
  'ui.router',
  'codemotion.configuration',
  'codemotion.models',
  'codemotion.services'
]).config(['$sceDelegateProvider', '$httpProvider',
    function($sceDelegateProvider, $httpProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            /^(?:http(?:s)?:\/\/)(?:www\.)?(player\.)?(vimeo|youtube)\.com(.*)$/,
            /^(?:http(?:s)?:\/\/)(?:www\.)youtu\.be(.*)$/,
            /^(?:http(?:s)?:\/\/)(?:www\.)?(?:.*)?odobo\.com(?:.*)$/,
            'self'
        ]);
    }]
).run(['$rootScope', '$http', '$window', 'AuthService', 'ENV_INFO',
  function ($rootScope, $http, $window, AuthService, ENV_INFO) {
  $rootScope.authenticationEndpoint = ENV_INFO.authenticationEndpoint;
    $rootScope.validationEndpoint = ENV_INFO.validationEndpoint;
    $rootScope.$on('$stateChangeStart', function (event, next, current) {
        AuthService.isLoggedIn()
        // AuthService returns a promise that will be rejected when user is not logged in
        .catch(function () {
            // if (!(next.name === 'login' || next.name ==='forbidden')) {
            //     event.preventDefault();
            //     $window.location = $rootScope.authenticationEndpoint;
            // }
        });
    });
  }
])
.controller('LoginCtrl', ['$rootScope', '$scope', '$stateParams', '$state', 'AuthService',
    function ($rootScope, $scope, $stateParams, $state, AuthService) {

        if (typeof $stateParams.token === 'string') {

            var token = $stateParams.token;
            if (!_(token).isEmpty()) {
                AuthService.login(token).then(function success(user) {
                  $state.go('gamesList');
                });
            } else if($stateParams.error && $stateParams.error === 'access_denied') {
                delete $rootScope.user;
            } else {
                delete $rootScope.user;
            }
        }
    }
]);
