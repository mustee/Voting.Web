/// <reference path="../../tsd.d.ts" />
/// <reference path="../../../tools/typings/voting.d.ts" />

module Voting.Controllers.Accounts {

    export class SetPasswordController {

        static $inject = ['$scope', '$routeParams', '$location', 'Voting.Services.AccountService', 'Voting.Services.SharedDataService', 'Voting.Services.StaticMessagesService'];
        constructor(private $scope: Accounts.Scope.ISetPasswordScope,
            private $routeParams: Accounts.Scope.ISetPasswordRouteParams,
            private $location: ng.ILocationService,
            private accountService: Services.AccountService,
            private sharedDataService: Services.SharedDataService,
            private staticMessagesService: Services.StaticMessagesService) {
            
            if (!$routeParams.token || $routeParams.token == null) {
                sharedDataService.invalidToken = true;
                $location.path('/forgotpassword');
                return;
            }

            accountService.confirmForgotPasswordToken(new Models.Confirm($routeParams.token)).then(result => {
                if (result == null) {
                    sharedDataService.invalidToken = true;
                    $location.url('/forgotpassword');
                    return;
                }

                if (result.ResultCode !== Models.Results.ResultCode.SUCCESS) {
                    sharedDataService.invalidToken = true;
                    $location.url('/forgotpassword');
                    return;
                }


            });
        }

        setPassword(): void {
            var self = this;

            if (!self.$scope.password || self.$scope.password == null || self.$scope.password.length === 0
                || !self.$scope.confirmPassword || self.$scope.confirmPassword == null || self.$scope.confirmPassword.length === 0) {
                self.$scope.error = true;
                self.$scope.message = self.staticMessagesService.SETPASSWORD_UNCOMPLETEDFORM;
                return;
            }

            if (self.$scope.password !== self.$scope.confirmPassword) {
                self.$scope.error = true;
                self.$scope.message = self.staticMessagesService.SETPASSWORD_NO_MATCH;
                return;
            }

            self.accountService.setPassword(new Models.SetPassword(self.$scope.password, self.$scope.confirmPassword, self.$routeParams.token)).then(result => {
                if (result == null) {
                    self.$scope.error = true;
                    self.$scope.message = self.staticMessagesService.SETPASSWORD_REQUEST_UNCOMPLETED;
                    return;
                }

                if (result.ResultCode !== Models.Results.ResultCode.SUCCESS) {
                    self.$scope.error = true;
                    self.$scope.message = result.Description;
                    return;
                }

                self.sharedDataService.hasSetPassword = true;
                self.$location.url('/login');
            });
        }


    }
}