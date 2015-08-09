/// <reference path="../../tsd.d.ts" />
/// <reference path="../../../tools/typings/voting.d.ts" />
var Voting;
(function (Voting) {
    var Controllers;
    (function (Controllers) {
        var Accounts;
        (function (Accounts) {
            var ConfirmController = (function () {
                function ConfirmController($routeParams, $location, accountService, sharedDataService, staticMessageService) {
                    var _this = this;
                    this.$routeParams = $routeParams;
                    this.$location = $location;
                    this.accountService = accountService;
                    this.sharedDataService = sharedDataService;
                    this.staticMessageService = staticMessageService;
                    if ($routeParams.token == null) {
                        sharedDataService.confirmationUnsuccessful = true;
                        sharedDataService.message = staticMessageService.LOGIN_CONFIRMUNSUCCESSFULL;
                        $location.url('/login');
                        return;
                    }
                    var confirm = new Voting.Models.Confirm(this.$routeParams.token);
                    this.accountService.confirm(confirm).then(function (result) {
                        console.log(result);
                        if (result.ResultCode !== Voting.Models.Results.ResultCode.SUCCESS) {
                            sharedDataService.confirmationUnsuccessful = true;
                            sharedDataService.message = result.Description;
                            _this.$location.url('/login');
                            return;
                        }
                        sharedDataService.confirmationUnsuccessful = false;
                        sharedDataService.isConfirmed = true;
                        _this.$location.path('/login');
                    });
                }
                ConfirmController.$inject = ['$routeParams', '$location', 'Voting.Services.AccountService', 'Voting.Services.SharedDataService'];
                return ConfirmController;
            })();
            Accounts.ConfirmController = ConfirmController;
            angular.module('votingApp').controller('Voting.Controllers.Accounts.ConfirmController', ConfirmController);
        })(Accounts = Controllers.Accounts || (Controllers.Accounts = {}));
    })(Controllers = Voting.Controllers || (Voting.Controllers = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=ConfirmController.js.map