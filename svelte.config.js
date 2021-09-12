/** @type {import('@sveltejs/kit').Config} */
import adapter from '@sveltejs/adapter-static'

const config = {
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    adapter: adapter(),
    paths: { // comment out below to preview build locally
      base: '/bill-split'
    },
    appDir: 'internal'
  }
}

export default config
