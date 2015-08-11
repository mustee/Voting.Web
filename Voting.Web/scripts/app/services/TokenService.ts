/// <reference path="../tsd.d.ts" />
/// <reference path="../../tools/typings/voting.d.ts" />

module Voting.Services {
    'use strict';

    export class TokenService {

        static $inject = ['localStorageService'];
        constructor(private localStorageService: angular.localStorage.ILocalStorageService) {
        }

        getToken(): Models.Token {
            return this.localStorageService.get('pt_voting_token'); 
        }

        setToken(token: string, role?: Models.Role): void {
            this.localStorageService.set('pt_voting_token', new Models.Token(token, role, new Date(), new Date()));
        }
    }

    angular.module('votingApp').service('Voting.Services.TokenService', TokenService);
}