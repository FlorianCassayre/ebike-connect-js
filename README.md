# ebike-connect-js

![](https://github.com/FlorianCassayre/ebike-connect-js/actions/workflows/ci.yml/badge.svg)
![](https://img.shields.io/npm/v/ebike-connect-js?color=brightgreen)
![](https://img.shields.io/npm/l/ebike-connect-js?color=brightgreen)

<p align="center">
<img src="logo.svg">
</p>

An unofficial API for the [Bosch eBike Connect](https://www.ebike-connect.com/) web service, written for Node.js. :bike:

## Installation

```
npm install ebike-connect-js
```

## Usage

This library is designed for Node.js only and will not work on browsers.

You will need your username and password for the eBike Connect service.
We recommend storing them in environment variables, e.g. `.env`:
```
EBIKE_CONNECT_USERNAME=xxxxx
EBIKE_CONNECT_PASSWORD=xxxxx
```

Then create a file `myfile.js`:
```javascript
import { postAuth, getMyEBikes } from 'ebike-connect-js';

const credentials = {
  username: process.env.EBIKE_CONNECT_USERNAME,
  password: process.env.EBIKE_CONNECT_PASSWORD,
};

postAuth(credentials)
  .then(auth => getMyEBikes(auth)())
  .then(json => console.log(json));
```

You may then load these environment variables using e.g. the package [dotenv](https://www.npmjs.com/package/dotenv) by running `node -r dotenv/config myfile.js` (or `ts-node -r dotenv/config myfile.ts`).

## Bug report

The methods and type declarations provided by this library are purely speculative, as the API may change at any time.

Please file a ticket if you encounter problems.
