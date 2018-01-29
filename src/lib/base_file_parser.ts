export class BaseFileParser {
    protected splitLines(fileBuffer: Buffer): string[] {
        let lines = fileBuffer.toString().trim().split('\r\n');

        let allLines: string[] = []
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
