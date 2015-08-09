/// <reference path="tsd.d.ts" />
/// <reference path="../tools/typings/voting.d.ts" />
var Voting;
(function (Voting) {
    'use strict';
    var Routes = (function () {
        function Routes() {
        }
        Routes.configure = function ($routeProvider) {
            var viewBase = '../scripts/app/views/';
            $routeProvider
                .when('/login', {
                controller: Voting.Controllers.Accounts.LoginController,
                controllerAs: 'vm',
                templateUrl: viewBase + "accounts/Login.html"
            })
                .when('/forgotpassword', {
                controller: Voting.Controllers.Accounts.ForgotPasswordController,
                controllerAs: 'vm',
                templateUrl: viewBase + "accounts/ForgotPassword.html"
            })
                .when('/setpassword', {
                controller: Voting.Controllers.Accounts.SetPasswordController,
                controllerAs: 'vm',
                templateUrl: viewBase + "accounts/SetPassword.html"
            })
                .when('/register', {
                controller: Voting.Controllers.Accounts.RegisterController,
                controllerAs: 'vm',
                templateUrl: viewBase + "accounts/Register.html"
            })
                .when('/confirm', {
                controller: Voting.Controllers.Accounts.ConfirmController,
                controllerAs: 'vm',
                templateUrl: viewBase + "accounts/Confirm.html"
            })
                .when('/registerconfirm', {
                controller: Voting.Controllers.Accounts.RegisterConfirmController,
                controllerAs: 'vm',
                templateUrl: viewBase + "accounts/RegisterConfirm.html"
            })
                .when('/phone', {
                controller: Voting.Controllers.Accounts.PhoneController,
                controllerAs: 'vm',
                templateUrl: viewBase + "accounts/Phone.html"
            })
                .when('/vote', {
                controller: Voting.Controllers.Vote.VoteController,
                controllerAs: 'vm',
                templateUrl: viewBase + "vote/Vote.html"
            })
                .otherwise({ redirectTo: '/login' });
        };
        return Routes;
    })();
    Voting.Routes = Routes;
})(Voting || (Voting = {}));
//# sourceMappingURL=app.route.js.map