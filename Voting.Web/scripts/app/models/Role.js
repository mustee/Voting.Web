var Voting;
(function (Voting) {
    var Models;
    (function (Models) {
        (function (Role) {
            Role[Role["Admin"] = 0] = "Admin";
            Role[Role["Voter"] = 1] = "Voter";
        })(Models.Role || (Models.Role = {}));
        var Role = Models.Role;
    })(Models = Voting.Models || (Voting.Models = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=Role.js.map