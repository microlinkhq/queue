'use strict'

const dispatch = require('micro-route/dispatch')
const { parse: parseUrl } = require('url')
const { send } = require('micro')
const queue = require('./queue')

module.exports = dispatch()
  .dispatch('/', ['GET'], async (req, res) => {
    const { query } = parseUrl(req.url, true)
    if (!query.url) return send(res, 200)

    const { priority, delay } = query
    const { id } = await queue.add(query, { priority, delay })
    return send(res, 201, { id })
  })
  .dispatch('/robots.txt', 'GET', (req, res) => send(res, 204, null))
  .dispatch('/favicon.ico', 'GET', (req, res) => send(res, 204, null))
  .otherwise((req, res) => send(res, 405))
