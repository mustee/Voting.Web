module Voting.Models {
    export class Register {
        constructor(firstName: string, lastName: string, middleName: string, password: string,
            email: string, authType: AuthType, authId: string) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.middleName = middleName;
            this.password = password;
            this.email = email;
            this.authType = authType;
            this.authId = authId;
        }

        firstName: string;
        lastName: string;
        middleName: string;
        password: string;
        email: string;
        authType: AuthType;
        authId: string;
        accepted: boolean;
        confirmEmail: boolean = false;
    }
}