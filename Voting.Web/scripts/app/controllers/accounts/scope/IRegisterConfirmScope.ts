/// <reference path="../../../tsd.d.ts" />
/// <reference path="../../../../tools/typings/Voting.d.ts" />

module Voting.Controllers.Accounts.Scope {
    export interface IRegisterConfirmScope extends ng.IScope {

        register: Models.Register;

        message: string;

    }
}