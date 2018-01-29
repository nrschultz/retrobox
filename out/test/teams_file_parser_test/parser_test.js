"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const teams_file_parser_1 = require("../../lib/teams_file_parser");
class TestableTeamsFileParser extends teams_file_parser_1.TeamsFileParser {
    parse(fileName) {
        return super.parse(fileName);
    }
}
ava_1.default('test parse', (test) => {
    let tfp = new TestableTeamsFileParser();
    let teamData = tfp.parse(`${__dirname}/TEAM1991`);
    test.deepEqual(teamData, {
        BAL: { abbreviation: 'BAL', league: 'A', location: 'Baltimore', name: 'Orioles' },
        BOS: { abbreviation: 'BOS', league: 'A', location: 'Boston', name: 'Red Sox' },
        CLE: { abbreviation: 'CLE', league: 'A', location: 'Cleveland', name: 'Indians' },
        DET: { abbreviation: 'DET', league: 'A', location: 'Detroit', name: 'Tigers' },
        MIL: { abbreviation: 'MIL', league: 'A', location: 'Milwaukee', name: 'Brewers' },
        NYA: { abbreviation: 'NYA', league: 'A', location: 'New York', name: 'Yankees' },
        TOR: { abbreviation: 'TOR', league: 'A', location: 'Toronto', name: 'Blue Jays' },
        CAL: { abbreviation: 'CAL', league: 'A', location: 'California', name: 'Angels' },
        CHA: { abbreviation: 'CHA', league: 'A', location: 'Chicago', name: 'White Sox' },
        KCA: { abbreviation: 'KCA', league: 'A', location: 'Kansas City', name: 'Royals' },
        MIN: { abbreviation: 'MIN', league: 'A', location: 'Minnesota', name: 'Twins' },
        OAK: { abbreviation: 'OAK', league: 'A', location: 'Oakland', name: 'Athletics' },
        SEA: { abbreviation: 'SEA', league: 'A', location: 'Seattle', name: 'Mariners' },
        TEX: { abbreviation: 'TEX', league: 'A', location: 'Texas', name: 'Rangers' },
        CHN: { abbreviation: 'CHN', league: 'N', location: 'Chicago', name: 'Cubs' },
        MON: { abbreviation: 'MON', league: 'N', location: 'Montreal', name: 'Expos' },
        NYN: { abbreviation: 'NYN', league: 'N', location: 'New York', name: 'Mets' },
        PHI: { abbreviation: 'PHI', league: 'N', location: 'Philadelphia', name: 'Phillies' },
        PIT: { abbreviation: 'PIT', league: 'N', location: 'Pittsburgh', name: 'Pirates' },
        SLN: { abbreviation: 'SLN', league: 'N', location: 'St.Louis', name: 'Cardinals' },
        ATL: { abbreviation: 'ATL', league: 'N', location: 'Atlanta', name: 'Braves' },
        CIN: { abbreviation: 'CIN', league: 'N', location: 'Cincinnati', name: 'Reds' },
        HOU: { abbreviation: 'HOU', league: 'N', location: 'Houston', name: 'Astros' },
        LAN: { abbreviation: 'LAN', league: 'N', location: 'Los Angeles', name: 'Dodgers' },
        SDN: { abbreviation: 'SDN', league: 'N', location: 'San Diego', name: 'Padres' },
        SFN: { abbreviation: 'SFN', league: 'N', location: 'San Francisco', name: 'Giants' },
    });
});
//# sourceMappingURL=parser_test.js.map