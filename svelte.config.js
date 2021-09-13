/** @type {import('@sveltejs/kit').Config} */
import { windi } from 'svelte-windicss-preprocess'
import adapter from '@sveltejs/adapter-static'

const config = {
  preprocess: [
    windi({})
  ],
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null
    }),
    // paths: { // uncomment when deploying to GitHub
    //   base: '/bill-split'
    // },
    appDir: 'internal'
  }
}

export default config
