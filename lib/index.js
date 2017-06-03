const { resolve } = require('path')
const fs = require('fs')
const pify = require('pify')
const indexFile = require('../licenses/index.json')

const licenseFile = name => resolve(__dirname, '..', 'licenses', name + '.txt')
const readFile = pify(fs.readFile)

function getLicenseSync(name) {
  if (!indexFile[name]) {
    throw new Error('License not found')
  }

  const license = {
    text: fs.readFileSync(licenseFile(name)).toString(),
    header: indexFile[name].header
      ? fs.readFileSync(licenseFile(name + '-header')).toString()
      : null,
    warranty: indexFile[name].header
      ? fs.readFileSync(licenseFile(name + '-warranty')).toString()
      : null,
  }

  return license
}

function getLicense(name) {
  if (!indexFile[name]) {
    return Promise.reject(new Error('License not found'))
  }

  return Promise.all([
    readFile(licenseFile(name)),
    indexFile[name].header
      ? readFile(licenseFile(name + '-header'))
      : null,
    indexFile[name].header
      ? readFile(licenseFile(name + '-warranty'))
      : null
  ])
  .then(([ text, header, warranty ]) => {
    return {
      text: text ? text.toString() : null,
      header: header ? header.toString() : null,
      warranty: warranty ? warranty.toString() : null,
    }
  })
}

function replaceMarkers(text, markers) {
  if (!text) return null
  let result = text
  Object.keys(markers)
    .forEach(marker => {
      result = result.replace('{{ ' + marker + ' }}', markers[marker])
    })
  return result
}

function makeLicenseSync(name, options) {
  const license = getLicenseSync(name)
  return {
    text: replaceMarkers(license.text, options),
    header: replaceMarkers(license.header, options),
    warranty: replaceMarkers(license.warranty, options),
  }
}

function makeLicense(name, options) {
  return getLicense(name)
    .then(license => {
      return {
        text: replaceMarkers(license.text, options),
        header: replaceMarkers(license.header, options),
        warranty: replaceMarkers(license.warranty, options),
      }
    })
}

module.exports = {
  getLicense,
  getLicenseSync,
  makeLicense,
  makeLicenseSync,
}
