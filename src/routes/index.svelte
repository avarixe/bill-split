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
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
  >
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
  >
</svelte:head>

<div class="container">
  <h1 class="fw-light py-2">BillSplit</h1>

  <button
    on:click={addItem}
    class="btn btn-primary"
  >
    Add Item
  </button>

  <table class="table table-hover">
    <thead>
      <tr>
        <th>What</th>
        <th>Who</th>
        <th>Amount</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {#each items as item, i}
        <tr>
          <td>
            <input
              bind:value={item.what}
              class="form-control form-control-sm"
            />
          </td>
          <td>
            <input
              bind:value={item.who}
              placeholder="N/A"
              class="form-control form-control-sm"
            />
          </td>
          <td>
            <div class="input-group input-group-sm">
              <span class="input-group-text">$</span>
              <input
                bind:value={item.amt}
                class="form-control"
                type="number"
                min={0}
                step={2}
              />
            </div>
          </td>
          <td>
            <button
              on:click={() => { removeItem(i) }}
              class="btn btn-sm btn-danger"
            >
              <i class="bi-x" />
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <div>
    <span class="form-label">Subtotal:</span>
    <small class="form-text text-muted">${subtotal.toFixed(2)}</small>
  </div>
  <div class="d-flex align-items-center">
    <span class="form-label mb-0" style="width: 10rem">Paid Amount:</span>
    <div class="input-group input-group-sm">
      <span class="input-group-text">$</span>
      <input
        bind:value={total}
        id="total"
        class="form-control"
        type="number"
        min={0}
        step={2}
      />
    </div>
  </div>

  <hr>

  <h4>Totals by Person</h4>

  <table class="table table-hover">
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
          <td>{who || 'N/A'}</td>
          <td>${amt.toFixed(2)}</td>
          <td>${(amt * total / (subtotal || 1)).toFixed(2)}</td>
        </tr>
      {:else}
        <tr class="table-danger">
          <td colspan="3">No Items Found!</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
