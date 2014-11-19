'use strict';

angular.module('codemotion', [
  'ngResource',
  'ui.router',
  'codemotion.configuration',
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
).run(['$rootScope', '$http', 'Base64', function ($rootScope, $http, Base64) {
    // var authHeader = Base64.encode('my-client-with-secret' + ':' + 'secret');
    // $http.get('http://localhost:8080/oauth/token?grant_type=client_credentials', {
    //     headers: {
    //         Authorization: authHeader
    //     }
    // }).then(function success (response) {
    //     console.log(response);
    // });
}]);
