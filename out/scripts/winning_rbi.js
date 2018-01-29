"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const moment = require("moment");
const glob = require("glob");
const teams_file_parser_1 = require("../lib/teams_file_parser");
const roster_file_parser_1 = require("../lib/roster_file_parser");
const event_file_parser_1 = require("../lib/event_file_parser");
const file_picker_1 = require("../lib/file_picker");
const common_1 = require("./common");
if (require.main === module) {
    glob(`${__dirname}/../../data/1991_postseason/*`, (err, dataFileNames) => {
        if (err) {
            console.log(err);
            return;
        }
        let filePicker = new file_picker_1.FilePicker(dataFileNames);
        let teamData = new teams_file_parser_1.TeamsFileParser().parse(filePicker.getTeamsFile(1991));
        let rosterData = new roster_file_parser_1.RosterFileParser().parse(filePicker.getRosterFiles(1991));
        let gameData = _.sortBy(new event_file_parser_1.EventFileParser().parse(filePicker.getEventFiles(1991)), 'date');
        console.log('1991 Postseason Schedule');
        for (let game of gameData) {
            let awayTeam = `${teamData[game.away_team_id].location} ${teamData[game.away_team_id].name}`;
            let homeTeam = `${teamData[game.home_team_id].location} ${teamData[game.home_team_id].name}`;
            let date = moment(game.date).format('MMM D');
            let score = common_1.getFinalScore(game);
            if (score.away === score.home) {
                console.log(`${date}, ${awayTeam} vs. ${homeTeam}\n\tFinal Score (Tie):\n\t\t${teamData[game.away_team_id].abbreviation}: ${score.away}\n\t\t${teamData[game.home_team_id].abbreviation}: ${score.home}\n`);
            }
            else {
                let winningTeamId = score.away > score.home ? game.away_team_id : game.home_team_id;
                let winningPlayerName = `${rosterData[winningTeamId][score.winningRBI].first_name} ${rosterData[winningTeamId][score.winningRBI].last_name}`;
                console.log(`${date}, ${awayTeam} vs. ${homeTeam}\n\tFinal Score:\n\t\t${teamData[game.away_team_id].abbreviation}: ${score.away}\n\t\t${teamData[game.home_team_id].abbreviation}: ${score.home}\n\tGame Winning RBI: ${winningPlayerName}\n`);
            }
        }
    });
}
//# sourceMappingURL=winning_rbi.js.map