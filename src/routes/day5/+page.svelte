<script type="ts">
    import sample from './sample.txt?raw'
    import input from './input.txt?raw'
    import {parse} from "./Parser";
    import type { CrateTower, Instruction } from "./Parser";

    let useSampleData = true

    let state: CrateTower[]
    let instructions: Instruction[]
    let cursor = 0;
    $: {
        const data = useSampleData ? sample : input
        const result = parse(data)
        state = result.state
        instructions = result.instructions
    }

    function next() {
        const {quantity, from, to} = instructions[cursor]
        for (let i = 0; i < quantity; i++) {
            const crate = state[from - 1].pop();
            state[to - 1].push(crate)
        }
        cursor++
        state = state
    }

    function next9001() {
        const {quantity, from, to} = instructions[cursor]
        const pickUp = state[from - 1].slice(-quantity)
        state[from - 1].splice(-quantity)
        state[to - 1].push(...pickUp)
        cursor++
        state = state
    }

    function play() {
        setTimeout(() => {
            next()
            if (cursor < instructions.length) play()
        }, 16)
    }

    function play9001() {
        setTimeout(() => {
            next9001()
            if (cursor < instructions.length) play9001()
        }, 16)
    }
</script>

<style>
    .highlighted {
        background-color: #ff0;
    }
</style>

<h1>Day 5</h1>
<label>
    <input type="checkbox" bind:checked={useSampleData}/>
    Use sample data
</label>
<button on:click={next} disabled={cursor === instructions.length}>Next</button>
<button on:click={play}>Play</button>
<br>
<button on:click={next9001} disabled={cursor === instructions.length}>Next, part 2</button>
<button on:click={play9001}>Play, part 2</button>
<div id="stacks">
{#each state as tower, i}
    <div class="stack">
        {i + 1}: {tower.join(", ")}
    </div>
{/each}
</div>
<div id="instructions">
    {#each instructions as instruction, i}
        <div class="instruction" class:highlighted={cursor === i}>
            {instruction.text}
        </div>
    {/each}
</div>
<div id="result">
    Top of the stacks: {state.map(tower => tower[tower.length - 1]).join("")}
</div>
