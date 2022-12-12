<script type="ts">
  import sample from "./sample.txt?raw";
  import input from "./input.txt?raw";

  let useSampleData = true;

  interface Monkey {
    items: number[]
    operation: (i: number) => number
    test: (i: number) => boolean
    iftrue: number
    iffalse: number
    inspectedCount: number
  }

  $: data = useSampleData ? sample : input;
  let monkeys: Monkey[]
  $: monkeys = data.split("\n\n").map(monkey => {
    const [, items, operation, test, iftrue, iffalse] = monkey.split("\n")
    const divisibleTest = Number(test.replace("  Test: divisible by ", ""));
    const ifTrueDestination = Number(iftrue.replace("    If true: throw to monkey ", ""));
    const ifFalseDestination = Number(iffalse.replace("    If false: throw to monkey ", ""));
    const [operand, right] = operation.replace("  Operation: new = old ", "").split(" ")
    const oper = (val: number) => {
      const r = right === "old" ? val : Number(right);
      return operand === "+" ? val + r : val * r;
    }
    return {
      items: items.replace("  Starting items: ", "").split(",").map(item => Number(item)),
      operation: oper,
      test: (val) => val % divisibleTest === 0,
      iftrue: ifTrueDestination,
      iffalse: ifFalseDestination,
      inspectedCount: 0
    }
  });
  let steps = 0;
  $: highInspectionMonkeys = monkeys.map(m => m.inspectedCount).sort((a, b) => b - a)

  function step() {
    steps++
    for (let monkey of monkeys) {
      while (monkey.items.length > 0) {
        let item = monkey.items.shift();
        monkey.inspectedCount++;
        item = monkey.operation(item);
        item = Math.floor(item / 3)
        if (monkey.test(item)) {
          monkeys[monkey.iftrue].items.push(item);
        } else {
          monkeys[monkey.iffalse].items.push(item);
        }
      }
    }
    monkeys = monkeys
  }
</script>

<style>
</style>

<h1>Day 11</h1>
<label>
  <input type="checkbox" bind:checked={useSampleData} />
  Use sample data
</label>
<button on:click={step}>Step {steps}</button>
<table>
  {#each monkeys as monkey, i}
    <tr>
      <td>Monkey {i}: {monkey.items.join(", ")} - inspected {monkey.inspectedCount} times</td>
    </tr>
  {/each}
</table>
<p>Score: {highInspectionMonkeys[0] * highInspectionMonkeys[1]}</p>