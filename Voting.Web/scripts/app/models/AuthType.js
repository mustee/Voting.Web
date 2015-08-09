var Voting;
(function (Voting) {
    var Models;
    (function (Models) {
        (function (AuthType) {
            AuthType[AuthType["FACEBOOK"] = 0] = "FACEBOOK";
            AuthType[AuthType["TWITTER"] = 1] = "TWITTER";
        })(Models.AuthType || (Models.AuthType = {}));
        var AuthType = Models.AuthType;
    })(Models = Voting.Models || (Voting.Models = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=AuthType.js.map