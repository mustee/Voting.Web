/// <reference path="../../tsd.d.ts" />
/// <reference path="../../../tools/typings/voting.d.ts" />

module Voting.Controllers.Accounts {

    export class RegisterConfirmController {

        static $inject = ['$scope', '$location', 'Voting.Services.AccountService', 'Voting.Services.SharedDataService',
            'Voting.Services.StaticMessagesService'];

        constructor(private $scope: Accounts.Scope.IRegisterConfirmScope,
            private $location: ng.ILocationService,
            private accountService: Services.AccountService,
            private sharedDataService: Services.SharedDataService,
            private staticMessagesService: Services.StaticMessagesService) {

            if (sharedDataService.registerInfoConfirm == null) {
                $location.path('/register');
            }

            $scope.register = sharedDataService.registerInfoConfirm;
        }


        registerUser(): void {
            var self = this;

            if (self.$scope.register == null || self.$scope.register.firstName == null || self.$scope.register.firstName.length == 0
                || self.$scope.register.lastName == null || self.$scope.register.lastName.length == 0
                || self.$scope.register.email == null || self.$scope.register.email.length == 0) {
                self.$scope.message = self.staticMessagesService.REGISTRATION_UNCOMPLETEDFORM;
                return;
            }

            if (self.$scope.register.email !== self.sharedDataService.registerInfoConfirm.email) {
                self.$scope.register.confirmEmail = true;
            }

            self.accountService.register(self.$scope.register).then(result => {
                if (result.ResultCode !== Models.Results.ResultCode.SUCCESS) {
                    self.$scope.message = result.Description;
                    return;
                }

                self.accountService.login(new Models.Login(self.$scope.register.authType.toString(), self.$scope.register.authId)).then(loginResult => {
                    if (loginResult.status == 400) {
                        self.$location.path('/login');
                        return;
                    }

                    self.sharedDataService.tempLoginResult = loginResult;
                    self.$location.path('/phone');
                });
                
            });
        }

        cancel(): void {
            this.sharedDataService.registerInfoConfirm = null;
            this.$location.path('/register');

        }
    }
}