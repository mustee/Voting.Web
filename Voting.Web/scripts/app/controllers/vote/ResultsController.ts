/// <reference path="../../tsd.d.ts" />
/// <reference path="../../../tools/typings/voting.d.ts" />

module Voting.Controllers.Vote {
    export class ResultsController {

        private positions: Models.Position[];
        private currentVote: Models.Vote = null;
        private selectedCandidate: number = -1;

        static $inject = ['$scope', '$location', 'Voting.Services.VoteService', 'Voting.Services.TokenService'];
        constructor(private $scope: Scope.IResultsScope,
            private $location: ng.ILocationService,
            private voteService: Services.VoteService,
            private tokenService: Services.TokenService) {
            var self = this;

            var token = tokenService.getToken();
            if (token == null || token.AccessToken == null) {
                $location.path('/login');
                return;
            }

            self.$scope.role = token.Role;
            self.$scope.current = 0;
            self.$scope.nextText = "Next <i class=\"fa fa-chevron-right\" > </i>";

            self.voteService.getAllPositions().then(result => {
                self.positions = result.Items;

                self.loadData();
            });
        }

        voteChecked($event): void {
            var self = this;
            var value = + $event.currentTarget.value;

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
        }


        nextClicked(): void {
            var self = this;

            if (self.$scope.current === (self.positions.length - 1)) {
                return;
            }

            if (self.$scope.current === (self.positions.length - 2)) {
                self.$scope.nextText = 'FINISH';
            }

            self.$scope.current = self.$scope.current + 1;
            self.loadData();
        }


        previousClicked(): void {
            var self = this;

            self.$scope.current = self.$scope.current - 1;

            if (self.$scope.current !== (self.positions.length - 1)) {
                self.$scope.nextText = 'Next <i class=\"fa fa-chevron-right\" > </i>';
            }

            self.loadData();
        }

        logout(): void {
            this.tokenService.setToken(null, 1);
            this.$location.path('/login');
        }

        loadData() {
            var self = this;
            self.$scope.position = self.positions[self.$scope.current].Name;

            self.voteService.getAllCandidates(self.positions[self.$scope.current].Id).then(result => {
                self.$scope.candidates = result.Items;

                self.voteService.getResult(self.positions[self.$scope.current].Id).then(result => {
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
        }
    }
}