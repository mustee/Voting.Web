var Voting;
(function (Voting) {
    var Models;
    (function (Models) {
        var Results;
        (function (Results) {
            (function (ResultCode) {
                ResultCode[ResultCode["SUCCESS"] = 0] = "SUCCESS";
                ResultCode[ResultCode["INVALID_PARAMETER"] = 1] = "INVALID_PARAMETER";
                ResultCode[ResultCode["USER_NOT_FOUND"] = 2] = "USER_NOT_FOUND";
                ResultCode[ResultCode["ALREADY_CONFIRMED"] = 3] = "ALREADY_CONFIRMED";
            })(Results.ResultCode || (Results.ResultCode = {}));
            var ResultCode = Results.ResultCode;
        })(Results = Models.Results || (Models.Results = {}));
    })(Models = Voting.Models || (Voting.Models = {}));
})(Voting || (Voting = {}));
//# sourceMappingURL=ResultCode.js.map