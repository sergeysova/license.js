const fs = require('fs')
const chalk = require('chalk')
const path = require('path')

/* eslint-disable no-console */

const list = fs.readdirSync('./licenses')
  .filter(f => !f.includes('.json'))
  .map(e => e.replace('.txt', ''))

const licenses = list.filter(e => !e.includes('header') && !e.includes('warranty'))
const headers = list
  .filter(e => e.includes('header') && !e.includes('warranty'))
  .map(e => e.replace('-header', ''))
const warranty = list
  .filter(e => e.includes('warranty'))
  .map(e => e.replace('-warranty', ''))

// console.log({ list, licenses, headers, warranty })

const json = {}

licenses.forEach((license) => {
  json[license] = {
    name: license,
    header: headers.includes(license),
    warranty: warranty.includes(license),
  }
})

console.log(chalk.yellow('Found licenses:'))
console.log(Object.values(json)
  .map(license => `- ${chalk.green(license.name)
  }${chalk.cyan(license.header ? (' header') : '')
  }${chalk.cyan(license.warranty ? (' warranty') : '')}`)
  .join('\r\n'))

const indexFile = path.resolve(__dirname, '..', 'licenses', 'index.json')

fs.writeFileSync(
  indexFile,
  JSON.stringify(json, 2, 2),
  'utf8'
)

console.log(chalk.bold.white(`Saved list to ${indexFile}!`))
