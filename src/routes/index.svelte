<script>
  let items = []

  function addItem () {
    items = [
      ...items,
      {
        what: '',
        who: '',
        amount: 0
      }
    ]
  }
</script>

<svelte:head>
  <title>BillSplit</title>
</svelte:head>

<h1>BillSplit</h1>

<button on:click={addItem}>Add Item</button>

<ul>
  {#each items as item}
    <li>
      <input placeholder="What" bind:value={item.what}>
      <input placeholder="Who" bind:value={item.who}>
      <input placeholder="Amount" bind:value={item.amount} type="number">
    </li>
  {/each}
</ul>
