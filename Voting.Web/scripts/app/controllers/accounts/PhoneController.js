/// <reference path="../../tsd.d.ts" />
/// <reference path="../../../tools/typings/voting.d.ts" />
var Voting;
(function (Voting) {
    var Controllers;
    (function (Controllers) {
        var Accounts;
        (function (Accounts) {
            var PhoneController = (function () {
                function PhoneController($scope, $location, accountService, countryService, staticMessageService, sharedDataService, tokenService) {
                    this.$scope = $scope;
                    this.$location = $location;
                    this.accountService = accountService;
                    this.countryService = countryService;
                    this.staticMessageService = staticMessageService;
                    this.sharedDataService = sharedDataService;
                    this.tokenService = tokenService;
                    if (sharedDataService.tempLoginResult == null || sharedDataService.tempLoginResult.access_token == null
                        || sharedDataService.tempLoginResult.access_token.length == 0) {
                        this.$location.path('/login');
                        return;
                    }
                    if (sharedDataService.tempLoginResult.country && sharedDataService.tempLoginResult.country != null) {
                        $scope.country = +sharedDataService.tempLoginResult.country;
                    }
                    if (sharedDataService.tempLoginResult.mobile_number && sharedDataService.tempLoginResult.mobile_number != null) {
                        $scope.phoneNumber = sharedDataService.tempLoginResult.mobile_number;
                    }
                    countryService.getAll().then(function (result) {
                        $scope.countries = result.Items;
                    });
                }
                PhoneController.prototype.registerPhoneNumber = function () {
                    var self = this;
                    if (self.$scope.country == null || self.$scope.phoneNumber == null
                        || (self.$scope.phoneNumberConfirmationCode == null && self.$scope.confirmCode)) {
                        self.$scope.message = self.staticMessageService.PHONE_UNCOMPLETEDFORM;
                        return;
                    }
                    self.accountService.registerPhoneNumber(new Voting.Models.Phone(self.$scope.country, self.$scope.phoneNumber, self.$scope.phoneNumberConfirmationCode)).then(function (result) {
                        if (result == null || result.ResultCode !== Voting.Models.Results.ResultCode.SUCCESS) {
                            self.$scope.message = self.staticMessageService.PHONE_UNSUCESSFULREGISTRATION;
                            return;
                        }
                        if (self.$scope.confirmCode) {
                            self.tokenService.setToken(self.sharedDataService.tempLoginResult.access_token, +self.sharedDataService.tempLoginResult.role);
                            self.$location.path('/vote');
                            return;
                        }
                        self.$scope.confirmCode = true;
                    });
                };
                PhoneController.$inject = ['$scope', '$location', 'Voting.Services.AccountService', 'Voting.Services.CountryService', 'Voting.Services.StaticMessagesService', 'Voting.Services.SharedDataService', 'Voting.Services.TokenService'];
                return PhoneController;
            })();
            Accounts.PhoneController = PhoneController;
            angular.module('votingApp').controller('Voting.Controllers.Accounts.PhoneController', PhoneController);
        })(Accounts = Controllers.Accounts || (Controllers.Accounts = {}));
    })(Controllers = Voting.Controllers || (Voting.Controllers = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=PhoneController.js.map