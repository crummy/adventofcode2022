<script type="ts">
    import sample from './sample.txt?raw'
    import input from './input.txt?raw'

    let useSampleData = true
    let elves: number[]
    let sort: "elf" | "calories" = "elf"
    let maxCalories: number;
    let top3: number;
    $: {
        const data = useSampleData ? sample : input
        elves = data.split("\n\n")
            .map(elf =>
                elf.split("\n").map(calorie => parseInt(calorie)).reduce((a, b) => a + b, 0)
            )
        const sortedElves = elves.sort((a, b) => b - a) // sorted descending
        maxCalories = sortedElves[0]
        top3 = sortedElves[0] + sortedElves[1] + sortedElves[2]
        if (sort === "calories") {
            elves = sortedElves
        }
    }
</script>

<style>
    .maxElf {
        background-color: darkcyan;
    }
    button.link {

    }
</style>

<h1>Day 1</h1>
<label>
    <input type="checkbox" bind:checked={useSampleData}/>
    Use sample data
</label>
<table>
    <thead>
    <tr>
        <th><button class="link" onClick={() => sort = "elf"}>Elf</button></th>
        <th><button class="link" onClick={() => sort = "calories"}>Calories</button></th>
    </tr>
    </thead>
    <tbody>
    {#each elves as carrying, index}
        <tr class:maxElf={carrying === maxCalories}>
            <td>{index}</td>
            <td>{carrying}</td>
        </tr>
    {/each}
    </tbody>
</table>
<p>
    Answer part A: {maxCalories} calories
</p>
<p>
    Answer part B: {top3} calories
</p>