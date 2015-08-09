/// <reference path="../../tsd.d.ts" />
/// <reference path="../../../tools/typings/voting.d.ts" />

module Voting.Controllers.Accounts {
    export class ForgotPasswordController {

        static $inject = ['$scope', '$location', 'Voting.Services.AccountService', 'Voting.Services.SharedDataService', 'Voting.Services.StaticMessagesService'];

        constructor(private $scope: Accounts.Scope.IForgotPasswordScope,
            private $location: ng.ILocationService,
            private accountService: Services.AccountService,
            private sharedDataService: Services.SharedDataService,
            private staticMessageService: Services.StaticMessagesService) {
            
            if (sharedDataService.invalidToken) {
                $scope.error = true;
                $scope.message = staticMessageService.FORGOT_PASSWORD_INVALID_TOKEN;
            }
        }


        forgotPassword() {
            var self = this;

            if (!self.$scope.email || self.$scope.email == null
                || self.$scope.email.length === 0) {
                self.$scope.error = true;
                self.$scope.message = self.staticMessageService.FORGOT_PASSWORD_UNCOMPLETEDFORM;
                return;
            }

            self.accountService.forgotPassword(new Models.ForgotPassword(self.$scope.email)).then(result => {
                if (result == null || result.ResultCode == null) {
                    self.$scope.error = true;
                    self.$scope.message = self.staticMessageService.FORGOT_PASSWORD_ERROR;
                    return;
                }

                if (result.ResultCode !== Models.Results.ResultCode.SUCCESS) {
                    self.$scope.error = true;
                    self.$scope.message = result.Description;
                    return;
                }

                self.$scope.error = false;
                self.$scope.message = self.staticMessageService.FORGOT_PASSWORD_SUCCESS;
                self.$scope.email = null;
            });
        }
    }
}