module Voting.Models {
    export class ForgotPassword {

        constructor(email: string) {
            this.Email = email;
        }

        Email: string;

    }
}