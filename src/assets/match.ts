export class Match{
    name: string;
    score: number;
    tries: number;
    conversions: number;
    penalties: number;

    constructor(Name, Score, Tries, Conversions, Penalties){
        this.name = Name;
        this.score = Score;
        this.tries = Tries;
        this.conversions = Conversions;
        this.penalties = Penalties;
    }
}

export class Fixture{
    awayTeamStats;
    homeTeamStats;
    victor;

    constructor(Away, Home, Victor){
        this.awayTeamStats = Away;
        this.homeTeamStats = Home;
        this.victor = Victor;
    }
}

let fixtures = [];
export default fixtures;