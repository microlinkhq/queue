'use strict'

const Queue = require('bull')

const { name } = require('../package.json')

const { REDIS_URL } = require('./constants')

module.exports = new Queue(name, REDIS_URL)
