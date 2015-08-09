/// <reference path="../../tsd.d.ts" />
/// <reference path="../../../tools/typings/voting.d.ts" />
var Voting;
(function (Voting) {
    var Controllers;
    (function (Controllers) {
        var Accounts;
        (function (Accounts) {
            var ForgotPasswordController = (function () {
                function ForgotPasswordController($scope, $location, accountService, sharedDataService, staticMessageService) {
                    this.$scope = $scope;
                    this.$location = $location;
                    this.accountService = accountService;
                    this.sharedDataService = sharedDataService;
                    this.staticMessageService = staticMessageService;
                    if (sharedDataService.invalidToken) {
                        $scope.error = true;
                        $scope.message = staticMessageService.FORGOT_PASSWORD_INVALID_TOKEN;
                    }
                }
                ForgotPasswordController.prototype.forgotPassword = function () {
                    var self = this;
                    if (!self.$scope.email || self.$scope.email == null
                        || self.$scope.email.length === 0) {
                        self.$scope.error = true;
                        self.$scope.message = self.staticMessageService.FORGOT_PASSWORD_UNCOMPLETEDFORM;
                        return;
                    }
                    self.accountService.forgotPassword(new Voting.Models.ForgotPassword(self.$scope.email)).then(function (result) {
                        if (result == null || result.ResultCode == null) {
                            self.$scope.error = true;
                            self.$scope.message = self.staticMessageService.FORGOT_PASSWORD_ERROR;
                            return;
                        }
                        if (result.ResultCode !== Voting.Models.Results.ResultCode.SUCCESS) {
                            self.$scope.error = true;
                            self.$scope.message = result.Description;
                            return;
                        }
                        self.$scope.error = false;
                        self.$scope.message = self.staticMessageService.FORGOT_PASSWORD_SUCCESS;
                        self.$scope.email = null;
                    });
                };
                ForgotPasswordController.$inject = ['$scope', '$location', 'Voting.Services.AccountService', 'Voting.Services.SharedDataService', 'Voting.Services.StaticMessagesService'];
                return ForgotPasswordController;
            })();
            Accounts.ForgotPasswordController = ForgotPasswordController;
        })(Accounts = Controllers.Accounts || (Controllers.Accounts = {}));
    })(Controllers = Voting.Controllers || (Voting.Controllers = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=ForgotPasswordController.js.map