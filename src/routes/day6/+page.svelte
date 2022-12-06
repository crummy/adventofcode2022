<script type="ts">
    import sample from './sample.txt?raw'
    import input from './input.txt?raw'
    import {FixedLengthQueue} from "./Queue";

    let useSampleData = true

    interface Stream {
        chars: string[]
    }

    let streams: Stream[]

    function toStream(line) {
        const chars = line.split('');
        let firstMarker = 0
        const queue = new FixedLengthQueue(4)
        for (let i = 0; i < chars.length; i++) {
            const char = chars[i]
            queue.enqueue(char)
            if (queue.isFull && queue.isUnique()) {
                firstMarker = i + 1
                break
            }
        }
        let firstMessage = 0
        const messageQueue = new FixedLengthQueue(14)
        for (let i = 0; i < chars.length; i++) {
            const char = chars[i]
            messageQueue.enqueue(char)
            if (messageQueue.isFull && messageQueue.isUnique()) {
                firstMessage = i + 1
                break
            }
        }

        return {
            chars,
            firstMarker,
            firstMessage
        };
    }

    $: {
        const data = useSampleData ? sample : input
        streams = data.split('\n').map(line => toStream(line))
    }
</script>

<style>
    .marker {
        background-color: #ff0;
    }

    .message {
        background-color: #00f;
    }

    table {
        font-family: monospace;
    }

    td {
        overflow-wrap: anywhere;
    }
</style>

<h1>Day 6</h1>
<label>
    <input type="checkbox" bind:checked={useSampleData}/>
    Use sample data
</label>
<table>
    {#each streams as stream}
        <tr>
            <td>
                {#each stream.chars as char, i}
                    <span
                            class:marker={i < stream.firstMarker && i >= stream.firstMarker - 4}
                            class:message={i < stream.firstMessage && i >= stream.firstMessage - 14}
                    >{char}</span>
                {/each}
            </td>
            <th>{stream.firstMarker}</th>
            <th>{stream.firstMessage}</th>
        </tr>
    {/each}
</table>