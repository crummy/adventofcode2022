type Move = "A" | "B" | "C"
type Result = "X" | "Y" | "Z"

const shapeScore: Record<Move, number> = {
    A: 1,
    B: 2,
    C: 3
}

const WIN = 6
const DRAW = 3
const LOSS = 0

export class Round2 {
    action: Move;
    score: number;

    constructor(readonly result: Result, readonly opponent: Move) {
        let score = 0
        if (this.result === "Y") { // draw
            this.action = this.opponent
            score += DRAW
        } else if (this.result === "X") { // lose
            score += LOSS
            if (this.opponent === "A") this.action = "C"
            if (this.opponent === "B") this.action = "A"
            if (this.opponent === "C") this.action = "B"
        } else if (this.result === "Z") { // win
            score += WIN
            if (this.opponent === "A") this.action = "B"
            if (this.opponent === "B") this.action = "C"
            if (this.opponent === "C") this.action = "A"
        }
        this.score = score + shapeScore[this.action]
    }

}