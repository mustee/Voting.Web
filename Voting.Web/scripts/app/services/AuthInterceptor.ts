/// <reference path="../tsd.d.ts" />
/// <reference path="../../tools/typings/voting.d.ts" />

module Voting.Services {
    'use strict';

    export class AuthInterceptor
    {
        static $inject = ['Voting.Services.TokenService', 'Voting.Services.SharedDataService',
            '$location', '$q'];

        constructor(private tokenService: Services.TokenService,
            private sharedDataService: Services.SharedDataService,
            private $location: ng.ILocationService,
            private $q: ng.IQService) {
        }

        public request = (config) => {
            config.headers = config.headers || {};
            if (this.tokenService.getToken() != null && this.tokenService.getToken().AccessToken != null)
                config.headers.Authorization = 'Bearer ' + this.tokenService.getToken().AccessToken;
            return config;
        }

        public responseError = (response) => {
            var self = this;
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
            return response || this.$q.when(response);
        }
    }

    angular.module('votingApp').service('Voting.Services.AuthInterceptor', AuthInterceptor);
}
