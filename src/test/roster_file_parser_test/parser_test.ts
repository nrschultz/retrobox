import Ava from 'ava';
import * as fs from 'mz/fs';
import { RosterFileParser, RosterData } from '../../lib/roster_file_parser';

class TestableRosterFileParser extends RosterFileParser {
    public getTeamIdFromFilePath(filePath: string): string {
        return super.getTeamIdFromFilePath(filePath);
    }
    public parseFile(fileBuffer: Buffer): RosterData {
        return super.parseFile(fileBuffer);
    }
}

Ava('Test getTeamIdFromFilePath', async (test) => {
    let rfp = new TestableRosterFileParser();
    let teamId = rfp.getTeamIdFromFilePath('/file/path/MIN1991.ROS');
    test.deepEqual(teamId, 'MIN');
});

Ava('test parseFile', (test) => {
    let rfp = new TestableRosterFileParser();
    let rosterData = rfp.parseFile(fs.readFileSync(`${__dirname}/MIN1991.ROS`));

    test.deepEqual(rosterData, {
        abbop001: { player_id: 'abbop001', last_name: 'Abbott', first_name: 'Paul', batting_side: 'R', throwing_arm: 'R' },
        aguir001: { player_id: 'aguir001', last_name: 'Aguilera', first_name: 'Rick', batting_side: 'R', throwing_arm: 'R' },
        andea001: { player_id: 'andea001', last_name: 'Anderson', first_name: 'Allan', batting_side: 'L', throwing_arm: 'L' },
        bankw001: { player_id: 'bankw001', last_name: 'Banks', first_name: 'Willie', batting_side: 'R', throwing_arm: 'R' },
        bedrs001: { player_id: 'bedrs001', last_name: 'Bedrosian', first_name: 'Steve', batting_side: 'R', throwing_arm: 'R' },
        browj002: { player_id: 'browj002', last_name: 'Brown', first_name: 'Jarvis', batting_side: 'R', throwing_arm: 'R' },
        bushr001: { player_id: 'bushr001', last_name: 'Bush', first_name: 'Randy', batting_side: 'L', throwing_arm: 'L' },
        casil001: { player_id: 'casil001', last_name: 'Casian', first_name: 'Larry', batting_side: 'R', throwing_arm: 'L' },
        castc001: { player_id: 'castc001', last_name: 'Castillo', first_name: 'Carmen', batting_side: 'R', throwing_arm: 'R' },
        davic001: { player_id: 'davic001', last_name: 'Davis', first_name: 'Chili', batting_side: 'B', throwing_arm: 'R' },
        edent001: { player_id: 'edent001', last_name: 'Edens', first_name: 'Tom', batting_side: 'R', throwing_arm: 'R' },
        erics001: { player_id: 'erics001', last_name: 'Erickson', first_name: 'Scott', batting_side: 'R', throwing_arm: 'R' },
        gagng001: { player_id: 'gagng001', last_name: 'Gagne', first_name: 'Greg', batting_side: 'R', throwing_arm: 'R' },
        gladd001: { player_id: 'gladd001', last_name: 'Gladden', first_name: 'Dan', batting_side: 'R', throwing_arm: 'R' },
        guthm001: { player_id: 'guthm001', last_name: 'Guthrie', first_name: 'Mark', batting_side: 'B', throwing_arm: 'L' },
        harpb001: { player_id: 'harpb001', last_name: 'Harper', first_name: 'Brian', batting_side: 'R', throwing_arm: 'R' },
        hrbek001: { player_id: 'hrbek001', last_name: 'Hrbek', first_name: 'Kent', batting_side: 'L', throwing_arm: 'R' },
        knobc001: { player_id: 'knobc001', last_name: 'Knoblauch', first_name: 'Chuck', batting_side: 'R', throwing_arm: 'R' },
        larkg001: { player_id: 'larkg001', last_name: 'Larkin', first_name: 'Gene', batting_side: 'B', throwing_arm: 'R' },
        leact001: { player_id: 'leact001', last_name: 'Leach', first_name: 'Terry', batting_side: 'R', throwing_arm: 'R' },
        leius001: { player_id: 'leius001', last_name: 'Leius', first_name: 'Scott', batting_side: 'R', throwing_arm: 'R' },
        macks001: { player_id: 'macks001', last_name: 'Mack', first_name: 'Shane', batting_side: 'R', throwing_arm: 'R' },
        morrj001: { player_id: 'morrj001', last_name: 'Morris', first_name: 'Jack', batting_side: 'R', throwing_arm: 'R' },
        munop001: { player_id: 'munop001', last_name: 'Munoz', first_name: 'Pedro', batting_side: 'R', throwing_arm: 'R' },
        neagd001: { player_id: 'neagd001', last_name: 'Neagle', first_name: 'Denny', batting_side: 'L', throwing_arm: 'L' },
        newma001: { player_id: 'newma001', last_name: 'Newman', first_name: 'Al', batting_side: 'B', throwing_arm: 'R' },
        ortij001: { player_id: 'ortij001', last_name: 'Ortiz', first_name: 'Junior', batting_side: 'R', throwing_arm: 'R' },
        paglm001: { player_id: 'paglm001', last_name: 'Pagliarulo', first_name: 'Mike', batting_side: 'L', throwing_arm: 'R' },
        puckk001: { player_id: 'puckk001', last_name: 'Puckett', first_name: 'Kirby', batting_side: 'R', throwing_arm: 'R' },
        sorrp001: { player_id: 'sorrp001', last_name: 'Sorrento', first_name: 'Paul', batting_side: 'L', throwing_arm: 'R' },
        tapak001: { player_id: 'tapak001', last_name: 'Tapani', first_name: 'Kevin', batting_side: 'R', throwing_arm: 'R' },
        wayng001: { player_id: 'wayng001', last_name: 'Wayne', first_name: 'Gary', batting_side: 'L', throwing_arm: 'L' },
        websl001: { player_id: 'websl001', last_name: 'Webster', first_name: 'Lenny', batting_side: 'R', throwing_arm: 'R' },
        westd001: { player_id: 'westd001', last_name: 'West', first_name: 'David', batting_side: 'L', throwing_arm: 'L' },
        willc001: { player_id: 'willc001', last_name: 'Willis', first_name: 'Carl', batting_side: 'L', throwing_arm: 'R' },
    })
});
