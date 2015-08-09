/// <reference path="../tsd.d.ts" />
/// <reference path="../../tools/typings/voting.d.ts" />
var Voting;
(function (Voting) {
    var Services;
    (function (Services) {
        'use strict';
        var TokenService = (function () {
            function TokenService(localStorageService) {
                this.localStorageService = localStorageService;
            }
            TokenService.prototype.getToken = function () {
                return this.localStorageService.get('pt_voting_token');
            };
            TokenService.prototype.setToken = function (token, role) {
                this.localStorageService.set('pt_voting_token', new Voting.Models.Token(token, role, new Date(), new Date()));
            };
            TokenService.$inject = ['localStorageService'];
            return TokenService;
        })();
        Services.TokenService = TokenService;
        angular.module('votingApp').service('Voting.Services.TokenService', TokenService);
    })(Services = Voting.Services || (Voting.Services = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=TokenService.js.map