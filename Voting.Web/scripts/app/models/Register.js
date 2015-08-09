var Voting;
(function (Voting) {
    var Models;
    (function (Models) {
        var Register = (function () {
            function Register(firstName, lastName, middleName, password, email, authType, authId) {
                this.confirmEmail = false;
                this.firstName = firstName;
                this.lastName = lastName;
                this.middleName = middleName;
                this.password = password;
                this.email = email;
                this.authType = authType;
                this.authId = authId;
            }
            return Register;
        })();
        Models.Register = Register;
    })(Models = Voting.Models || (Voting.Models = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=Register.js.map