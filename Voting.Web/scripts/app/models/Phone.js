var Voting;
(function (Voting) {
    var Models;
    (function (Models) {
        var Phone = (function () {
            function Phone(country, phoneNumber, phoneNumberConfirmationCode) {
                this.country = country;
                this.phoneNumber = phoneNumber;
                this.phoneNumberConfirmationCode = phoneNumberConfirmationCode;
            }
            return Phone;
        })();
        Models.Phone = Phone;
    })(Models = Voting.Models || (Voting.Models = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=Phone.js.map