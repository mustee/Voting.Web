/// <reference path="../../tsd.d.ts" />
/// <reference path="../../../tools/typings/voting.d.ts" />

module Voting.Controllers.Accounts {

    export class RegisterController {

        static $inject = ['$scope', '$location', 'Voting.Services.AccountService', 'Voting.Services.TokenService',
            'Voting.Services.SharedDataService', 'Voting.Services.StaticMessagesService'];

        constructor(private $scope: Accounts.Scope.IRegisterScope,
            private $location: ng.ILocationService,
            private accountService: Services.AccountService,
            private tokenService: Services.TokenService,
            private sharedDataService: Services.SharedDataService,
            private staticMessagesService: Services.StaticMessagesService) {
        }

        registerUser() {
            if (this.$scope.register == null || this.$scope.register.firstName == null || this.$scope.register.firstName.length == 0
                || this.$scope.register.lastName == null || this.$scope.register.lastName.length == 0
                || this.$scope.register.email == null || this.$scope.register.email.length == 0
                || this.$scope.register.password == null || this.$scope.register.password.length == 0) {
                this.$scope.message = this.staticMessagesService.REGISTRATION_UNCOMPLETEDFORM;
                return;
            }

            if (!this.$scope.register.accepted) {
                this.$scope.message = this.staticMessagesService.REGISTRATION_UNACCEPTEDTERMS;
                return;
            }
            
            this.accountService.register(this.$scope.register).then(result => {
                if (result.ResultCode !== Models.Results.ResultCode.SUCCESS) {
                    this.$scope.message = result.Description;        
                    return;
                }
                this.sharedDataService.showEmailConfirmation = true;
                this.$location.path('/login');
            });            
        }

        registerWithFacebook(): void {
            var self = this;
            self.accountService.registerUserWithFacebook().then(user => {
                if (user != null) {
                    self.accountService.login(new Models.Login(<string>Models.AuthType.FACEBOOK.toString(), user.id))
                        .then(loginResult => {
                            if (loginResult.status == 400) {
                                self.sharedDataService.registerInfoConfirm = new Models.Register(user.first_name,
                                    user.last_name, user.middle_name, null, user.email, Models.AuthType.FACEBOOK, user.id);
                                self.$location.path('/registerconfirm');
                            } else if (loginResult.mobile_number == null || loginResult.country == null) {
                                self.sharedDataService.tempLoginResult = loginResult;
                                self.$location.path('/phone');
                            } else {
                                self.tokenService.setToken(loginResult.access_token);
                                self.$location.path('/vote');
                            }
                        });

                }
            });
        }  

    }

    angular.module('votingApp').controller('Voting.Controllers.Accounts.RegisterController', RegisterController);
}