# Readme

**license.js** get license template with header by SPDX id

## Install

```bash
npm install --save license.js
```

## Usage


```js
var license = require('license.js');

// Params required: project, year, description, organization

var mit = license('MIT', {
  year: 2016,
  project: 'License.js',
  description: 'SPDX licenses template',
  organization: 'Sergey Sova <i.am@lestad.net>'
});

console.log(mit);
```

Result:

```js
{ text: 'Copyright (c) 2016 Sergey Sova <i.am@lestad.net>\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,\nEXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\nMERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.\nIN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\nDAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\nOTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE\nOR OTHER DEALINGS IN THE SOFTWARE.\n',
  params:
   { year: 2016,
     project: 'License.js',
     description: 'SPDX licenses template',
     organization: 'Sergey Sova <i.am@lestad.net>' },
  id: 'MIT',
  header: null }
```

If license has header file, it return in header property.
If no license found `null` returns.


## LICENSES

```js
var license = require('license.js');

console.log(license.available());

```


* AGPL-3.0
* Apache-2.0
* BSD-2-Clause
* BSD-3-Clause
* CC-BY-3.0
* CC-BY-NC-3.0
* CC-BY-NC-ND-3.0
* CC-BY-NC-SA-3.0
* CC-BY-ND-3.0
* CC-BY-SA-3.0
* CC0-1.0
* CDDL-1.0
* EPL-1.0
* GPL-2.0
* GPL-3.0
* ISC
* LGPL-3.0
* MIT
* MPL-2.0
* Unlicense
* WTFPL
* X11
* Zlib

## Add license

If you want to add license from [SPDX list](http://spdx.org/licenses/), just make a [Pull Request](https://github.com/LestaD/license.js)

# LICENSE

Copyright (C) 2016  Sergey Sova <i.am@lestad.net>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

> License txt files copied from https://github.com/licenses/license-templates
