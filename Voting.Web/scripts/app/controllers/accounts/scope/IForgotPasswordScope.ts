/// <reference path="../../../tsd.d.ts" />
/// <reference path="../../../../tools/typings/voting.d.ts" />

module Voting.Controllers.Accounts.Scope {
    export interface IForgotPasswordScope extends ng.IScope {

        email:string;

        message: string;

        error: boolean;
    }
}