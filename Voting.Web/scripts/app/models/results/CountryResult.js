var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Voting;
(function (Voting) {
    var Models;
    (function (Models) {
        var Results;
        (function (Results) {
            var CountryResult = (function (_super) {
                __extends(CountryResult, _super);
                function CountryResult() {
                    _super.apply(this, arguments);
                }
                return CountryResult;
            })(Results.Result);
            Results.CountryResult = CountryResult;
        })(Results = Models.Results || (Models.Results = {}));
    })(Models = Voting.Models || (Voting.Models = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=CountryResult.js.map