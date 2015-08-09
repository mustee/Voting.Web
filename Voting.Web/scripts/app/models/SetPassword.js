var Voting;
(function (Voting) {
    var Models;
    (function (Models) {
        var SetPassword = (function () {
            function SetPassword(password, confirmPassword, token) {
                this.Password = password;
                this.ConfirmPassword = confirmPassword;
                this.Token = token;
            }
            return SetPassword;
        })();
        Models.SetPassword = SetPassword;
    })(Models = Voting.Models || (Voting.Models = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=SetPassword.js.map