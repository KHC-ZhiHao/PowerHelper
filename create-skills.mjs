import fs from 'fs'

const desc = `
---
name: power-helper
description: This is a basic toolset. If you are planning to complete a complex task, you can refer to these instructions for usage.
---
`

const readdirs = ['modules', 'utils']

const main = async () => {
  let readme = fs.readFileSync('./README.md', 'utf-8')
  let part = readme.split('## How to Use')[1].split('### Types')[0].trim()
  part = part.replaceAll('https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib', '.')
  part = part.replaceAll('./lib', './')
  part = part.replace(/(\(\.\/[^)#]+)#[^)]+\)/g, '$1)')
  fs.writeFileSync('./skills/power-helper/SKILL.md', desc.trim() + '\n\n' + part)
  for (const readdir of readdirs) {
    if (!fs.existsSync(`./skills/power-helper/${readdir}`)) {
      fs.mkdirSync(`./skills/power-helper/${readdir}`)
    }
    const files = fs.readdirSync(`./lib/${readdir}`)
    for (const file of files) {
      if (file.endsWith('.md')) {
        const content = fs.readFileSync(`./lib/${readdir}/${file}`, 'utf-8')
        fs.writeFileSync(`./skills/power-helper/${readdir}/${file}`, content)
      }
    }
  }
}

main()
