module Voting.Services {
    'use strict';

    export class SharedDataService {

        showEmailConfirmation: boolean;

        isConfirmed: boolean;

        confirmationUnsuccessful: boolean;

        hasSetPassword: boolean;

        invalidToken: boolean = false;

        message: string;

        authenticationFailed: boolean;

        registerInfoConfirm: Models.Register;

        tempLoginResult: Models.Results.LoginResult;

    }

    angular.module('votingApp').service('Voting.Services.SharedDataService', SharedDataService);
}