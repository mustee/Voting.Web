/// <reference path="../../tsd.d.ts" />
/// <reference path="../../../tools/typings/voting.d.ts" />
var Voting;
(function (Voting) {
    var Controllers;
    (function (Controllers) {
        var Vote;
        (function (Vote) {
            var VoteController = (function () {
                function VoteController($scope, $location, voteService, tokenService) {
                    this.$scope = $scope;
                    this.$location = $location;
                    this.voteService = voteService;
                    this.tokenService = tokenService;
                    this.currentVote = null;
                    this.selectedCandidate = -1;
                    var self = this;
                    var token = tokenService.getToken();
                    if (token == null || token.AccessToken == null) {
                        $location.path('/login');
                        return;
                    }
                    self.$scope.role = token.Role;
                    self.$scope.current = 0;
                    self.$scope.nextText = "Next <i class=\"fa fa-chevron-right\" > </i>";
                    self.voteService.getAllPositions().then(function (result) {
                        self.positions = result.Items;
                        self.loadData();
                    });
                }
                VoteController.prototype.voteChecked = function ($event) {
                    var self = this;
                    var value = +$event.currentTarget.value;
                    if (self.currentVote != null) {
                        return;
                    }
                    for (var candidate in self.$scope.candidates) {
                        if (self.$scope.candidates.hasOwnProperty(candidate)) {
                            if (self.$scope.candidates[candidate].Id === value) {
                                self.$scope.candidates[candidate].selected = true;
                                self.selectedCandidate = value;
                                continue;
                            }
                            self.$scope.candidates[candidate].selected = false;
                        }
                    }
                };
                VoteController.prototype.nextClicked = function () {
                    var self = this;
                    if ((!self.currentVote || self.currentVote == null) && self.selectedCandidate !== -1) {
                        self.voteService.vote(self.selectedCandidate);
                        self.selectedCandidate = -1;
                    }
                    if (self.$scope.current === (self.positions.length - 1)) {
                        return;
                    }
                    if (self.$scope.current === (self.positions.length - 2)) {
                        self.$scope.nextText = 'FINISH';
                    }
                    self.$scope.current = self.$scope.current + 1;
                    self.loadData();
                };
                VoteController.prototype.previousClicked = function () {
                    var self = this;
                    self.$scope.current = self.$scope.current - 1;
                    if (self.$scope.current !== (self.positions.length - 1)) {
                        self.$scope.nextText = 'Next <i class=\"fa fa-chevron-right\" > </i>';
                    }
                    self.loadData();
                };
                VoteController.prototype.logout = function () {
                    this.tokenService.setToken(null, 1);
                    this.$location.path('/login');
                };
                VoteController.prototype.loadData = function () {
                    var self = this;
                    self.$scope.position = self.positions[self.$scope.current].Name;
                    self.voteService.getAllCandidates(self.positions[self.$scope.current].Id).then(function (result) {
                        self.$scope.candidates = result.Items;
                        self.voteService.getResult(self.positions[self.$scope.current].Id).then(function (result) {
                            self.currentVote = result.Item;
                            if (self.currentVote && self.currentVote != null) {
                                for (var candidate in self.$scope.candidates) {
                                    if (self.$scope.candidates.hasOwnProperty(candidate)) {
                                        if (self.$scope.candidates[candidate].Id === self.currentVote.Id) {
                                            self.$scope.candidates[candidate].selected = true;
                                            break;
                                        }
                                    }
                                }
                            }
                        });
                    });
                };
                VoteController.$inject = ['$scope', '$location', 'Voting.Services.VoteService', 'Voting.Services.TokenService'];
                return VoteController;
            })();
            Vote.VoteController = VoteController;
            angular.module('votingApp').controller('Voting.Controllers.Vote.VoteController', VoteController);
        })(Vote = Controllers.Vote || (Controllers.Vote = {}));
    })(Controllers = Voting.Controllers || (Voting.Controllers = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=VoteController.js.map