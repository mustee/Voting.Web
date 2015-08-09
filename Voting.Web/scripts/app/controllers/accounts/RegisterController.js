/// <reference path="../../tsd.d.ts" />
/// <reference path="../../../tools/typings/voting.d.ts" />
var Voting;
(function (Voting) {
    var Controllers;
    (function (Controllers) {
        var Accounts;
        (function (Accounts) {
            var RegisterController = (function () {
                function RegisterController($scope, $location, accountService, tokenService, sharedDataService, staticMessagesService) {
                    this.$scope = $scope;
                    this.$location = $location;
                    this.accountService = accountService;
                    this.tokenService = tokenService;
                    this.sharedDataService = sharedDataService;
                    this.staticMessagesService = staticMessagesService;
                }
                RegisterController.prototype.registerUser = function () {
                    var _this = this;
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
                    this.accountService.register(this.$scope.register).then(function (result) {
                        if (result.ResultCode !== Voting.Models.Results.ResultCode.SUCCESS) {
                            _this.$scope.message = result.Description;
                            return;
                        }
                        _this.sharedDataService.showEmailConfirmation = true;
                        _this.$location.path('/login');
                    });
                };
                RegisterController.prototype.registerWithFacebook = function () {
                    var self = this;
                    self.accountService.registerUserWithFacebook().then(function (user) {
                        if (user != null) {
                            self.accountService.login(new Voting.Models.Login(Voting.Models.AuthType.FACEBOOK.toString(), user.id))
                                .then(function (loginResult) {
                                if (loginResult.status == 400) {
                                    self.sharedDataService.registerInfoConfirm = new Voting.Models.Register(user.first_name, user.last_name, user.middle_name, null, user.email, Voting.Models.AuthType.FACEBOOK, user.id);
                                    self.$location.path('/registerconfirm');
                                }
                                else if (loginResult.mobile_number == null || loginResult.country == null) {
                                    self.sharedDataService.tempLoginResult = loginResult;
                                    self.$location.path('/phone');
                                }
                                else {
                                    self.tokenService.setToken(loginResult.access_token);
                                    self.$location.path('/vote');
                                }
                            });
                        }
                    });
                };
                RegisterController.$inject = ['$scope', '$location', 'Voting.Services.AccountService', 'Voting.Services.TokenService',
                    'Voting.Services.SharedDataService', 'Voting.Services.StaticMessagesService'];
                return RegisterController;
            })();
            Accounts.RegisterController = RegisterController;
            angular.module('votingApp').controller('Voting.Controllers.Accounts.RegisterController', RegisterController);
        })(Accounts = Controllers.Accounts || (Controllers.Accounts = {}));
    })(Controllers = Voting.Controllers || (Voting.Controllers = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=RegisterController.js.map