var Voting;
(function (Voting) {
    var Models;
    (function (Models) {
        var Candidate = (function () {
            function Candidate(id) {
                this.selected = false;
                this.Id = id;
            }
            return Candidate;
        })();
        Models.Candidate = Candidate;
    })(Models = Voting.Models || (Voting.Models = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=Candidate.js.map