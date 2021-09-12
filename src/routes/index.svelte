<script>
  const baseItem = {
    what: '',
    who: '',
    amt: null
  }
  let items = [{ ...baseItem }]
  let total = null

  function addItem () {
    items = [ ...items, { ...baseItem }]
  }

  function removeItem (i) {
    items.splice(i, 1)
    items = items
  }

  $: totalsByName = items.reduce((totals, item) => {
    if (!isNaN(item.amt)) {
      totals[item.who] = (totals[item.who] || 0) + item.amt
    }
    return totals
  }, {})
  $: totalsByNameList = Object.keys(totalsByName)
    .map((who) => ({ who, amt: totalsByName[who] }))
  $: subtotal = items.reduce((sub, item) => {
    sub += isNaN(item.amt) ? 0 : item.amt
    return sub
  }, 0)
</script>

<svelte:head>
  <title>BillSplit</title>
</svelte:head>

<h1>BillSplit</h1>

<button on:click={addItem}>Add Item</button>

<ul>
  {#each items as item, i}
    <li>
      <input placeholder="What" bind:value={item.what}>
      <input placeholder="Name" bind:value={item.who}>
      <input placeholder="Amount" bind:value={item.amt} type="number">
      <button on:click={() => { removeItem(i) }}>x</button>
    </li>
  {/each}
</ul>

<div>
  <label for="subtotal">Subtotal:</label>
  ${subtotal.toFixed(2)}
</div>
<div>
  <label for="total">Paid Amount:</label>
  <input id="total" bind:value={total} type="number">
</div>

<hr>

<h4>Totals by Person</h4>
<table>
  <thead>
    <tr>
      <td>Name</td>
      <td>Subtotal</td>
      <td>Total</td>
    </tr>
  </thead>
  <tbody>
    {#each totalsByNameList as { who, amt }}
      <tr>
        <td>{who}</td>
        <td>${amt.toFixed(2)}</td>
        <td>${(amt * total / (subtotal || 1)).toFixed(2)}</td>
      </tr>
    {:else}
      <tr>
        <td colspan="3">No Items Found!</td>
      </tr>
    {/each}
  </tbody>
</table>
