/// <reference path="../tsd.d.ts" />
/// <reference path="../../tools/typings/voting.d.ts" />

module Voting.Services {
    'use strict';

    export class StaticMessagesService {
        constructor() { }
        REGISTRATION_UNCOMPLETEDFORM: string = 'Please complete the form. Some fields are empty.';
        REGISTRATION_UNACCEPTEDTERMS: string = 'Please accept the terms of conditions to register';

        LOGIN_FAILED: string = 'Email or password is not correct.';
        LOGIN_CONFIRMEMAIL: string = 'Please login to your email, click on the link provided to complete registration.';
        LOGIN_UNCOMPLETEDFORM: string = 'Please complete the form. Some fields are empty.';
        LOGIN_CONFIRMED: string = 'Thank you for confirming your account';
        LOGIN_CONFIRMUNSUCCESSFULL: string = 'Sorry your account could not be confirmed. Please check that the url is correct.';
        LOGIN_AUTHENTICATIONFAILED: string = 'Your session has expired. Please login to continue.';
        LOGIN_SETPASSWORD: string = 'You have changed your password. Please login to vote.';

        PHONE_UNCOMPLETEDFORM: string = 'Please complete the form. Some fields are empty.';
        PHONE_UNSUCESSFULREGISTRATION: string = 'Sorry we could not update your phone number.';

        FORGOT_PASSWORD_UNCOMPLETEDFORM: string = 'Please enter your email address.';
        FORGOT_PASSWORD_ERROR: string = 'Sorry we could not complete your request';
        FORGOT_PASSWORD_SUCCESS: string = 'Please check your email for the link to reset your password.';
        FORGOT_PASSWORD_INVALID_TOKEN: string = 'Token is either empty or invalid.';

        SETPASSWORD_NO_TOKEN: string = 'Token is either empty or invalid.';
        SETPASSWORD_UNCOMPLETEDFORM: string = 'Please complete the form. Some fields are empty.';
        SETPASSWORD_NO_MATCH: string = 'Passwords do not match.';
        SETPASSWORD_REQUEST_UNCOMPLETED: string = 'Could not update your password. Please try later.';
    }

    angular.module('votingApp').service('Voting.Services.StaticMessagesService', StaticMessagesService);
}