
var fs = require('fs');
var path = require('path');

module.exports =
function license(spdxLicense, params) {

  if (typeof spdxLicense !== 'string') throw new Error('Please provide real SPDX license id');
  if (typeof params !== 'object') throw new Error('Params must be object with params: year, project, description, organization');
  if (typeof params.project === 'undefined') throw new Error('Parameter {project} is required!');
  if (typeof params.year === 'undefined') throw new Error('Parameter {year} is required!');
  if (typeof params.description === 'undefined') throw new Error('Parameter {description} is required!');
  if (typeof params.organization === 'undefined') throw new Error('Parameter {organization} is required!');

  var license = null;
  var header = null;

  try {
    license = fs.readFileSync(path.resolve(__dirname, '..', 'licenses', spdxLicense + '.txt'), { encoding: 'utf8' });
  }
  catch (e) {
    // license not found
    return license;
  }

  // if header exists load it's text
  try {
    header = fs.readFileSync(path.resolve(__dirname, '..', 'licenses', spdxLicense + '-header.txt'), { encoding: 'utf8' });
  }
  catch (e) {}

  return {
    text: replace(license, params),
    params: params,
    id: spdxLicense,
    header: header ? replace(header, params) : null,
  }
}


/**
 * Replace keys of object from text with values from object[key]
 */
function replace(text, object) {
  var result = text;

  Object.keys(object).map(function(key) {
    result = result.replace('{{ ' + key + ' }}', object[key]);
  });

  return result;
}
