<script type="ts">
    import sample from './sample.txt?raw'
    import input from './input.txt?raw'
    import {Round} from "./Round";
    import {Round2} from "./Round2";

    let useSampleData = true

    let rounds: Round[]
    let score: number
    $: {
        const data = useSampleData ? sample : input
        rounds = data.split("\n")
            .map(line => line.split(" "))
            .map(([opponent, self]) => new Round(self, opponent))
        score = rounds.map(r => r.score).reduce((a, b) => a + b, 0)
    }
    let rounds2: Round2[]
    let score2: number
    $: {
        const data = useSampleData ? sample : input
        rounds2 = data.split("\n")
            .map(line => line.split(" "))
            .map(([opponent, self]) => new Round2(self, opponent))
        score2 = rounds2.map(r => r.score).reduce((a, b) => a + b, 0)
    }

</script>

<style>
</style>

<h1>Day 2</h1>
<label>
    <input type="checkbox" bind:checked={useSampleData}/>
    Use sample data
</label>
<table>
    <thead>
    <tr>
        <th>Opponent</th>
        <th>Self</th>
        <th>Score (part 1)</th>
        <th>Action</th>
        <th>Score (part 2)</th>
    </tr>
    </thead>
    <tbody>
    {#each rounds as round, index}
        <tr>
            <td>{round.opponent}</td>
            <td>{round.self}</td>
            <td>{round.score}</td>
            <td>{rounds2[index].action}</td>
            <td>{rounds2[index].score}</td>
        </tr>
    {/each}
    <tr>
        <td></td>
        <td></td>
        <td>{score}</td>
        <td></td>
        <td>{score2}</td>
    </tr>
    </tbody>
</table>
