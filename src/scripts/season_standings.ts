import * as _ from 'lodash';
import * as glob from 'glob';
import * as moment from 'moment';
import { TeamsFileParser } from '../lib/teams_file_parser';
// import { RosterFileParser } from '../lib/roster_file_parser';
import { EventFileParser } from '../lib/event_file_parser';
import { FilePicker } from '../lib/file_picker';
import { getFinalScore } from './common';
import * as printTable from 'console.table';

if (require.main === module) {
    glob(`${__dirname}/../../data/2009_season/*`, (err, dataFileNames) => {
        if (err) {
            console.log(err);
            return;
        }
        let filePicker = new FilePicker(dataFileNames);

        let teamData = new TeamsFileParser().parse(filePicker.getTeamsFile(2009));
        // let rosterData = new RosterFileParser().parse(filePicker.getRosterFiles(2009))
        let gameData = _.sortBy(new EventFileParser().parse(filePicker.getEventFiles(2009)), 'date');
        let recordsByDay: { [date: string]: { [team_id: string]: { wins: number, losses: number, ties: number, total_games: number } } } = {};

        let emptyRecords: { [team_id: string]: { wins: number, losses: number, ties: number, total_games: number } } = {}
        for (let teamId in teamData) {
            emptyRecords[teamId] = { wins: 0, losses: 0, ties: 0, total_games: 0 }
        }
        let runningRecords = _.cloneDeep(emptyRecords);

        for (let game of gameData) {

            if (recordsByDay[game.date.toISOString()] === undefined) {
                recordsByDay[game.date.toISOString()] = _.cloneDeep(runningRecords);
            }
            let score = getFinalScore(game);
            if (score.away > score.home) {
                runningRecords[game.away_team_id].wins += 1
                runningRecords[game.home_team_id].losses += 1
            } else if (score.home > score.away) {
                runningRecords[game.home_team_id].wins += 1
                runningRecords[game.away_team_id].losses += 1
            } else {
                // console.log(game);
                // throw new Error('ties shouldnt happen');
                runningRecords[game.home_team_id].ties += 1
                runningRecords[game.away_team_id].ties += 1
            }
            runningRecords[game.home_team_id].total_games += 1
            runningRecords[game.away_team_id].total_games += 1
            if (recordsByDay[game.date.toISOString()][game.home_team_id].total_games < runningRecords[game.home_team_id].total_games) {
                recordsByDay[game.date.toISOString()][game.home_team_id] = _.clone(runningRecords[game.home_team_id]);
            }
            if (recordsByDay[game.date.toISOString()][game.away_team_id].total_games < runningRecords[game.away_team_id].total_games) {
                recordsByDay[game.date.toISOString()][game.away_team_id] = _.clone(runningRecords[game.away_team_id]);
            }
        }

        let sortableRecord: { date: Date, records: { team: string, wins: number, losses: number, ties: number, total_games: number }[] }[] = []
        for (let dateString in recordsByDay) {
            let records: { team: string, wins: number, losses: number, ties: number, total_games: number }[] = [];
            for (let teamId in recordsByDay[dateString]) {
                records.push({ team: teamId, ...recordsByDay[dateString][teamId] })
            }
            sortableRecord.push({ date: new Date(dateString), records: records });
        }

        let recordSortingValueFunction = (record: { team: string, wins: number, losses: number, ties: number, total_games: number }): number => {
            return (record.wins + record.losses) / record.wins;
        }

        let dateSortedRecords = _.sortBy(sortableRecord, 'date');
        for (let recordDay of dateSortedRecords) {
            let alStandings = _.chain(recordDay.records).filter((teamDayRecord) => { return teamData[teamDayRecord.team].league === 'A'; }).sortBy(recordSortingValueFunction).value();
            console.log(moment(recordDay.date).format('MMM D'));
            console.log(printTable.getTable(alStandings))
            console.log('\n\n')
            // let nlStandings = _.chain(recordDay.records).filter((teamDayRecord) => { return teamData[teamDayRecord.team].league === 'N'; }).sortBy(recordSortingValueFunction).value();
        }


    });
}


