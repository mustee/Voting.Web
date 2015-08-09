/// <reference path="tsd.d.ts" />
/// <reference path="../tools/typings/voting.d.ts" />

module Voting {
    'use strict';

    export class Routes {
        static configure($routeProvider: ng.route.IRouteProvider) {
            var viewBase: string = '../scripts/app/views/';

            $routeProvider
                .when('/login', {
                    controller: Controllers.Accounts.LoginController,
                    controllerAs: 'vm',
                    templateUrl: viewBase + "accounts/Login.html"
                })
                .when('/forgotpassword', {
                    controller: Controllers.Accounts.ForgotPasswordController,
                    controllerAs: 'vm',
                    templateUrl: viewBase + "accounts/ForgotPassword.html"
                })
                .when('/setpassword', {
                    controller: Controllers.Accounts.SetPasswordController,
                    controllerAs: 'vm',
                    templateUrl: viewBase + "accounts/SetPassword.html"
                })
                .when('/register', {
                    controller: Controllers.Accounts.RegisterController,
                    controllerAs: 'vm',
                    templateUrl: viewBase + "accounts/Register.html"
                })
                .when('/confirm', {
                    controller: Controllers.Accounts.ConfirmController,
                    controllerAs: 'vm',
                    templateUrl: viewBase + "accounts/Confirm.html"
                })
                .when('/registerconfirm', {
                    controller: Controllers.Accounts.RegisterConfirmController,
                    controllerAs: 'vm',
                    templateUrl: viewBase + "accounts/RegisterConfirm.html"
                }) 
                .when('/phone', {
                    controller: Controllers.Accounts.PhoneController,
                    controllerAs: 'vm',
                    templateUrl: viewBase + "accounts/Phone.html"
                })      
                .when('/vote', {
                    controller: Controllers.Vote.VoteController,
                    controllerAs: 'vm',
                    templateUrl: viewBase + "vote/Vote.html"
                })       
                .otherwise({ redirectTo: '/login' });
        }
    }
}