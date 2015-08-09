module Voting.Models {

    export class Token {

        constructor(accessToken: string, role: Models.Role, timeCreated: Date, lastActivity: Date) {
            this.AccessToken = accessToken;
            this.Role = role;
            this.TimeCreated = timeCreated;
            this.LastActivity = lastActivity;
        }

        AccessToken: string;

        TimeCreated: Date;

        LastActivity: Date;

        Role: Models.Role;
    }
}