"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function getFinalScore(gameData) {
    let score = {
        home: 0,
        away: 0,
        winningRBI: '',
    };
    for (let line of gameData.game_data_lines) {
        let splitLine = line.split(',');
        if (splitLine[0] === 'play') {
            // play,10,1,larkg001,00,.....X,S/F78D.3-H;2-3;1-2
            // let inning = Number(splitLine[1]);
            let topBot = Number(splitLine[2]) ? 'bottom' : 'top';
            let batterId = splitLine[3];
            // let count = splitLine[4];
            // let pitchOrder = splitLine[5];
            let result = splitLine[6];
            let runsScored = 0;
            let playType = result.split('/')[0];
            if (_.startsWith(playType, 'HR') || _.startsWith(playType, 'SBH')) {
                runsScored += 1;
            }
            if (_.includes(result, '.')) {
                let advancement = result.split('.')[1];
                let runners = advancement.split(';');
                for (let runner of runners) {
                    // play,3,1,knobc001,12,CP11S.X,S9/G34.2-H;BX2(936)
                    if (runner[1] === 'X') {
                        continue;
                    }
                    let [start, end] = runner.split('-');
                    // play,1,1,davic001,01,CX,HR/F78XD.2-H(UR);B-H(UR)
                    if (end[0] === 'H' && (start !== 'B' || playType != 'HR')) {
                        runsScored += 1;
                    }
                }
            }
            // if (runsScored > 0) {
            //     console.log(topBot, inning, runsScored)
            // }
            if (topBot === 'top') {
                score.away += runsScored;
                if (score.away > score.home) {
                    score.winningRBI = batterId;
                }
            }
            else {
                score.home += runsScored;
                if (score.home > score.away) {
                    score.winningRBI = batterId;
                }
            }
        }
    }
    return score;
}
exports.getFinalScore = getFinalScore;
//# sourceMappingURL=common.js.map