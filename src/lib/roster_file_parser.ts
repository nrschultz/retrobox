import * as fs from 'mz/fs';
import { BaseFileParser } from './base_file_parser';

export interface RosterData {
    [playerId: string]: {
        player_id: string,
        last_name: string,
        first_name: string,
        batting_side: string,
        throwing_arm: string,
    }
}

interface SeasonRosters {
    [teamId: string]: RosterData
}

export class RosterFileParser extends BaseFileParser {
    public parse(filePaths: string[]): SeasonRosters {
        let seasonRosters: SeasonRosters = {}
        for (let path of filePaths) {
            let teamId = this.getTeamIdFromFilePath(path);
            let fileBuffer = fs.readFileSync(path)
            let roster = this.parseFile(fileBuffer)
            seasonRosters[teamId] = roster;
        }
        return seasonRosters
    }

    protected getTeamIdFromFilePath(filePath: string) {
        // /path/to/file/MIN1991.ROS
        return filePath.slice(filePath.length - 11, filePath.length - 8)
    }

    protected parseFile(fileBuffer: Buffer): RosterData {
        let lines = this.splitLines(fileBuffer);

        let rosterData: RosterData = {}
        for (let line of lines) {
            let parts = line.split(',');
            if (parts[0]) {
                rosterData[parts[0]] = {
                    player_id: parts[0],
                    last_name: parts[1],
                    first_name: parts[2],
                    batting_side: parts[3],
                    throwing_arm: parts[4],
                }
            }
        }
        return rosterData;
    }
}
