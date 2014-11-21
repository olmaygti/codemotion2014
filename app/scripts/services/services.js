(function () {
    "use strict";

    angular.module('codemotion.services',[])
    .value('authHeaders', {})
    .factory('AuthService',['$rootScope', '$http', '$timeout', '$q', 'APP_URLS', 'authHeaders',

        function ($rootScope, $http, $timeout, $q, APP_URLS, authHeaders) {
            function storeUser(data) {
                // Next step, wrap local storage with angular cache!!
                $rootScope.user = data;
                if (!_(localStorage).isUndefined()) {
                    localStorage.user = JSON.stringify(data);
                }
                return $rootScope.user;
            }

            function getUserFromStorage() {
                var stringUser;
                if (!_(localStorage).isUndefined()) {
                    stringUser = localStorage.user;
                    if (!_(stringUser).isUndefined()) {
                        return JSON.parse(stringUser);
                    }
                }
            }

            function setHeadersForUser(user) {
                if (user) {
                    authHeaders['Authorization'] = 'Bearer ' + user.access_token;
                } else if (authHeaders['Authorization']) {
                    delete authHeaders['Authorization'];
                }
            }

            function validateApiToken(apiToken) {
                return $http.post($rootScope.validationEndpoint, {}, {
                    headers: {
                        'Authorization': 'Bearer ' + apiToken
                    }
                });
            }


            return {
                logout: function() {
                    // Delete user from local Storage and clean the HTTP headers
                    delete authHeaders['Authorization'];
                    localStorage.removeItem('user');
                    delete $rootScope.user;

                },

                login: function (apiToken) {
                        var self = this,
                        deferred = $q.defer(),
                        user;

                    // If user is still in localstorage so will be the AuthHeaders used by the Http interceptor
                    // Gotta clean them all before attempting to validate the new token.
                    self.logout();

                    validateApiToken(apiToken).success(function (data, status) {
                               user = storeUser(data);
                        setHeadersForUser(user);
                        deferred.resolve(user);
                    }).error(function (data,status) {
                        console.log("ERROR: ", data, status);
                        deferred.reject();
                    });
                    return deferred.promise;
                },
                // Returns a promise that will be resolved if the user exists and is valid
                // and rejected if not
                isLoggedIn: function () {
                    var user,
                        self = this,
                        deferred = $q.defer();

                    if (_($rootScope.user).isUndefined()) {
                        //It might be in the localStorage
                        user = getUserFromStorage();
                        if (!_(user).isUndefined()) {
                            $rootScope.user = user;
                            setHeadersForUser(user);
                            deferred.resolve(user);
                        } else {
                            deferred.reject();
                        }
                    } else {
                        deferred.resolve($rootScope.user);
                    }
                    return deferred.promise;
                },
                getAuthenticationHeaders: function() {
                    return authHeaders;
                }
            };
        }
    ])
    .factory('Base64', function () {
        /* jshint ignore:start */
     
        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
     
        return {
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;
     
                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
     
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
     
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
     
                    output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);
     
                return output;
            },
     
            decode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;
     
                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    window.alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
     
                do {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));
     
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
     
                    output = output + String.fromCharCode(chr1);
     
                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }
     
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
     
                } while (i < input.length);
     
                return output;
            }
        };
     
        /* jshint ignore:end */
    });
}());