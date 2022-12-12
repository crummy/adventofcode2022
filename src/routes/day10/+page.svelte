<script type="ts">
    import sample from './sample.txt?raw'
    import input from './input.txt?raw'

    let useSampleData = true

    let data: string
    let x = 1
    let xHistory: number[] = []
    let pc = 0
    let cycle = 0
    $: {
        data = useSampleData ? sample : input
        pc = 0
        cycle = 0
        x = 1
        xHistory = [x, x]
    }
    $: instructions = data.split("\n").reduce((acc, instruction, index) => {
        pc++
        if (instruction === "noop") {
            cycle++
            xHistory.push(x)
        } else {
            const [, inc] = instruction.split(" ")
            x += Number(inc)
            cycle += 2
            xHistory.push(x)
            xHistory.push(x)
        }
        acc.push({instruction, pc, cycle, index, x: xHistory.slice(-3, -2) ?? 1})
        return acc
    }, [])
    $: interesting = {
        "20": 20 * instructions.filter(i => i.cycle >= 20)[0].x,
        "60": 60 * instructions.filter(i => i.cycle >= 60)[0].x,
        "100": 100 * instructions.filter(i => i.cycle >= 100)[0].x,
        "140": 140 * instructions.filter(i => i.cycle >= 140)[0].x,
        "180": 180 * instructions.filter(i => i.cycle >= 180)[0].x,
        "220 ": 220 * instructions.filter(i => i.cycle >= 220)[0].x,
    }
    $: crtRows = xHistory.reduce((acc, element, i) => {
        const row = Math.floor(i / 40)
        const col = i % 40
        acc[row] = acc[row] || []
        acc[row][col] = element
        return acc
    }, []).map(row => row.map((x, index) => x === index || x === index - 1 || x === index + 1 ? "#" : "."))
</script>

<style>
    table {
        font-family: monospace;
    }
</style>

<h1>Day 10</h1>
<label>
    <input type="checkbox" bind:checked={useSampleData}/>
    Use sample data
</label>
<table>
    {#each crtRows as row}
        <tr>
            {#each row as col}
                <td>{col}</td>
            {/each}
        </tr>
    {/each}
</table>
<table>
    <thead>
    <tr>
        <th>Cycle</th>
        <th>Instruction</th>
        <th>x</th>
    </tr>
    </thead>
    <tbody>
    {#each instructions as instruction, i}
        <tr>
            <td>{instruction.cycle}</td>
            <td>{instruction.instruction}</td>
            <td>{instruction.x}</td>
        </tr>
    {/each}
    {#each Object.entries(interesting) as [cycle, signal]}
        <tr>
            <th></th>
            <th>Signal at {cycle}</th>
            <th>{signal}</th>
        </tr>
    {/each}
    <tr>
        <th></th>
        <th>Sum</th>
        <th>{Object.values(interesting).reduce((a, b) => a + b, 0)}</th>
    </tr>
    </tbody>
</table>