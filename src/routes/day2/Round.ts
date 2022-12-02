type Opponent = "A" | "B" | "C"
type Self = "X" | "Y" | "Z"

const shapeScore: Record<Self, number> = {
    X: 1,
    Y: 2,
    Z: 3
}

const WIN = 6
const DRAW = 3
const LOSS = 0

export class Round {
    constructor(readonly self: Self, readonly opponent: Opponent) {
    }

    get score() {
        if (this.self === "X" && this.opponent === "A") return DRAW + shapeScore[this.self]
        if (this.self === "Y" && this.opponent === "B") return DRAW + shapeScore[this.self]
        if (this.self === "Z" && this.opponent === "C") return DRAW + shapeScore[this.self]
        if (this.self === "X" && this.opponent === "C") return WIN + shapeScore[this.self]
        if (this.self === "Y" && this.opponent === "A") return WIN + shapeScore[this.self]
        if (this.self === "Z" && this.opponent === "B") return WIN + shapeScore[this.self]
        return LOSS + shapeScore[this.self]
    }
}