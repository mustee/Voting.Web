module Voting.Models {
    export class Confirm {
        constructor(token: string) {
            this.token = token;
        }

        token: string;
    }
}