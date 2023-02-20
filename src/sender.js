'use strict'

const debug = require('debug-logfmt')('queue:sender')
const { createServer } = require('http')
const toQuery = require('to-query')()
const send = require('send-http')

const { PORT } = require('./constants')
const queue = require('./queue')

const isStatic = req => req.url.startsWith('/favicon.ico') || req.url.startsWith('/robots.txt')

const server = createServer(async (req, res) => {
  if (isStatic(req)) return send(res, 204)
  const query = toQuery(req.url)
  if (!query.url) return send(res, 200)
  const { priority, delay } = query
  const { id } = await queue.add(query, { priority, delay })
  return send(res, 201, { id })
})

server.listen(PORT, () => {
  debug(`Listening at http://localhost:${PORT}`)
})
