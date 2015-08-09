/// <reference path="../../tsd.d.ts" />
/// <reference path="../../../tools/typings/voting.d.ts" />
var Voting;
(function (Voting) {
    var Controllers;
    (function (Controllers) {
        var Accounts;
        (function (Accounts) {
            var LoginController = (function () {
                function LoginController($scope, $location, accountService, sharedDataService, staticMessageService, tokenService) {
                    this.$scope = $scope;
                    this.$location = $location;
                    this.accountService = accountService;
                    this.sharedDataService = sharedDataService;
                    this.staticMessageService = staticMessageService;
                    this.tokenService = tokenService;
                    this.error = false;
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
                        }
                        else {
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
                LoginController.prototype.loginUser = function () {
                    var self = this;
                    if (self.$scope.login == null || self.$scope.login.email == null || self.$scope.login.password == null) {
                        self.error = true;
                        self.$scope.message = self.staticMessageService.LOGIN_UNCOMPLETEDFORM;
                        return;
                    }
                    self.accountService.login(this.$scope.login).then(function (result) {
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
                        self.tokenService.setToken(result.access_token);
                        self.$location.path('/vote');
                    });
                };
                LoginController.prototype.registerWithFacebook = function () {
                    var self = this;
                    self.accountService.registerUserWithFacebook().then(function (user) {
                        if (user != null) {
                            console.log(user);
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
                LoginController.prototype.getMessageClass = function () {
                    var self = this;
                    if (self.sharedDataService.confirmationUnsuccessful || self.sharedDataService.showEmailConfirmation
                        || self.sharedDataService.authenticationFailed || self.error) {
                        return "alert alert-danger";
                    }
                    return "alert alert-success";
                };
                LoginController.$inject = ['$scope', '$location', 'Voting.Services.AccountService', 'Voting.Services.SharedDataService',
                    'Voting.Services.StaticMessagesService', 'Voting.Services.TokenService'];
                return LoginController;
            })();
            Accounts.LoginController = LoginController;
            angular.module('votingApp').controller('Voting.Controllers.Accounts.LoginController', LoginController);
        })(Accounts = Controllers.Accounts || (Controllers.Accounts = {}));
    })(Controllers = Voting.Controllers || (Voting.Controllers = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=LoginController.js.map