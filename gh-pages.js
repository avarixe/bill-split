import ghpages from 'gh-pages'

ghpages.publish(
  'build', // path to public directory
  {
    branch: 'gh-pages',
    repo: 'https://github.com/avarixe/bill-split.git', // Update to point to your repository
    user: {
      name: 'Joon Lee', // update to use your name
      email: 'l33j00n325@gmail.com' // Update to use your email
    },
    dotfiles: true
  },
  () => {
    console.log('Deploy Complete!')
  }
)
