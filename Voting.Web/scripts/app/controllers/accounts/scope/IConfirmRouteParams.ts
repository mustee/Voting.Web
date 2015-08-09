/// <reference path="../../../tsd.d.ts" />
/// <reference path="../../../../tools/typings/voting.d.ts" />

module Voting.Controllers.Accounts.Scope {
    export interface IConfirmRouteParams extends ng.route.IRouteParamsService{
        token: string;
    }
}