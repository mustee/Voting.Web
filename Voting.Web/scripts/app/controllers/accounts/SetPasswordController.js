/// <reference path="../../tsd.d.ts" />
/// <reference path="../../../tools/typings/voting.d.ts" />
var Voting;
(function (Voting) {
    var Controllers;
    (function (Controllers) {
        var Accounts;
        (function (Accounts) {
            var SetPasswordController = (function () {
                function SetPasswordController($scope, $routeParams, $location, accountService, sharedDataService, staticMessagesService) {
                    this.$scope = $scope;
                    this.$routeParams = $routeParams;
                    this.$location = $location;
                    this.accountService = accountService;
                    this.sharedDataService = sharedDataService;
                    this.staticMessagesService = staticMessagesService;
                    if (!$routeParams.token || $routeParams.token == null) {
                        sharedDataService.invalidToken = true;
                        $location.path('/forgotpassword');
                        return;
                    }
                    accountService.confirmForgotPasswordToken(new Voting.Models.Confirm($routeParams.token)).then(function (result) {
                        if (result == null) {
                            sharedDataService.invalidToken = true;
                            $location.url('/forgotpassword');
                            return;
                        }
                        if (result.ResultCode !== Voting.Models.Results.ResultCode.SUCCESS) {
                            sharedDataService.invalidToken = true;
                            $location.url('/forgotpassword');
                            return;
                        }
                    });
                }
                SetPasswordController.prototype.setPassword = function () {
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
                    self.accountService.setPassword(new Voting.Models.SetPassword(self.$scope.password, self.$scope.confirmPassword, self.$routeParams.token)).then(function (result) {
                        if (result == null) {
                            self.$scope.error = true;
                            self.$scope.message = self.staticMessagesService.SETPASSWORD_REQUEST_UNCOMPLETED;
                            return;
                        }
                        if (result.ResultCode !== Voting.Models.Results.ResultCode.SUCCESS) {
                            self.$scope.error = true;
                            self.$scope.message = result.Description;
                            return;
                        }
                        self.sharedDataService.hasSetPassword = true;
                        self.$location.url('/login');
                    });
                };
                SetPasswordController.$inject = ['$scope', '$routeParams', '$location', 'Voting.Services.AccountService', 'Voting.Services.SharedDataService', 'Voting.Services.StaticMessagesService'];
                return SetPasswordController;
            })();
            Accounts.SetPasswordController = SetPasswordController;
        })(Accounts = Controllers.Accounts || (Controllers.Accounts = {}));
    })(Controllers = Voting.Controllers || (Voting.Controllers = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=SetPasswordController.js.map