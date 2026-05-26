#!/usr/bin/env node
// Check Node.js version before anything else — zero dependencies, runs in milliseconds.
const required = 20
const current = process.version.slice(1)
const major = Number(current.split('.')[0])

if (major < required) {
  console.error(`
  ╔══════════════════════════════════════════════════╗
  ║  Node.js v${required}+ required — kamu masih v${current}  ║
  ╚══════════════════════════════════════════════════╝

  Install dulu pake salah satu cara ini:

    nvm:   nvm install ${required} && nvm use ${required}
    fnm:   fnm install ${required} && fnm use ${required}
    volta: volta install node@${required}
    brew:  brew install node@${required}
    manual: https://nodejs.org/en/download/

  Udah install tapi mihun? Coba buka terminal baru atau jalanin:
    source ~/.nvm/nvm.sh && nvm use ${required}
`)
  process.exit(1)
}

console.log(`  ✓ Node.js v${current} — OK, lanjut!`)
