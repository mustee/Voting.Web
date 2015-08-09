var Voting;
(function (Voting) {
    var Services;
    (function (Services) {
        'use strict';
        var SharedDataService = (function () {
            function SharedDataService() {
                this.invalidToken = false;
            }
            return SharedDataService;
        })();
        Services.SharedDataService = SharedDataService;
        angular.module('votingApp').service('Voting.Services.SharedDataService', SharedDataService);
    })(Services = Voting.Services || (Voting.Services = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=SharedDataService.js.map