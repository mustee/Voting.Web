module Voting.Models {
    export class Candidate {

        constructor(id: number) {
            this.Id = id;
        }

        Id: number;

        Name: string;

        selected: boolean = false;
    }
}