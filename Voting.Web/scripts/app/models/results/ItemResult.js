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
            var ItemResult = (function (_super) {
                __extends(ItemResult, _super);
                function ItemResult() {
                    _super.apply(this, arguments);
                }
                return ItemResult;
            })(Results.Result);
            Results.ItemResult = ItemResult;
        })(Results = Models.Results || (Models.Results = {}));
    })(Models = Voting.Models || (Voting.Models = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=ItemResult.js.map