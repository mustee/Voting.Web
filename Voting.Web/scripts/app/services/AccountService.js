/// <reference path="../tsd.d.ts" />
/// <reference path="../../tools/typings/voting.d.ts" />
var Voting;
(function (Voting) {
    var Services;
    (function (Services) {
        'use strict';
        var AccountService = (function () {
            function AccountService($http, $q, sharedDataService, facebook, apiBaseUrl) {
                this.$http = $http;
                this.$q = $q;
                this.sharedDataService = sharedDataService;
                this.facebook = facebook;
                this.apiBaseUrl = apiBaseUrl;
                this.isConnectedToFb = false;
                var self = this;
                self.isFacebookConnected().then(function (result) {
                    self.isConnectedToFb = result;
                });
            }
            AccountService.prototype.register = function (register) {
                var self = this;
                var deferred = self.$q.defer();
                self.$http.post(self.apiBaseUrl + 'account/register', register)
                    .then(function (data) {
                    var result = data.data;
                    deferred.resolve(result);
                }, function (error) {
                    if (error.status === 404) {
                        deferred.reject(error);
                    }
                    else {
                        var result = error.data;
                        deferred.resolve(result);
                    }
                });
                return deferred.promise;
            };
            AccountService.prototype.login = function (login) {
                var self = this;
                var deferred = self.$q.defer();
                self.$http({
                    //url: 'http://ptvotingservice.azurewebsites.net/token',
                    url: 'http://localhost:60587/token',
                    method: 'POST',
                    data: $.param({
                        username: login.email,
                        password: login.password,
                        grant_type: 'password'
                    }),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                    .then(function (data) {
                    var result = data.data;
                    deferred.resolve(result);
                }, function (error) {
                    deferred.resolve(error);
                });
                return deferred.promise;
            };
            AccountService.prototype.confirm = function (confirm) {
                var self = this;
                var deferred = self.$q.defer();
                self.$http.post(self.apiBaseUrl + 'account/confirm', confirm)
                    .then(function (data) {
                    var result = data.data;
                    deferred.resolve(result);
                }, function (error) {
                    if (error.status === 404) {
                        deferred.reject(error);
                    }
                    else {
                        var result = error.data;
                        deferred.resolve(result);
                    }
                });
                return deferred.promise;
            };
            AccountService.prototype.registerPhoneNumber = function (phone) {
                var self = this;
                var deferred = self.$q.defer();
                self.$http.post(self.apiBaseUrl + 'account/phone', phone, { headers: { 'Authorization': 'Bearer ' + self.sharedDataService.tempLoginResult.access_token } })
                    .then(function (data) {
                    var result = data.data;
                    deferred.resolve(result);
                }, function () {
                    deferred.resolve(null);
                });
                return deferred.promise;
            };
            AccountService.prototype.registerUserWithFacebook = function () {
                var self = this;
                var deferred = self.$q.defer();
                if (self.isConnectedToFb) {
                    self.getFacebookUser().then(function (fbUser) {
                        deferred.resolve(fbUser);
                    });
                }
                else {
                    self.loginToFacebook().then(function (result) {
                        if (result.status === 'connected') {
                            self.getFacebookUser().then(function (fbUser) {
                                deferred.resolve(fbUser);
                            });
                        }
                    });
                }
                return deferred.promise;
            };
            AccountService.prototype.isFacebookConnected = function () {
                var self = this;
                var deferred = self.$q.defer();
                this.facebook.getLoginStatus(function (response) {
                    if (response.status === 'connected') {
                        deferred.resolve(true);
                    }
                    deferred.resolve(false);
                });
                return deferred.promise;
            };
            AccountService.prototype.loginToFacebook = function () {
                var deferred = this.$q.defer();
                this.facebook.login(function (response) {
                    deferred.resolve(response);
                }, { scope: 'email' });
                return deferred.promise;
            };
            AccountService.prototype.getFacebookUser = function () {
                var deferred = this.$q.defer();
                this.facebook.api('/me?fields=email,first_name,last_name,middle_name', function (response) {
                    deferred.resolve(response);
                });
                return deferred.promise;
            };
            AccountService.prototype.forgotPassword = function (forgotPassword) {
                var self = this;
                var deferred = self.$q.defer();
                self.$http.post(self.apiBaseUrl + 'account/forgotpassword', forgotPassword)
                    .then(function (data) {
                    var result = data.data;
                    deferred.resolve(result);
                }, function () {
                    deferred.resolve(null);
                });
                return deferred.promise;
            };
            AccountService.prototype.confirmForgotPasswordToken = function (confirm) {
                var self = this;
                var deferred = self.$q.defer();
                self.$http.post(self.apiBaseUrl + 'account/confirmforgotpasswordtoken', confirm)
                    .then(function (data) {
                    var result = data.data;
                    deferred.resolve(result);
                }, function () {
                    deferred.resolve(null);
                });
                return deferred.promise;
            };
            AccountService.prototype.setPassword = function (setPassword) {
                var self = this;
                var deferred = self.$q.defer();
                self.$http.post(self.apiBaseUrl + 'account/setpassword', setPassword)
                    .then(function (data) {
                    var result = data.data;
                    deferred.resolve(result);
                }, function () {
                    deferred.resolve(null);
                });
                return deferred.promise;
            };
            AccountService.$inject = ['$http', '$q', 'Voting.Services.SharedDataService', 'Facebook', 'apiBaseUrl'];
            return AccountService;
        })();
        Services.AccountService = AccountService;
        angular.module('votingApp').service('Voting.Services.AccountService', AccountService);
    })(Services = Voting.Services || (Voting.Services = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=AccountService.js.map