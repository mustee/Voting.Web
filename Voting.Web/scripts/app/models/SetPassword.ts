module Voting.Models {
    export class SetPassword {

        constructor(password: string, confirmPassword: string, token: string) {
            this.Password = password;
            this.ConfirmPassword = confirmPassword;
            this.Token = token;
        }

        Password: string;

        ConfirmPassword: string;

        Token: string;
    }
}