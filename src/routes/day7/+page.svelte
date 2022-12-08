<script type="ts">
    import sample from './sample.txt?raw'
    import input from './input.txt?raw'
    import {parse} from "./Parser";

    let useSampleData = true

    const SMALL_FOLDER_SIZE = 100000
    const DISK_SIZE = 70000000
    const SPACE_REQUIRED = 30000000

    let folderSizes: Record<string, number>
    let totalSmallFolders: number;
    let diskUsed: number;
    let diskShortage: number;
    let pathToDelete: string;
    $: {
        const data = useSampleData ? sample : input
        const result = parse(data)
        folderSizes = result.folderSizes
        totalSmallFolders = Object.entries(folderSizes).map(([_, size]) => size).filter(size => size < SMALL_FOLDER_SIZE).reduce((a, b) => a + b, 0)
        diskUsed = result.diskUsed
        diskShortage = SPACE_REQUIRED - (DISK_SIZE - diskUsed)
        pathToDelete = Object.entries(folderSizes).sort(([, a], [, b]) => a - b).find(([, size]) => size > diskShortage)?.[0]
    }
</script>

<style>
    .deleteMe {
        font-weight: bold;
    }
</style>

<h1>Day 7</h1>
<label>
    <input type="checkbox" bind:checked={useSampleData}/>
    Use sample data
</label>
<table>
    <thead>
    <tr>
        <th>Folder</th>
        <th>Size</th>
        <th>Small?</th>
    </tr>
    </thead>
    <tbody>
    {#each Object.entries(folderSizes) as [path, size]}
        <tr>
            <td class:deleteMe={path === pathToDelete}>{path}</td>
            <td>{size}</td>
            <td>{size < SMALL_FOLDER_SIZE ? "Y" : ""}</td>
        </tr>
    {/each}
    <tr>
        <td>Sum</td>
        <th>{Object.values(folderSizes).reduce((a, b) => a + b, 0)}</th>
        <th>{totalSmallFolders}</th>
    </tr>
    <tr>
        <td>Disk Used</td>
        <th>{diskUsed}</th>
    </tr>
    <tr>
        <td>Disk Shortage</td>
        <th>{diskShortage}</th>
    </tr>
    </tbody>
</table>
