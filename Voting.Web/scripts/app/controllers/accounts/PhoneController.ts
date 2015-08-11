/// <reference path="../../tsd.d.ts" />
/// <reference path="../../../tools/typings/voting.d.ts" />

module Voting.Controllers.Accounts {
    export class PhoneController {

        static $inject = ['$scope', '$location', 'Voting.Services.AccountService', 'Voting.Services.CountryService', 'Voting.Services.StaticMessagesService', 'Voting.Services.SharedDataService', 'Voting.Services.TokenService'];
        constructor(private $scope: Scope.IPhoneScope,
            private $location: ng.ILocationService,
            private accountService: Services.AccountService,
            private countryService: Services.CountryService,
            private staticMessageService: Services.StaticMessagesService,
            private sharedDataService: Services.SharedDataService,
            private tokenService: Services.TokenService) {

            if (sharedDataService.tempLoginResult == null || sharedDataService.tempLoginResult.access_token == null
                || sharedDataService.tempLoginResult.access_token.length == 0) {
                this.$location.path('/login');
                return;
            }

            if (sharedDataService.tempLoginResult.country && sharedDataService.tempLoginResult.country != null) {
                $scope.country = + sharedDataService.tempLoginResult.country;
            }
            if (sharedDataService.tempLoginResult.mobile_number && sharedDataService.tempLoginResult.mobile_number != null) {
                $scope.phoneNumber = sharedDataService.tempLoginResult.mobile_number;
            }

            countryService.getAll().then(result => {
                $scope.countries = result.Items;
            });
        }

        registerPhoneNumber(): void {
            var self = this;

            if (self.$scope.country == null || self.$scope.phoneNumber == null
                || (self.$scope.phoneNumberConfirmationCode == null && self.$scope.confirmCode)) {
                self.$scope.message = self.staticMessageService.PHONE_UNCOMPLETEDFORM;
                return;
            }

            self.accountService.registerPhoneNumber(new Models.Phone(self.$scope.country, self.$scope.phoneNumber, self.$scope.phoneNumberConfirmationCode)).then(result=> {
                if (result == null || result.ResultCode !== Models.Results.ResultCode.SUCCESS) {
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
            
        }

    }

    angular.module('votingApp').controller('Voting.Controllers.Accounts.PhoneController', PhoneController);
}