require('colors')
module.exports = prettyPrint

const INDENT = '    '

function prettyPrint(config, sublevel) {
  const aligner = makeAligner(maxlength(config))

  const arrow = '-->'

  config.forEach(function (pair) {
    var from = pair.pattern
    const to = pair.endpoint || pair.routes

    if (Array.isArray(to)) {
      console.log(from.green)
      return prettyPrint(to, true)
    }

    if (from == '*') {
      if (!sublevel)
        from = '\n*'
    }

    console.log(
      '%s%s %s %s',
      sublevel ? INDENT : '',
      aligner(from)[sublevel ? 'yellow' : 'cyan'],
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
    var from = pair.pattern
    const to = pair.endpoint || pair.routes
    max = Math.max(max, from.length + (indent||'').length)
    if (Array.isArray(to))
       max = Math.max(max, maxlength(to, INDENT))
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
//     ['*', '/tmp/xml-api.socket' ],
//    ]],
//   [ '*', '/tmp/default.socket' ],
// ]

// prettyPrint(config)
