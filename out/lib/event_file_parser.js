"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("mz/fs");
const base_file_parser_1 = require("./base_file_parser");
class EventFileParser extends base_file_parser_1.BaseFileParser {
    parse(filePaths) {
        let gameData = [];
        for (let path of filePaths) {
            let fileBuffer = fs.readFileSync(path);
            let eventFileGameData = this.parseFile(fileBuffer);
            gameData = gameData.concat(eventFileGameData);
        }
        return gameData;
    }
    parseFile(fileBuffer) {
        let lines = this.splitLines(fileBuffer);
        let allGameData = [];
        let singleGameLines = [];
        for (let line of lines) {
            let parts = line.split(',');
            if (parts[0] === 'id') {
                if (singleGameLines.length !== 0) {
                    allGameData.push(this.parseSingleGameData(singleGameLines));
                    singleGameLines = [];
                }
            }
            singleGameLines.push(line);
        }
        if (singleGameLines.length !== 0) {
            allGameData.push(this.parseSingleGameData(singleGameLines));
        }
        return allGameData;
    }
    parseSingleGameData(singleGameLines) {
        let idLine = singleGameLines[0];
        let gameId = idLine.split(',')[1];
        let homeTeamId = gameId.slice(0, 3);
        let year = Number(gameId.slice(3, 7));
        let month = Number(gameId.slice(7, 9));
        let day = Number(gameId.slice(9, 11));
        let doubleheaderBit = Number(gameId[11]);
        let awayTeamId;
        let hour;
        let minute;
        for (let line of singleGameLines) {
            let parts = line.split(',');
            if (parts[0] === 'info' && parts[1] === 'visteam') {
                awayTeamId = parts[2];
            }
            if (parts[0] === 'info' && parts[1] === 'starttime') {
                let splitTime = parts[2].split(':');
                hour = Number(splitTime[0]) + 12;
                minute = Number(splitTime[1]);
            }
            if (parts[0] === 'start') {
                break;
            }
        }
        if (awayTeamId === undefined) {
            throw new Error(`could not find an away team for the game: ${gameId}`);
        }
        if (hour === undefined || minute === undefined) {
            throw new Error(`could not find a time for the game: ${gameId}`);
        }
        return {
            home_team_id: homeTeamId,
            away_team_id: awayTeamId,
            date: new Date(year, month - 1, day),
            second_of_doubleheader: doubleheaderBit === 2,
            game_data_lines: singleGameLines,
        };
    }
}
exports.EventFileParser = EventFileParser;
//# sourceMappingURL=event_file_parser.js.map