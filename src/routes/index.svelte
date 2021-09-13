<script>
  import { mdiClose } from '@mdi/js'

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

<style windi:preflights:global windi:safelist:global>
</style>

<div class="container mx-auto">
  <h1 class="text-4xl mt-2 mb-4">BillSplit</h1>

  <button
    on:click={addItem}
    class="border border-blue-600 rounded bg-blue-500 hover:bg-blue-600 active:ring ring-blue-700 text-light-400 py-1 px-2 outline-none"
  >
    Add Item
  </button>

  <div class="table table-auto border-collapse w-full mb-2">
    <div class="table-header-group">
      <div class="table-row border-b">
        <div class="table-cell font-medium p-2">What</div>
        <div class="table-cell font-medium p-2">Who</div>
        <div class="table-cell font-medium p-2">Amount</div>
        <div class="table-cell font-medium p-2"></div>
      </div>
    </div>
    <div class="table-row-group">
      {#each items as item, i}
        <div class="table-row hover:bg-gray-100 focus:bg-gray-100">
          <div class="table-cell p-2 align-middle">
            <input
              bind:value={item.what}
              class="border rounded w-full py-1 px-2 focus:ring ring-blue-500 outline-none"
              autofocus
            >
          </div>
          <div class="table-cell p-2 align-middle">
            <input
              bind:value={item.who}
              class="border rounded w-full py-1 px-2 focus:ring ring-blue-500 outline-none"
              placeholder="N/A"
            >
          </div>
          <div class="table-cell p-2 align-middle">
            <input
              bind:value={item.amt}
              class="border rounded w-full py-1 px-2 focus:ring ring-blue-500 outline-none"
              type="number"
              min="0"
            >
          </div>
          <div class="table-cell p-2 text-center">
            <button
              on:click={() => { removeItem(i) }}
              class="border border-red-600 rounded bg-red-500 hover:bg-red-600 active:ring ring-red-700 py-1 px-2 outline-none"
            >
              <svg class="fill-light-400" width="24px" height="24px">
                <path d={mdiClose} />
              </svg>
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="pt-2">
    <span class="font-medium">Subtotal:</span>
    <input
      value={subtotal.toFixed(2)}
      class="border rounded py-1 px-2 focus:ring ring-blue-500 outline-none"
      disabled
      type="number"
      min="0"
    >
  </div>
  <div class="py-2">
    <span class="font-medium">Paid Amount:</span>
    <input
      bind:value={total}
      class="border rounded py-1 px-2 focus:ring ring-blue-500 outline-none"
      type="number"
      min="0"
    >
  </div>

  <hr class="my-4">

  <h4 class="text-xl mb-2">Totals by Person</h4>
  <div class="table table-auto border-collapse w-full">
    <div class="table-header-group">
      <div class="table-row border-b">
        <div class="table-cell font-medium p-2">Name</div>
        <div class="table-cell font-medium p-2">Subtotal</div>
        <div class="table-cell font-medium p-2">Total</div>
      </div>
    </div>
    <div class="table-row-group">
      {#each totalsByNameList as { who, amt }}
        <div class="table-row hover:bg-gray-100 focus:bg-gray-100">
          <div class="table-cell p-2">{who || 'N/A'}</div>
          <div class="table-cell p-2">${amt.toFixed(2)}</div>
          <div class="table-cell p-2">${(amt * total / (subtotal || 1)).toFixed(2)}</div>
        </div>
      {:else}
        <div class="table-row bg-red-300">
          <div class="table-cell p-2">No Items Found!</div>
          <div class="table-cell p-2" />
          <div class="table-cell p-2" />
        </div>
      {/each}
    </div>
  </div>
</div>
