var Voting;
(function (Voting) {
    var Models;
    (function (Models) {
        var Position = (function () {
            function Position(id, name) {
                this.Id = id;
                this.Name = name;
            }
            return Position;
        })();
        Models.Position = Position;
    })(Models = Voting.Models || (Voting.Models = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=Position.js.map