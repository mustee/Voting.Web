/// <reference path="../tsd.d.ts" />
/// <reference path="../../tools/typings/voting.d.ts" />

module Voting.Services {
    'use strict';

    export class CountryService {

        static $inject = ['$http', '$q', 'apiBaseUrl'];

        constructor(private $http: ng.IHttpService,
            private $q: ng.IQService,
            private apiBaseUrl: string) {
        }

        getAll(): ng.IPromise<Models.Results.ListResult<Models.Country>> {
            var self = this;
            var deferred = self.$q.defer();

            self.$http.get(self.apiBaseUrl + 'country/all')
                .then(data => {
                var result = <Models.Results.ListResult<Models.Country>> data.data;
                    deferred.resolve(result);
                }, error => {
                    deferred.reject(error);         
                });
            return deferred.promise;
        }
    }

    angular.module('votingApp').service('Voting.Services.CountryService', CountryService);
}