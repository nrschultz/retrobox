"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("mz/fs");
const base_file_parser_1 = require("./base_file_parser");
class TeamsFileParser extends base_file_parser_1.BaseFileParser {
    parse(filePath) {
        let fileBuffer = fs.readFileSync(filePath);
        let lines = this.splitLines(fileBuffer);
        let teamsData = {};
        for (let line of lines) {
            let parts = line.split(',');
            teamsData[parts[0]] = {
                abbreviation: parts[0],
                league: parts[1],
                location: parts[2],
                name: parts[3],
            };
        }
        return teamsData;
    }
}
exports.TeamsFileParser = TeamsFileParser;
//# sourceMappingURL=teams_file_parser.js.map