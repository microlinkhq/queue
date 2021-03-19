'use strict'

const { REDIS_URL } = process.env

if (!REDIS_URL) {
  throw new TypeError("You need to provide redis connection as 'REDIS_URL'.")
}

const PORT = process.env.PORT || process.env.port || 3000

const CONCURRENCY = process.env.CONCURRENCY || 1

module.exports = {
  CONCURRENCY,
  REDIS_URL,
  PORT
}
