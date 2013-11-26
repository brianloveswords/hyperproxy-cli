require('colors')
module.exports = prettyPrint

const INDENT_LEVEL = '    '

function prettyPrint(config, indent) {
  indent = indent || ''
  const aligner = makeAligner(maxlength(config))

  const arrow = '-->'

  config.forEach(function (pair) {
    var from = pair[0]
    const to = pair[1]

    if (Array.isArray(to)) {
      console.log('\n'+from.green)
      return prettyPrint(to, INDENT_LEVEL)
    }

    if (from == '*')
      from = '\n*'

    console.log(
      '%s%s %s %s',
      indent,
      aligner(from).magenta,
      arrow.grey,
      to.white)
  })
}

function makeAligner(cols) {
  cols = cols + 2
  return function (str) {
    return leftAlign(str, cols)
  }
}

function leftAlign(str, cols) {
  const pad = cols - str.length
  return str + Array(pad).join(' ')
}


function maxlength(config, indent) {
  return config.reduce(function (max, pair) {
    var from = pair[0]
    const to = pair[1]
    max = Math.max(max, from.length + (indent||'').length)
    if (Array.isArray(to))
       max = Math.max(max, maxlength(to, INDENT_LEVEL))
    return max
  }, 0)
}

// var config =[
//   [ 'tau.example.org', ':1618' ],
//   [ 'pi.example.org', ':3141'  ],
//   [ 'euler.example.org', ':2718' ],
//   [ 'google.example.org', 'google:80' ],
//   [ '*.example.org', '/tmp/any-subdomain.socket' ],
//   [ 'example.org', [
//     ['/static/*', '/tmp/static.socket' ],
//     ['/js/*?', '/tmp/javascript.socket' ],
//     ['/api/*.json', '/tmp/json-api.socket' ],
//     ['/api/*.xml', '/tmp/xml-api.socket' ],
//   ]],
//   [ '*', '/tmp/default.socket' ],
// ]

// prettyPrint(config)
