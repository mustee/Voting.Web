/// <reference path="../tsd.d.ts" />
/// <reference path="../../tools/typings/voting.d.ts" />
var Voting;
(function (Voting) {
    var Services;
    (function (Services) {
        'use strict';
        var VoteService = (function () {
            function VoteService($http, $q, apiBaseUrl, tokenService) {
                this.$http = $http;
                this.$q = $q;
                this.apiBaseUrl = apiBaseUrl;
                this.tokenService = tokenService;
            }
            VoteService.prototype.getAllPositions = function () {
                var self = this;
                var deferred = self.$q.defer();
                self.$http.get(self.apiBaseUrl + 'vote/positions')
                    .then(function (data) {
                    var result = data.data;
                    deferred.resolve(result);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            VoteService.prototype.getAllCandidates = function (positionId) {
                var self = this;
                var deferred = self.$q.defer();
                self.$http.get(self.apiBaseUrl + 'vote/candidates?positionId=' + positionId)
                    .then(function (data) {
                    var result = data.data;
                    deferred.resolve(result);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            VoteService.prototype.getResult = function (positionId) {
                var self = this;
                var deferred = self.$q.defer();
                self.$http.get(self.apiBaseUrl + 'vote?positionId=' + positionId)
                    .then(function (data) {
                    var result = data.data;
                    deferred.resolve(result);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            VoteService.prototype.vote = function (candidateId) {
                var self = this;
                var deferred = self.$q.defer();
                self.$http.post(self.apiBaseUrl + 'vote', new Voting.Models.Candidate(candidateId))
                    .then(function (data) {
                    var result = data.data;
                    deferred.resolve(result);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            VoteService.$inject = ['$http', '$q', 'apiBaseUrl', 'Voting.Services.TokenService'];
            return VoteService;
        })();
        Services.VoteService = VoteService;
        angular.module('votingApp').service('Voting.Services.VoteService', VoteService);
    })(Services = Voting.Services || (Voting.Services = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=VoteService.js.map