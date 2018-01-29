"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const glob = require("glob");
const moment = require("moment");
const teams_file_parser_1 = require("../lib/teams_file_parser");
// import { RosterFileParser } from '../lib/roster_file_parser';
const event_file_parser_1 = require("../lib/event_file_parser");
const file_picker_1 = require("../lib/file_picker");
const common_1 = require("./common");
const printTable = require("console.table");
if (require.main === module) {
    glob(`${__dirname}/../../data/2009_season/*`, (err, dataFileNames) => {
        if (err) {
            console.log(err);
            return;
        }
        let filePicker = new file_picker_1.FilePicker(dataFileNames);
        let teamData = new teams_file_parser_1.TeamsFileParser().parse(filePicker.getTeamsFile(2009));
        // let rosterData = new RosterFileParser().parse(filePicker.getRosterFiles(2009))
        let gameData = _.sortBy(new event_file_parser_1.EventFileParser().parse(filePicker.getEventFiles(2009)), 'date');
        let recordsByDay = {};
        let emptyRecords = {};
        for (let teamId in teamData) {
            emptyRecords[teamId] = { wins: 0, losses: 0, ties: 0, total_games: 0 };
        }
        let runningRecords = _.cloneDeep(emptyRecords);
        for (let game of gameData) {
            if (recordsByDay[game.date.toISOString()] === undefined) {
                recordsByDay[game.date.toISOString()] = _.cloneDeep(runningRecords);
            }
            let score = common_1.getFinalScore(game);
            if (score.away > score.home) {
                runningRecords[game.away_team_id].wins += 1;
                runningRecords[game.home_team_id].losses += 1;
            }
            else if (score.home > score.away) {
                runningRecords[game.home_team_id].wins += 1;
                runningRecords[game.away_team_id].losses += 1;
            }
            else {
                // console.log(game);
                // throw new Error('ties shouldnt happen');
                runningRecords[game.home_team_id].ties += 1;
                runningRecords[game.away_team_id].ties += 1;
            }
            runningRecords[game.home_team_id].total_games += 1;
            runningRecords[game.away_team_id].total_games += 1;
            if (recordsByDay[game.date.toISOString()][game.home_team_id].total_games < runningRecords[game.home_team_id].total_games) {
                recordsByDay[game.date.toISOString()][game.home_team_id] = _.clone(runningRecords[game.home_team_id]);
            }
            if (recordsByDay[game.date.toISOString()][game.away_team_id].total_games < runningRecords[game.away_team_id].total_games) {
                recordsByDay[game.date.toISOString()][game.away_team_id] = _.clone(runningRecords[game.away_team_id]);
            }
        }
        let sortableRecord = [];
        for (let dateString in recordsByDay) {
            let records = [];
            for (let teamId in recordsByDay[dateString]) {
                records.push(Object.assign({ team: teamId }, recordsByDay[dateString][teamId]));
            }
            sortableRecord.push({ date: new Date(dateString), records: records });
        }
        let recordSortingValueFunction = (record) => {
            return (record.wins + record.losses) / record.wins;
        };
        let dateSortedRecords = _.sortBy(sortableRecord, 'date');
        for (let recordDay of dateSortedRecords) {
            let alStandings = _.chain(recordDay.records).filter((teamDayRecord) => { return teamData[teamDayRecord.team].league === 'A'; }).sortBy(recordSortingValueFunction).value();
            console.log(moment(recordDay.date).format('MMM D'));
            console.log(printTable.getTable(alStandings));
            console.log('\n\n');
            // let nlStandings = _.chain(recordDay.records).filter((teamDayRecord) => { return teamData[teamDayRecord.team].league === 'N'; }).sortBy(recordSortingValueFunction).value();
        }
    });
}
//# sourceMappingURL=season_standings.js.map