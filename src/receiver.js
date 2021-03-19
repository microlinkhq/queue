'use strict'

const debug = require('debug-logfmt')('queue:receiver')
const mql = require('@microlink/mql')

const queue = require('./queue')
const { CONCURRENCY } = require('./constants')

debug('status=listening')

queue.process(CONCURRENCY, async ({ id, data }) => {
  debug({ state: 'processing', id })

  const { url, ...opts } = data
  const { status } = await mql(url, opts)

  debug({ state: 'processed', id, url, status })

  if (status === 'success') return Promise.resolve()
  return Promise.reject(new Error(status))
})
