"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("mz/fs");
const base_file_parser_1 = require("./base_file_parser");
class RosterFileParser extends base_file_parser_1.BaseFileParser {
    parse(filePaths) {
        let seasonRosters = {};
        for (let path of filePaths) {
            let teamId = this.getTeamIdFromFilePath(path);
            let fileBuffer = fs.readFileSync(path);
            let roster = this.parseFile(fileBuffer);
            seasonRosters[teamId] = roster;
        }
        return seasonRosters;
    }
    getTeamIdFromFilePath(filePath) {
        // /path/to/file/MIN1991.ROS
        return filePath.slice(filePath.length - 11, filePath.length - 8);
    }
    parseFile(fileBuffer) {
        let lines = this.splitLines(fileBuffer);
        let rosterData = {};
        for (let line of lines) {
            let parts = line.split(',');
            if (parts[0]) {
                rosterData[parts[0]] = {
                    player_id: parts[0],
                    last_name: parts[1],
                    first_name: parts[2],
                    batting_side: parts[3],
                    throwing_arm: parts[4],
                };
            }
        }
        return rosterData;
    }
}
exports.RosterFileParser = RosterFileParser;
//# sourceMappingURL=roster_file_parser.js.map