<script type="ts">
    import sample from './sample.txt?raw'
    import input from './input.txt?raw'

    let useSampleData = true

    interface Point {
        x: number
        y: number
    }

    let gridSize = { top: 0, left: 0, right: 0, down: 0 }
    let pc = 0;
    let T: Point = { x: 0, y: 0 }
    let H: Point = { x: 0, y: 0 }
    let S: Point = { x: 0, y: 0 }
    let visited: Set<string> = new Set()
    $: data = useSampleData ? sample : input
    $: instructions = data.split("\n").map(line => line.split(" "))
            .map(([dir, dist]) => ({dir, dist: Number(dist)}))

    function play() {
        if (pc >= instructions.length) {
            return
        } else {
            step();
            setTimeout(play, 1)
        }
    }

    function step() {
        stepH()
        stepT()
        visited.add(`${T.x},${T.y}`)
        visited = visited
    }

    function stepH() {
        const { dir, dist } = instructions[pc]
        if (dir === "U") {
            H.y++
        } else if (dir === "D") {
            H.y--
        } else if (dir === "L") {
            H.x--
        } else if (dir === "R") {
            H.x++
        }
        instructions[pc].dist = dist - 1
        if (instructions[pc].dist == 0) {
            pc++
        }
        gridSize = { top: Math.min(gridSize.top, H.y), left: Math.min(gridSize.left, H.x), right: Math.max(gridSize.right, H.x), down: Math.max(gridSize.down, H.y) }
    }

    function stepT() {
        if (Math.abs(H.x - T.x) <= 1 && Math.abs(H.y - T.y) <= 1) {
            // Adjacent (or on top of each other)
            return;
        } else {
            const moveDiagonally = Math.abs(H.x - T.x) > 0 && Math.abs(H.y - T.y) > 0
            if (moveDiagonally) {
                if (T.y < H.y) {
                    T.y++
                } else {
                    T.y--
                }
                if (T.x < H.x) {
                    T.x++
                } else {
                    T.x--
                }
            } else {
                if (T.y < H.y) {
                    T.y++
                } else if (T.y > H.y) {
                    T.y--
                } else if (T.x < H.x) {
                    T.x++
                } else if (T.x > H.x) {
                    T.x--
                }
            }
        }
    }
</script>

<style>
    .highlighted {
        background-color: yellow;
    }

    table {
        font-family: monospace;
    }
</style>

<h1>Day 9</h1>
<label>
    <input type="checkbox" bind:checked={useSampleData}/>
    Use sample data
</label>
<button on:click={step} disabled={pc === instructions.length}>Step</button>
<button on:click={play} disabled={pc === instructions.length}>Play</button>
<table>
<!-- luckily grid never goes negative -->
    {#each { length: gridSize.down - gridSize.top + 1 } as _, y}
        <tr>
            {#each { length: gridSize.right - gridSize.left + 1 } as _, x}
                <td>{ x === H.x && y === H.y ? "H" : x === T.x && y === T.y ? "T" : x === S.x && y === S.y ? 's' : visited.has(`${x},${y}`) ? "#" : "."}</td>
            {/each}
        </tr>
    {/each}
</table>
<table>
    {#each instructions as instruction, i}
        <tr class:highlighted={i === pc}>
            <td>{instruction.dir}</td>
            <td>{instruction.dist}</td>
        </tr>
    {/each}
</table>
<p>
    Visited: {visited.size}
</p>