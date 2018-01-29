import * as fs from 'mz/fs';
import { BaseFileParser } from './base_file_parser';

export interface TeamsData {
    [teamId: string]: {
        abbreviation: string,
        league: string,
        location: string,
        name: string,
    }
}

export class TeamsFileParser extends BaseFileParser {
    public parse(filePath: string): TeamsData {
        let fileBuffer = fs.readFileSync(filePath)
        let lines = this.splitLines(fileBuffer);

        let teamsData: TeamsData = {}
        for (let line of lines) {
            let parts = line.split(',');
            teamsData[parts[0]] = {
                abbreviation: parts[0],
                league: parts[1],
                location: parts[2],
                name: parts[3],
            }
        }
        return teamsData;
    }
}
