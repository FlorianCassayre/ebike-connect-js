# ebike-connect-js

An unofficial API for the [Bosch eBike Connect](https://www.ebike-connect.com/) web service, written for Node.js. :bike:

## Installation

```
npm install ebike-connect-js
```

## Usage

This library is designed for Node.js only and will not work on browsers.

Authentication is currently not supported.
Instead, you must log in from the official website and retrieve the following cookie from your browser:
```
...
Cookie: REMEMBER=xxxxx; ...
...
```

We recommend storing these cookies in a environment variable, e.g. `.env`:
```
COOKIE_REMEMBER=xxxxx
```

Then create a file `myfile.js`:
```javascript
import { getMyEBikes } from 'ebike-connect-js';

const auth = {
  cookies: {
    remember: process.env.COOKIE_REMEMBER,
  },
};

getMyEBikes(auth)().then(json => console.log(json));
```

You may then load this environment variable using the package [dotenv](https://www.npmjs.com/package/dotenv) by running `node -r dotenv/config myfile.js`.

## Bug report

The methods and type declarations provided by this library are purely speculative, as the API may change at any time.

Please file a ticket if you encounter problems.
