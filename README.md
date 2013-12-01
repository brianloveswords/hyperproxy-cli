# hyperproxy-cli

A simple CLI for <code>[hyperproxy](https://github.com/brianloveswords/hyperproxy)</code>

## Usage

```bash
$ hyperproxy [--watch] -p [http port] -s [https port] <config-file>
```

`http port` and `https port` default to 80 and 443 respectively. A secure server will only be created if there are any HTTPS servers defined in the configuration, otherwise only a regular HTTP server will be created.

[See the hyperproxy documentation](https://github.com/brianloveswords/hyperproxy/blob/master/README.md) for more details about what should go into the config file, but it should look something like

```json
{"servers": [
  [ "tau.example.org", ":1618" ],
  [ "pi.example.org", ":3141"  ],
  { "pattern": "euler.example.org",
    "endpoint": ":2718",
    "https": {
      "key": "/path/to/euler-key.pem",
      "cert": "/path/to/euler-cert.pem"
    }
  }
]}
```

## License
MIT

```
Copyright (c) 2013 Brian J. Brennan

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```