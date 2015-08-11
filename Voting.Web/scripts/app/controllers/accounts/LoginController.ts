/// <reference path="../../tsd.d.ts" />
/// <reference path="../../../tools/typings/voting.d.ts" />

module Voting.Controllers.Accounts {
    export class LoginController {
        private error: boolean = false;

        static $inject = ['$scope', '$location', 'Voting.Services.AccountService', 'Voting.Services.SharedDataService',
            'Voting.Services.StaticMessagesService', 'Voting.Services.TokenService'];

        constructor(private $scope: Accounts.Scope.ILoginScope,
            private $location: ng.ILocationService,
            private accountService: Services.AccountService,
            private sharedDataService: Services.SharedDataService,
            private staticMessageService: Services.StaticMessagesService,
            private tokenService: Services.TokenService) {

            if (this.tokenService.getToken() != null && this.tokenService.getToken().AccessToken != null) {
                this.$location.path('/vote');
                return;
            }

            if (this.sharedDataService.hasSetPassword) {
                this.error = false;
                this.$scope.message = this.staticMessageService.LOGIN_SETPASSWORD;
            }

            if (this.sharedDataService.showEmailConfirmation) {
                this.$scope.message = this.staticMessageService.LOGIN_CONFIRMEMAIL;
            }

            if (this.sharedDataService.confirmationUnsuccessful) {
                if (this.sharedDataService.message == null) {
                    this.$scope.message = this.staticMessageService.LOGIN_CONFIRMUNSUCCESSFULL;
                } else {
                    this.$scope.message = this.sharedDataService.message;
                }
            }

            if (this.sharedDataService.isConfirmed) {
                this.$scope.message = this.staticMessageService.LOGIN_CONFIRMED;
            }

            if (this.sharedDataService.authenticationFailed) {
                this.$scope.message = this.staticMessageService.LOGIN_AUTHENTICATIONFAILED;
            }
        }

        loginUser() {
            var self = this;
            if (self.$scope.login == null || self.$scope.login.email == null || self.$scope.login.password == null) {
                self.error = true;
                self.$scope.message = self.staticMessageService.LOGIN_UNCOMPLETEDFORM;
                return;
            }

            self.accountService.login(this.$scope.login).then(result => {
                if (result == null) {
                    self.error = true;
                    self.$scope.message = self.staticMessageService.LOGIN_FAILED;
                    return;
                }

                if (result.email == null) {
                    self.error = true;
                    self.$scope.message = self.staticMessageService.LOGIN_CONFIRMEMAIL;
                    return;
                }

                if (!result.mobile_number_confirmed) {
                    self.sharedDataService.tempLoginResult = result;
                    self.$location.path('/phone');
                    return;
                }

                self.tokenService.setToken(result.access_token, +result.role);
                self.$location.path('/vote');
            });     
        }

        registerWithFacebook(): void {
            var self = this;
            self.accountService.registerUserWithFacebook().then(user => {
                if (user != null) {
                    console.log(user);
                    self.accountService.login(new Models.Login(<string>Models.AuthType.FACEBOOK.toString(), user.id))
                        .then(loginResult => {
                        if (loginResult.status == 400 || loginResult.error === 'invalid_grant') {
                                self.sharedDataService.registerInfoConfirm = new Models.Register(user.first_name,
                                    user.last_name, user.middle_name, null, user.email, Models.AuthType.FACEBOOK, user.id);
                                self.$location.path('/registerconfirm');                     
                            } else if (loginResult.mobile_number == null || loginResult.country == null) {
                                self.sharedDataService.tempLoginResult = loginResult;
                                self.$location.path('/phone');
                            } else {
                                self.tokenService.setToken(loginResult.access_token, +loginResult.role);
                                self.$location.path('/vote');
                            }
                        });

                }
            });
        }

        getMessageClass() {
            var self = this;

            if (self.sharedDataService.confirmationUnsuccessful || self.sharedDataService.showEmailConfirmation
                || self.sharedDataService.authenticationFailed || self.error) {
                return "alert alert-danger";
            }

            return "alert alert-success";
        }   
        
    }

    angular.module('votingApp').controller('Voting.Controllers.Accounts.LoginController', LoginController);
    
}