'use strict'

const queue = require('./queue')
const createLog = require('./log')
const mql = require('@microlink/mql')

module.exports = function (opts) {
  const log = createLog(opts)

  log('status=listening')

  queue.process(async ({ id, data }) => {
    console.log(`status=processing id=${id}`)

    const { url, ...opts } = data
    const { status } = await mql(url, opts)

    log(`status=processed id=${id} status=${status}`)

    if (status === 'success') return Promise.resolve()
    return Promise.reject(new Error(status))
  })
}
