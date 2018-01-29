import * as _ from 'lodash';
import * as moment from 'moment';
import * as glob from 'glob';
import { TeamsFileParser } from '../lib/teams_file_parser';
import { RosterFileParser } from '../lib/roster_file_parser';
import { EventFileParser } from '../lib/event_file_parser';
import { FilePicker } from '../lib/file_picker';
import { getFinalScore } from './common';

if (require.main === module) {
    glob(`${__dirname}/../../data/1991_postseason/*`, (err, dataFileNames) => {
        if (err) {
            console.log(err);
            return;
        }
        let filePicker = new FilePicker(dataFileNames);

        let teamData = new TeamsFileParser().parse(filePicker.getTeamsFile(1991));
        let rosterData = new RosterFileParser().parse(filePicker.getRosterFiles(1991))
        let gameData = _.sortBy(new EventFileParser().parse(filePicker.getEventFiles(1991)), 'date');

        console.log('1991 Postseason Schedule');

        for (let game of gameData) {
            let awayTeam = `${teamData[game.away_team_id].location} ${teamData[game.away_team_id].name}`
            let homeTeam = `${teamData[game.home_team_id].location} ${teamData[game.home_team_id].name}`
            let date = moment(game.date).format('MMM D');
            let score = getFinalScore(game);
            if (score.away === score.home) {
                console.log(`${date}, ${awayTeam} vs. ${homeTeam}\n\tFinal Score (Tie):\n\t\t${teamData[game.away_team_id].abbreviation}: ${score.away}\n\t\t${teamData[game.home_team_id].abbreviation}: ${score.home}\n`);
            } else {
                let winningTeamId = score.away > score.home ? game.away_team_id : game.home_team_id;
                let winningPlayerName = `${rosterData[winningTeamId][score.winningRBI].first_name} ${rosterData[winningTeamId][score.winningRBI].last_name}`
                console.log(`${date}, ${awayTeam} vs. ${homeTeam}\n\tFinal Score:\n\t\t${teamData[game.away_team_id].abbreviation}: ${score.away}\n\t\t${teamData[game.home_team_id].abbreviation}: ${score.home}\n\tGame Winning RBI: ${winningPlayerName}\n`);
            }
        }

    });
}


