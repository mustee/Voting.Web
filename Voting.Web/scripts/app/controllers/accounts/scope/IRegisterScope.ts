/// <reference path="../../../tsd.d.ts" />
/// <reference path="../../../../tools/typings/Voting.d.ts" />

module Voting.Controllers.Accounts.Scope {
    export interface IRegisterScope extends ng.IScope {

        register: Models.Register;

        message: string;

    }
}