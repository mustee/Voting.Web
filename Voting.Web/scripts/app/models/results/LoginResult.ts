module Voting.Models.Results {

    export class LoginResult  {
        access_token: string;
        expires_in: number;
        token_type: string;
        mobile_number: string;
        country: string;
        email: string;
        mobile_number_confirmed: boolean;
        role: string;
    }
}