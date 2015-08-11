/// <reference path="../tsd.d.ts" />
/// <reference path="../../tools/typings/voting.d.ts" />

module Voting.Services {
    'use strict';

    export class AccountService {
        isConnectedToFb: boolean = false;
        static $inject = ['$http', '$q', 'Voting.Services.SharedDataService', 'Facebook', 'apiBaseUrl'];
        
        constructor(private $http: ng.IHttpService,
            private $q: ng.IQService,
            private sharedDataService: Services.SharedDataService,
            private facebook,
            private apiBaseUrl: string) {
            var self = this;

            self.isFacebookConnected().then(result => {
                self.isConnectedToFb = result;
            });
            
        }

        register(register: Models.Register): ng.IPromise<Models.Results.Result> {
            var self = this;
            var deferred = self.$q.defer();

            self.$http.post(self.apiBaseUrl + 'account/register', register)
                .then(data => {
                    var result = <Models.Results.Result> data.data;
                    deferred.resolve(result);
                }, error => {
                    if (error.status === 404) {
                        deferred.reject(error);
                    } else {
                        var result = <Models.Results.Result> error.data;
                        deferred.resolve(result);
                    }
                });
            return deferred.promise;
        }

        login(login: Models.Login): ng.IPromise<any> {
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
                .then(data => {
                    var result = <Models.Results.LoginResult> data.data;
                    deferred.resolve(result);
                }, error => {
                    deferred.resolve(error);              
                });
            return deferred.promise;
        }

        confirm(confirm: Models.Confirm): ng.IPromise<Models.Results.Result> {
            var self = this;
            var deferred = self.$q.defer();

            self.$http.post(self.apiBaseUrl + 'account/confirm', confirm)
                .then(data => {
                var result = <Models.Results.Result> data.data;
                deferred.resolve(result);
            }, error => {
                    if (error.status === 404) {
                        deferred.reject(error);
                    } else {
                        var result = <Models.Results.Result> error.data;
                        deferred.resolve(result);
                    }
                });
            return deferred.promise;
        }

        registerPhoneNumber(phone: Models.Phone): ng.IPromise<Models.Results.Result> {
            var self = this;
            var deferred = self.$q.defer();

            self.$http.post(self.apiBaseUrl + 'account/phone', phone,
                { headers: { 'Authorization': 'Bearer ' + self.sharedDataService.tempLoginResult.access_token } })
                .then(data => {
                    var result = <Models.Results.Result> data.data;
                    deferred.resolve(result);
                }, (): void => {
                    deferred.resolve(null);              
                });
            return deferred.promise;
        }

        registerUserWithFacebook(): ng.IPromise<any> {
            var self = this;
            var deferred = self.$q.defer();

            if (self.isConnectedToFb) {
                self.getFacebookUser().then(fbUser => {
                    deferred.resolve(fbUser);
                });
            } else {
                self.loginToFacebook().then(result => {
                    if (result.status === 'connected') {
                        self.getFacebookUser().then(fbUser => {
                            deferred.resolve(fbUser);
                        });
                    }
                });
            }
            
            return deferred.promise;    
        }

        isFacebookConnected(): ng.IPromise<boolean> {
            var self = this;
            var deferred = self.$q.defer();
            this.facebook.getLoginStatus(response => {
                if (response.status === 'connected') {
                    deferred.resolve(true);
                }
                deferred.resolve(false);
            });

            return deferred.promise;
        }

        loginToFacebook(): ng.IPromise<any> {
            var deferred = this.$q.defer();

            this.facebook.login(response => {
                deferred.resolve(response);
            }, { scope: 'email' });
            return deferred.promise;
        }

        getFacebookUser(): ng.IPromise<any> {
            var deferred = this.$q.defer();

            this.facebook.api('/me?fields=email,first_name,last_name,middle_name', response => {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        forgotPassword(forgotPassword: Models.ForgotPassword): ng.IPromise<Models.Results.Result> {
            var self = this;
            var deferred = self.$q.defer();

            self.$http.post(self.apiBaseUrl + 'account/forgotpassword', forgotPassword)
                .then(data => {
                    var result = <Models.Results.Result> data.data;
                    deferred.resolve(result);
                }, (): void => {
                    deferred.resolve(null);
                });
            return deferred.promise;
        }


        confirmForgotPasswordToken(confirm: Models.Confirm): ng.IPromise<Models.Results.Result> {
            var self = this;
            var deferred = self.$q.defer();

            self.$http.post(self.apiBaseUrl + 'account/confirmforgotpasswordtoken', confirm)
                .then(data => {
                    var result = <Models.Results.Result> data.data;
                    deferred.resolve(result);
                }, (): void => {
                    deferred.resolve(null);
                });
            return deferred.promise;
        }


        setPassword(setPassword: Models.SetPassword): ng.IPromise<Models.Results.Result> {
            var self = this;
            var deferred = self.$q.defer();

            self.$http.post(self.apiBaseUrl + 'account/setpassword', setPassword)
                .then(data => {
                    var result = <Models.Results.Result> data.data;
                    deferred.resolve(result);
                }, (): void => {
                    deferred.resolve(null);
                });
            return deferred.promise;
        }

    }

    angular.module('votingApp').service('Voting.Services.AccountService', AccountService);
}