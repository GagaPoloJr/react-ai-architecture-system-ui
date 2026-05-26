const required = '20'
const current = process.version.slice(1)
const major = current.split('.')[0]

if (major !== required) {
  console.error(`\n  ❌ Node.js v${required}+ required (currently v${current})
     Yuk install Node 20 dulu:\n`)
  console.error('     pakai nvm:       nvm install 20 && nvm use 20')
  console.error('     pakai fnm:       fnm install 20 && fnm use 20')
  console.error('     pakai volta:     volta install node@20')
  console.error('     download manual: https://nodejs.org/en/download/\n')
  process.exit(1)
}

console.log(`  ✓ Node.js v${current} — OK`)
