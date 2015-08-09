var Voting;
(function (Voting) {
    var Models;
    (function (Models) {
        var Token = (function () {
            function Token(accessToken, role, timeCreated, lastActivity) {
                this.AccessToken = accessToken;
                this.Role = role;
                this.TimeCreated = timeCreated;
                this.LastActivity = lastActivity;
            }
            return Token;
        })();
        Models.Token = Token;
    })(Models = Voting.Models || (Voting.Models = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=Token.js.map