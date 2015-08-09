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
            var ListResult = (function (_super) {
                __extends(ListResult, _super);
                function ListResult() {
                    _super.apply(this, arguments);
                }
                return ListResult;
            })(Results.Result);
            Results.ListResult = ListResult;
        })(Results = Models.Results || (Models.Results = {}));
    })(Models = Voting.Models || (Voting.Models = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=ListResult.js.map