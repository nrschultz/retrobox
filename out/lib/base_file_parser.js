"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseFileParser {
    splitLines(fileBuffer) {
        let lines = fileBuffer.toString().trim().split('\r\n');
        let allLines = [];
        for (let line of lines) {
            // EOF character
            if (line === '\x1A') {
                break;
            }
            allLines.push(line);
        }
        return allLines;
    }
}
exports.BaseFileParser = BaseFileParser;
//# sourceMappingURL=base_file_parser.js.map