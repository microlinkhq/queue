'use strict'

const Queue = require('bull')

const { REDIS_URL } = process.env

if (!REDIS_URL) {
  throw new TypeError("You need to provide redis connection as 'REDIS_URL'.")
}

module.exports = new Queue('microlink', REDIS_URL)
