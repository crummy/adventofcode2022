<script type="ts">
    const pages = {
        "1": "Calorie Counting",
        "2": "Rock Paper Scissors",
        "3": "Rucksack Reorganization",
        "4": "Camp Cleanup",
        "5": "Supply Stacks",
        "6": "Tuning Trouble",
        "7": "No Space Left On Device",
        "8": "Treetop Tree House",
        "9": "Rope Bridge",
        "10": "Cathode-Ray Tube"
    }
</script>

<style>
    section {
        display: flex;
        flex-wrap: wrap;
        grid-gap: 1em;
        justify-content: space-between;
    }

    a {
        min-width: 300px;
        background-color: var(--primary-color);
        padding: 1em;
        color: black;
        text-decoration: none;
        box-shadow: 0 0 3px;
    }
</style>

<h1>Advent of Code 2022</h1>
<section>
    {#each Object.entries(pages) as [day, title]}
        <a href="/day{day}">
            <h2>Day {day}</h2>
            <h3>{title}</h3>
        </a>
    {/each}
</section>
