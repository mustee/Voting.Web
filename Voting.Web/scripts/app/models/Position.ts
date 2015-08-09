module Voting.Models {
    export class Position {

        constructor(id: number, name: string) {
            this.Id = id;
            this.Name = name;
        }

        Id: number;

        Name: string;
    }
}