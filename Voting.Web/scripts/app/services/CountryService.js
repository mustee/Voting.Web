/// <reference path="../tsd.d.ts" />
/// <reference path="../../tools/typings/voting.d.ts" />
var Voting;
(function (Voting) {
    var Services;
    (function (Services) {
        'use strict';
        var CountryService = (function () {
            function CountryService($http, $q, apiBaseUrl) {
                this.$http = $http;
                this.$q = $q;
                this.apiBaseUrl = apiBaseUrl;
            }
            CountryService.prototype.getAll = function () {
                var self = this;
                var deferred = self.$q.defer();
                self.$http.get(self.apiBaseUrl + 'country/all')
                    .then(function (data) {
                    var result = data.data;
                    deferred.resolve(result);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            CountryService.$inject = ['$http', '$q', 'apiBaseUrl'];
            return CountryService;
        })();
        Services.CountryService = CountryService;
        angular.module('votingApp').service('Voting.Services.CountryService', CountryService);
    })(Services = Voting.Services || (Voting.Services = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=CountryService.js.map