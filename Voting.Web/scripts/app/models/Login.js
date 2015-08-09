var Voting;
(function (Voting) {
    var Models;
    (function (Models) {
        var Login = (function () {
            function Login(email, password) {
                this.email = email;
                this.password = password;
            }
            return Login;
        })();
        Models.Login = Login;
    })(Models = Voting.Models || (Voting.Models = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=Login.js.map