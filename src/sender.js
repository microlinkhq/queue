'use strict'

const queue = require('./queue')

const { send, Router } = require('micri')
const toQuery = require('to-query')()

const { router, on, otherwise } = Router

const isStatic = req => req.url.startsWith('/favicon.ico') || req.url.startsWith('/robots.txt')

module.exports = router(
  on.get(isStatic, (req, res) => send(res, 204, null)),
  otherwise(async (req, res) => {
    const query = toQuery(req)
    if (!query.url) return send(res, 200)

    const { priority, delay } = query
    const { id } = await queue.add(query, { priority, delay })

    return send(res, 201, { id })
  })
)
