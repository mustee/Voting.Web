module Voting.Models {
    export class Phone {

        constructor(country: number, phoneNumber: string, phoneNumberConfirmationCode: string) {
            this.country = country;
            this.phoneNumber = phoneNumber;
            this.phoneNumberConfirmationCode = phoneNumberConfirmationCode;
        }

        country: number;

        phoneNumber: string;

        phoneNumberConfirmationCode: string;
    }
}