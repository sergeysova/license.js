const { resolve } = require('path')
const fs = require('fs')
const pify = require('pify')
const indexFile = require('../licenses/index.json')


const pathToLicense = (name) => resolve(__dirname, '..', 'licenses', `${name}.txt`)
const readFile = pify(fs.readFile)


function getLicenseSync(name) {
  if (!indexFile[name]) {
    throw new Error('License not found')
  }

  const license = {
    text: fs.readFileSync(pathToLicense(name)).toString(),
    header: indexFile[name].header
      ? fs.readFileSync(pathToLicense(`${name}-header`)).toString()
      : null,
    warranty: indexFile[name].warranty
      ? fs.readFileSync(pathToLicense(`${name}-warranty`)).toString()
      : null,
  }

  return license
}

function getLicense(name) {
  if (!indexFile[name]) {
    return Promise.reject(new Error('License not found'))
  }

  return Promise.all([
    readFile(pathToLicense(name)),
    indexFile[name].header
      ? readFile(pathToLicense(`${name}-header`))
      : null,
    indexFile[name].warranty
      ? readFile(pathToLicense(`${name}-warranty`))
      : null,
  ])
    .then(([text, header, warranty]) => ({
      text: text ? text.toString() : null,
      header: header ? header.toString() : null,
      warranty: warranty ? warranty.toString() : null,
    }))
}

function replaceMarkers(text, markers) {
  if (!text) return null
  let result = text

  Object.keys(markers)
    .forEach((marker) => {
      result = result.replace(`{{ ${marker} }}`, markers[marker])
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
    .then((license) => ({
      text: replaceMarkers(license.text, options),
      header: replaceMarkers(license.header, options),
      warranty: replaceMarkers(license.warranty, options),
    }))
}

function availableLicenses() {
  return Object.keys(indexFile).map((key) => indexFile[key].name)
}

module.exports = {
  getLicense,
  getLicenseSync,
  makeLicense,
  makeLicenseSync,
  availableLicenses,
}
