/// <reference path="../../../tsd.d.ts" />
/// <reference path="../../../../tools/typings/voting.d.ts" />

module Voting.Controllers.Accounts.Scope {
    export interface ISetPasswordScope extends ng.IScope {

        password: string;

        confirmPassword: string;

        message: string;

        error: boolean;
    }
}