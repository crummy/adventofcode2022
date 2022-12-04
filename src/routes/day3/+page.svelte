<script type="ts">
    import sample from './sample.txt?raw'
    import input from './input.txt?raw'
    import {toRucksacks} from "./Rucksack";

    let useSampleData = true
    let rucksacks: Rucksack[]
    $: {
        let data = useSampleData ? sample : input
        rucksacks = toRucksacks(data)
    }

</script>

<style>
</style>

<h1>Day 3</h1>
<label>
    <input type="checkbox" bind:checked={useSampleData}/>
    Use sample data
</label>
<table>
    <thead>
    <tr>
        <th>Backpack</th>
        <th>First Compartment</th>
        <th>Second Compartment</th>
        <th>Duplicates</th>
        <th>Priority</th>
        <th>Badge</th>
        <th>Badge Priority</th>
    </tr>
    </thead>
    <tbody>
    {#each rucksacks as rucksack, index}
        <tr>
            <td>{index}</td>
            <td>{rucksack.first}</td>
            <td>{rucksack.second}</td>
            <td>{rucksack.duplicates}</td>
            <td>{rucksack.priority}</td>
            <td>{rucksack.badge}</td>
            <td>{rucksack.badgePriority}</td>
        </tr>
    {/each}
    <tr>
        <th>Total</th>
        <td></td>
        <td></td>
        <td></td>
        <th>{rucksacks.map(line => line.priority).reduce((a, b) => a + b, 0)}</th>
        <td></td>
        <th>{rucksacks.map(line => line.badgePriority).reduce((a, b) => a + b, 0) / 3}</th>
    </tr>
    </tbody>
</table>
