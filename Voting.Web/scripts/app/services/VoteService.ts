/// <reference path="../tsd.d.ts" />
/// <reference path="../../tools/typings/voting.d.ts" />

module Voting.Services {
    'use strict';

    export class VoteService {

        static $inject = ['$http', '$q', 'apiBaseUrl', 'Voting.Services.TokenService'];
        constructor(private $http: ng.IHttpService,
            private $q: ng.IQService,
            private apiBaseUrl: string,
            private tokenService: Services.TokenService) {
            
        }


        getAllPositions(): ng.IPromise<Models.Results.ListResult<Models.Position>> {
            var self = this;
            var deferred = self.$q.defer();

            self.$http.get(self.apiBaseUrl + 'vote/positions')
                .then(data => {
                var result = <Models.Results.ListResult<Models.Position>> data.data;
                    deferred.resolve(result);
                }, error => {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        getAllCandidates(positionId: number): ng.IPromise<Models.Results.ListResult<Models.Candidate>> {
            var self = this;
            var deferred = self.$q.defer();

            self.$http.get(self.apiBaseUrl + 'vote/candidates?positionId=' + positionId)
                .then(data => {
                    var result = <Models.Results.ListResult<Models.Candidate>> data.data;
                    deferred.resolve(result);
                }, error => {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        getResult(positionId: number): ng.IPromise<Models.Results.ItemResult<Models.Vote>> {
            var self = this;
            var deferred = self.$q.defer();

            self.$http.get(self.apiBaseUrl + 'vote?positionId=' + positionId)
                .then(data => {
                var result = <Models.Results.ItemResult<Models.Vote>> data.data;
                    deferred.resolve(result);
                }, error => {
                    deferred.reject(error);
                });
            return deferred.promise;
        }


        vote(candidateId: number): ng.IPromise<Models.Results.Result> {
            var self = this;
            var deferred = self.$q.defer();

            self.$http.post(self.apiBaseUrl + 'vote', new Models.Candidate(candidateId))
                .then(data => {
                var result = <Models.Results.Result> data.data;
                    deferred.resolve(result);
                }, error => {
                    deferred.reject(error);
                });
            return deferred.promise;
        }
    }

    angular.module('votingApp').service('Voting.Services.VoteService', VoteService);
}