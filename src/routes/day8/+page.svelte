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
        for (let left = x - 1; left >= 0; --left) {
            treesToLeft++
            if (grid[y][left] >= tree) {
                break
            }
        }

        let treesToRight = 0
        for (let right = x + 1; right < grid.length; ++right) {
            treesToRight++
            if (grid[y][right] >= tree) {
                break
            }
        }

        let treesAbove = 0
        for (let up = y - 1; up >= 0; --up) {
            treesAbove++
            if (grid[up][x] >= tree) {
                break
            }
        }

        let treesBelow = 0
        for (let down = y + 1; down < grid[y].length; ++down) {
            treesBelow++
            if (grid[down][x] >= tree) {
                break
            }
        }
        const onBorder = x == 0 || x == grid[y].length - 1 || y == 0 || y == grid.length - 1
        const visibleFromLeft = treesToLeft == x && grid[y][0] < tree
        const visibleFromRight = treesToRight == (grid[y].length - x - 1) && grid[y][grid[y].length - 1] < tree
        const visibleFromUp = treesAbove == y && grid[0][x] < tree;
        const visibleFromDown = treesBelow == (grid.length - y - 1) && grid[grid.length - 1][x] < tree;
        return {
            height: tree,
            left: treesToLeft,
            right: treesToRight,
            up: treesAbove,
            down: treesBelow,
            score: treesToLeft * treesToRight * treesAbove * treesBelow,
            visibleFromEdge: visibleFromLeft || visibleFromRight || visibleFromUp || visibleFromDown || onBorder
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