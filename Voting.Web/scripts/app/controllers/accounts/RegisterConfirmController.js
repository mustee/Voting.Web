/// <reference path="../../tsd.d.ts" />
/// <reference path="../../../tools/typings/voting.d.ts" />
var Voting;
(function (Voting) {
    var Controllers;
    (function (Controllers) {
        var Accounts;
        (function (Accounts) {
            var RegisterConfirmController = (function () {
                function RegisterConfirmController($scope, $location, accountService, sharedDataService, staticMessagesService) {
                    this.$scope = $scope;
                    this.$location = $location;
                    this.accountService = accountService;
                    this.sharedDataService = sharedDataService;
                    this.staticMessagesService = staticMessagesService;
                    if (sharedDataService.registerInfoConfirm == null) {
                        $location.path('/register');
                    }
                    $scope.register = sharedDataService.registerInfoConfirm;
                }
                RegisterConfirmController.prototype.registerUser = function () {
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
                    self.accountService.register(self.$scope.register).then(function (result) {
                        if (result.ResultCode !== Voting.Models.Results.ResultCode.SUCCESS) {
                            self.$scope.message = result.Description;
                            return;
                        }
                        self.accountService.login(new Voting.Models.Login(self.$scope.register.authType.toString(), self.$scope.register.authId)).then(function (loginResult) {
                            if (loginResult.status == 400) {
                                self.$location.path('/login');
                                return;
                            }
                            self.sharedDataService.tempLoginResult = loginResult;
                            self.$location.path('/phone');
                        });
                    });
                };
                RegisterConfirmController.prototype.cancel = function () {
                    this.sharedDataService.registerInfoConfirm = null;
                    this.$location.path('/register');
                };
                RegisterConfirmController.$inject = ['$scope', '$location', 'Voting.Services.AccountService', 'Voting.Services.SharedDataService',
                    'Voting.Services.StaticMessagesService'];
                return RegisterConfirmController;
            })();
            Accounts.RegisterConfirmController = RegisterConfirmController;
        })(Accounts = Controllers.Accounts || (Controllers.Accounts = {}));
    })(Controllers = Voting.Controllers || (Voting.Controllers = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=RegisterConfirmController.js.map