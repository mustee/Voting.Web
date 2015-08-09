/// <reference path="../tsd.d.ts" />
/// <reference path="../../tools/typings/voting.d.ts" />
var Voting;
(function (Voting) {
    var Services;
    (function (Services) {
        'use strict';
        var AuthInterceptor = (function () {
            function AuthInterceptor(tokenService, sharedDataService, $location, $q) {
                var _this = this;
                this.tokenService = tokenService;
                this.sharedDataService = sharedDataService;
                this.$location = $location;
                this.$q = $q;
                this.request = function (config) {
                    config.headers = config.headers || {};
                    if (_this.tokenService.getToken() != null && _this.tokenService.getToken().AccessToken != null)
                        config.headers.Authorization = 'Bearer ' + _this.tokenService.getToken().AccessToken;
                    return config;
                };
                this.responseError = function (response) {
                    var self = _this;
                    console.log(response.status);
                    if (response.status === 401) {
                        self.sharedDataService.authenticationFailed = true;
                        self.tokenService.setToken(null);
                        self.$location.path('/login');
                    }
                    if (response.access_token && response.access_token == null) {
                        if (response.email == null) {
                            self.$location.path('/login');
                        }
                        if (!response.mobile_number_confirmed) {
                            self.sharedDataService.tempLoginResult = response;
                            self.$location.path('/login');
                        }
                        self.tokenService.setToken(response.access_token);
                    }
                    return response || _this.$q.when(response);
                };
            }
            AuthInterceptor.$inject = ['Voting.Services.TokenService', 'Voting.Services.SharedDataService',
                '$location', '$q'];
            return AuthInterceptor;
        })();
        Services.AuthInterceptor = AuthInterceptor;
        angular.module('votingApp').service('Voting.Services.AuthInterceptor', AuthInterceptor);
    })(Services = Voting.Services || (Voting.Services = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=AuthInterceptor.js.map