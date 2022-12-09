<script type="ts">
    import sample from './sample.txt?raw'
    import input from './input.txt?raw'

    let useSampleData = true
    let trees: Record<string, View>
    let grid: number[][]

    interface View {
        height: number;
        left: number;
        right: number;
        up: number;
        down: number;
        score: number;
        visibleFromEdge: boolean;
    }

    $: {
        const data = useSampleData ? sample : input

        grid = data.split("\n").map(line => line.split("").map(tree => Number(tree)))

        trees = {}
        for (let y = 0; y < grid.length; y++) {
            const row = grid[y]
            for (let x = 0; x < row.length; x++) {
                trees[`${x},${y}`] = getVisibility(x, y)
            }
        }
        console.log(trees)
    }

    function getVisibility(x: number, y: number): View {
        const tree = grid[y][x]

        let treesToLeft = 0
        for (let left = x - 1; left >= 0 && grid[y][left] < tree; --left) {
            treesToLeft++
        }

        let treesToRight = 0
        for (let right = x + 1; right < grid.length && grid[y][right] < tree; ++right) {
            treesToRight++
        }

        let treesAbove = 0
        for (let up = y - 1; up >= 0 && grid[up][x] < tree; --up) {
            treesAbove++
        }

        let treesBelow = 0
        for (let down = y + 1; down < grid[y].length && grid[down][x] < tree; ++down) {
            treesBelow++
        }
        const visibleFromLeft = treesToLeft == x;
        const visibleFromRight = treesToRight == (grid.length - x - 1);
        const visibleFromUp = treesAbove == y;
        const visibleFromDown = treesBelow == (grid[x].length - y - 1);
        return {
            height: tree,
            left: treesToLeft,
            right: treesToRight,
            up: treesAbove,
            down: treesBelow,
            score: treesToLeft * treesToRight * treesAbove * treesBelow,
            visibleFromEdge: visibleFromLeft || visibleFromRight || visibleFromUp || visibleFromDown
        }
    }
</script>

<style>
    .visible {
        background-color: green;
    }

    table {
        font-family: monospace;
    }
</style>

<h1>Day 8</h1>
<label>
    <input type="checkbox" bind:checked={useSampleData}/>
    Use sample data
</label>
<table>
    <tbody>
    {#each grid as row, y}
        <tr>
            {#each row as tree, x}
                <td class:visible={trees[`${x},${y}`].visibleFromEdge} title={`${x},${y}`}>
                    {tree}
                </td>
            {/each}
        </tr>
    {/each}
    </tbody>
</table>
<p>Total visible trees: {Object.values(trees).filter(tree => tree.visibleFromEdge).length}</p>
<p>Max score: {Math.max(...Object.values(trees).map(tree => tree.score))}</p>