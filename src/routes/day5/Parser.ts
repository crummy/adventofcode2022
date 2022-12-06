export type CrateTower = string[];

export interface Instruction {
    text: string;
    quantity: number;
    from: number;
    to: number;
}

interface Result {
    state: CrateTower[];
    instructions: Instruction[];
}

const instructionRegex = /move (\d+) from (\d+) to (\d+)/
export function parse(input: string): Result {
    const [stateLines, instructionLines] = input.split("\n\n").map(line => line.split("\n"));

    const crateTowers: CrateTower[] = []
    for (let lineIndex = 0; lineIndex < stateLines.length; lineIndex++) {
        if (lineIndex == stateLines.length - 1) {
            // last line is labels - don't read it
            break;
        }
        const line = stateLines[lineIndex];
        for (let i = 0; i < line.length; i++) {
            if (i % 4 == 1 && line[i] != " ") {
                const crateIndex = (i - 1) / 4;
                crateTowers[crateIndex] = crateTowers[crateIndex] || [];
                crateTowers[crateIndex].unshift(line[i]);
            }
        }
    }

    const instructions = instructionLines
        .map(line => instructionRegex.exec(line))
        .map(line => line as RegExpExecArray)
        .map(([text, quantity, from, to]) => ({text, quantity: parseInt(quantity), from: parseInt(from), to: parseInt(to)}))

    return {
        state: crateTowers,
        instructions
    }
}