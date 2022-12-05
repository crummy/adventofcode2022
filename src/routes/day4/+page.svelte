<script type="ts">
    import sample from './sample.txt?raw'
    import input from './input.txt?raw'

    let useSampleData = true

    interface Range {
        start: number;
        end: number;
    }

    interface RangePair {
        first: Range;
        second: Range;
        totalOverlap: boolean;
        partialOverlap: boolean;
    }

    function toRange(range): Range {
        let [start, end] = range.split('-').map(Number)
        return {start, end}
    }

    function within(range1: Range, range2: Range) {
        return range1.start <= range2.start && range1.end >= range2.end
    }

    function overlaps(range1: Range, range2: Range) {
        return range1.start <= range2.end && range1.end >= range2.start
    }

    let assignments: RangePair[]
    let max: number;
    let min: number;

    $: {
        const data = useSampleData ? sample : input
        assignments = data.split("\n")
            .map(line => line.split(",").map(range => toRange(range)))
            .map(([first, second]) => ({first, second, totalOverlap: within(first, second) || within(second, first), partialOverlap: overlaps(first, second)}))
        max = Math.max(...assignments.map(({first, second}) => Math.max(first.end, second.end)))
        min = Math.min(...assignments.map(({first, second}) => Math.min(first.start, second.start)))

    }

    const margin = 5;
</script>

<style>
    td > svg {
        min-width: 300px;
    }
</style>

<h1>Day 4</h1>
<label>
    <input type="checkbox" bind:checked={useSampleData}/>
    Use sample data
</label>
<table>
    <thead>
    <tr>
        <th>First</th>
        <th>Second</th>
        <th></th>
        <th>Total Overlap</th>
        <th>Partial Overlap</th>
    </tr>
    </thead>
    <tbody>
    {#each assignments as {first, second, totalOverlap, partialOverlap}}
    <tr>
        <td>{first.start}-{first.end}</td>
        <td>{second.start}-{second.end}</td>
        <td>
            <svg width="100%" height="30px" preserveAspectRatio="none" viewBox="{min - margin} 0 {max + margin} 20">
                <path d={`M ${min} 15 V 20 H ${max} V 15`} stroke="black" fill="none"></path>
                <path d={`M ${first.start} 10 V 12 V 8 V 10 H ${first.end} V 12 V 8`} stroke="blue" fill="none"></path>
                <path d={`M ${second.start} 5 V 7 V 3 V 5 H ${second.end} V 7 V 3`} stroke="red" fill="none"></path>
            </svg>
        </td>
        <td>{totalOverlap ? 'Yes' : 'No'}</td>
        <td>{partialOverlap ? 'Yes' : 'No'}</td>
    </tr>
    {/each}
    <tr>
        <th></th>
        <th></th>
        <th></th>
        <th>{assignments.filter(({totalOverlap}) => totalOverlap).length}</th>
        <th>{assignments.filter(({partialOverlap}) => partialOverlap).length}</th>
    </tr>
    </tbody>
</table>
