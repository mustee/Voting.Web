/// <reference path="../../../tsd.d.ts" />
/// <reference path="../../../../tools/typings/voting.d.ts" />

module Voting.Controllers.Accounts.Scope {
    export interface IPhoneScope extends ng.IScope {

        country: number;

        phoneNumber: string;

        phoneNumberConfirmationCode: string;

        countries: Models.Country[];

        confirmCode: boolean;

        message: string;
    }
}