/// <reference path="../tsd.d.ts" />
/// <reference path="../../tools/typings/voting.d.ts" />
var Voting;
(function (Voting) {
    var Services;
    (function (Services) {
        'use strict';
        var StaticMessagesService = (function () {
            function StaticMessagesService() {
                this.REGISTRATION_UNCOMPLETEDFORM = 'Please complete the form. Some fields are empty.';
                this.REGISTRATION_UNACCEPTEDTERMS = 'Please accept the terms of conditions to register';
                this.LOGIN_FAILED = 'Email or password is not correct.';
                this.LOGIN_CONFIRMEMAIL = 'Please login to your email, click on the link provided to complete registration.';
                this.LOGIN_UNCOMPLETEDFORM = 'Please complete the form. Some fields are empty.';
                this.LOGIN_CONFIRMED = 'Thank you for confirming your account';
                this.LOGIN_CONFIRMUNSUCCESSFULL = 'Sorry your account could not be confirmed. Please check that the url is correct.';
                this.LOGIN_AUTHENTICATIONFAILED = 'Your session has expired. Please login to continue.';
                this.LOGIN_SETPASSWORD = 'You have changed your password. Please login to vote.';
                this.PHONE_UNCOMPLETEDFORM = 'Please complete the form. Some fields are empty.';
                this.PHONE_UNSUCESSFULREGISTRATION = 'Sorry we could not update your phone number.';
                this.FORGOT_PASSWORD_UNCOMPLETEDFORM = 'Please enter your email address.';
                this.FORGOT_PASSWORD_ERROR = 'Sorry we could not complete your request';
                this.FORGOT_PASSWORD_SUCCESS = 'Please check your email for the link to reset your password.';
                this.FORGOT_PASSWORD_INVALID_TOKEN = 'Token is either empty or invalid.';
                this.SETPASSWORD_NO_TOKEN = 'Token is either empty or invalid.';
                this.SETPASSWORD_UNCOMPLETEDFORM = 'Please complete the form. Some fields are empty.';
                this.SETPASSWORD_NO_MATCH = 'Passwords do not match.';
                this.SETPASSWORD_REQUEST_UNCOMPLETED = 'Could not update your password. Please try later.';
            }
            return StaticMessagesService;
        })();
        Services.StaticMessagesService = StaticMessagesService;
        angular.module('votingApp').service('Voting.Services.StaticMessagesService', StaticMessagesService);
    })(Services = Voting.Services || (Voting.Services = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=StaticMessagesService.js.map