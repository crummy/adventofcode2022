export interface Rucksack {
    first: string;
    second: string;
    duplicates: string;
    priority: number;
    badge: string;
    badgePriority: number;
}

function priority(c: string): number {
    if (c >= 'a' && c <= 'z') {
        return c.charCodeAt(0) - 'a'.charCodeAt(0) + 1
    } else if (c >= 'A' && c <= 'Z') {
        return c.charCodeAt(0) - 'A'.charCodeAt(0) + 1 + 26
    } else {
        throw new Error("Unrecognized character: " + c)
    }
}

function findCommonChar(...lines: string[]): string {
    const uniques: string[][] = lines.map(line => [...line].reduce((acc: any, c: string) => {
        acc[c] = 1
        return acc
    }, {})).map(counts => Object.keys(counts))
    const totals : Record<string, number> = uniques.reduce((acc: any, u: string[]) => {
        for (const c of u) {
            acc[c] = (acc[c] || 0) + 1
        }
        return acc
    }, {})
    const [common] = Object.entries(totals).find(([letter, count]) => count == lines.length) || []
    if (!common) {
        throw new Error("Could not find common char in " + lines)
    } else {
        return common;
    }
}

export function toRucksacks(input: string): Rucksack[] {
    const lines = input.split('\n')
    const rucksacks: Rucksack[] = []
    for (let i = 0; i < lines.length; i += 3) {
        const badge = findCommonChar(lines[i], lines[i+1], lines[i+2])
        for (let j = 0; j < 3; j++) {
            const line = lines[i+j]
            const first = line.substring(0, line.length / 2);
            const second = line.substring(line.length / 2, line.length);
            const duplicate = findCommonChar(first, second)
            const rucksack = {
                first,
                second,
                duplicates: duplicate,
                priority: priority(duplicate),
                badge,
                badgePriority: priority(badge),
            }
            rucksacks.push(rucksack)
        }
    }
    return rucksacks;
}