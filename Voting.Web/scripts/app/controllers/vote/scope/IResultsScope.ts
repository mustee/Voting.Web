/// <reference path="../../../tsd.d.ts" />
/// <reference path="../../../../tools/typings/voting.d.ts" />

module Voting.Controllers.Vote.Scope {

    export interface IResultsScope extends ng.IScope {

        candidates: Models.Candidate[];

        position: string;

        current: number;

        nextText: string;

        role: Models.Role;
    }
}