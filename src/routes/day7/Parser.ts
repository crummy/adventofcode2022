interface Folder {
    [key: string]: Folder | File
}

type File = number

function parseDisk(commands: { output: string[]; command: string }[]) {
    const disk: Folder = {}
    let path: string[] = []

    for (let {command, output} of commands) {
        const [cmd, args] = command.split(" ")
        if (cmd === "cd") {
            if (args == "..") {
                path.pop()
            } else if (args == "/") {
                path = []
            } else {
                path.push(args)
            }
        } else if (cmd === "ls") {
            let dir = disk
            for (let p of path) {
                dir = dir[p] as Folder
            }
            for (let file of output) {
                const [a, name] = file.split(" ")
                if (a === "dir") {
                    dir[name] = {}
                } else {
                    dir[name] = Number(a)
                }
            }
        }
    }
    return disk;
}

function getFolderSizes(folder: Folder, parent: string = ""): { children: Record<string, number>; size: number } {
    let result: Record<string, number> = {}
    let mySize = 0
    for (let [name, node] of Object.entries(folder)) {
        const path = `${parent}/${name}`;
        if (typeof node === "number") {
            mySize += node
        } else {
            const { children, size } = getFolderSizes(node, path);
            result = { [path]: size, ...result, ...children }
            mySize += size
        }
    }
    return {
        children: result,
        size: mySize
    }
}

function getDiskUsed(disk: Folder): number {
    let size = 0
    for (let [_, node] of Object.entries(disk)) {
        if (typeof node === "number") {
            size += node
        } else {
            size += getDiskUsed(node)
        }
    }
    return size
}

export function parse(input: string) {

    const commands = input.split("$ ")
        .filter(l => l.length > 0)
        .map(line => line.split("\n"))
        .map(([command, ...output]) => ({command, output: output.filter(l => l.length > 0)}))

    const disk: Folder = parseDisk(commands);

    const folderSizes = getFolderSizes(disk);

    const diskUsed = getDiskUsed(disk);

    return {
        commands,
        disk,
        folderSizes: folderSizes.children,
        diskUsed,
    }
}

