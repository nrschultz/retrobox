import * as _ from 'lodash';

export class FilePicker {
    constructor(private allFiles: string[]) { }

    getTeamsFile(season: number): string {
        let fileName = _.find(this.allFiles, (fileName) => {
            return _.endsWith(fileName, `TEAM${season}`);
        })
        if (fileName) {
            return fileName
        } else {
            throw new Error(`no teams file was found for the ${season} season`)
        }
    }

    getRosterFiles(season: number): string[] {
        let fileNames = _.filter(this.allFiles, (fileName) => {
            return _.endsWith(fileName, `${season}.ROS`);
        })
        if (fileNames.length > 0) {
            return fileNames
        } else {
            throw new Error(`no roster files were found for the ${season} season`)
        }
    }

    getEventFiles(season: number): string[] {
        let fileNames = _.filter(this.allFiles, (fileName) => {
            return (_.endsWith(fileName, `.EVE`) || _.endsWith(fileName, `.EVA`) || _.endsWith(fileName, `.EVN`)) && _.includes(fileName, season.toString());
        })
        if (fileNames.length > 0) {
            return fileNames
        } else {
            throw new Error(`no event files were found for the ${season} season`)
        }
    }
}
