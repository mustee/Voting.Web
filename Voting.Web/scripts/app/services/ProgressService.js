/// <reference path="../tsd.d.ts" />
/// <reference path="../../tools/typings/voting.d.ts" />
var Voting;
(function (Voting) {
    var Services;
    (function (Services) {
        'use strict';
        var ProgressService = (function () {
            function ProgressService(progressFactory) {
                this.progressFactory = progressFactory;
                this.progressBar = this.progressFactory.createInstance();
            }
            ProgressService.prototype.start = function () {
                this.progressBar.start();
            };
            ProgressService.prototype.complete = function () {
                this.progressBar.complete();
            };
            ProgressService.$inject = ['ngProgressFactory'];
            return ProgressService;
        })();
        Services.ProgressService = ProgressService;
        angular.module('votingApp').service('Voting.Services.ProgressService', ProgressService);
    })(Services = Voting.Services || (Voting.Services = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=ProgressService.js.map