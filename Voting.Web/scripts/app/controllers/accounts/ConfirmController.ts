/// <reference path="../../tsd.d.ts" />
/// <reference path="../../../tools/typings/voting.d.ts" />

module Voting.Controllers.Accounts {
    export class ConfirmController {

        static $inject = ['$routeParams', '$location', 'Voting.Services.AccountService', 'Voting.Services.SharedDataService'];

        constructor(private $routeParams: Accounts.Scope.IConfirmRouteParams,
            private $location: ng.ILocationService,
            private accountService: Services.AccountService,
            private sharedDataService: Services.SharedDataService,
            private staticMessageService: Services.StaticMessagesService) {

            if ($routeParams.token == null) {
                sharedDataService.confirmationUnsuccessful = true;
                sharedDataService.message = staticMessageService.LOGIN_CONFIRMUNSUCCESSFULL;
                $location.url('/login');
                return;
            }

            var confirm = new Models.Confirm(this.$routeParams.token);
            this.accountService.confirm(confirm).then(result => {
                console.log(result);
                if (result.ResultCode !== Models.Results.ResultCode.SUCCESS) {
                    sharedDataService.confirmationUnsuccessful = true;
                    sharedDataService.message = result.Description;
                    this.$location.url('/login');
                    return;
                }
                
                sharedDataService.confirmationUnsuccessful = false;
                sharedDataService.isConfirmed = true;
                this.$location.path('/login');
            });    
        }


    }

    angular.module('votingApp').controller('Voting.Controllers.Accounts.ConfirmController', ConfirmController);
}