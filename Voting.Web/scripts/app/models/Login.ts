﻿module Voting.Models {
    export class Login {
        constructor(email: string, password: string) {
            this.email = email;
            this.password = password;
        }

        email: string;
        password: string;   
           
    }
}