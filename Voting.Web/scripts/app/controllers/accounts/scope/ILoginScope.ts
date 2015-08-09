/// <reference path="../../../tsd.d.ts" />
/// <reference path="../../../../tools/typings/voting.d.ts" />

module Voting.Controllers.Accounts.Scope {
    export interface ILoginScope extends ng.IScope {

        login: Models.Login;

        message: string;

        rememberMe: boolean;
    }
}