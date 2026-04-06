// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const data = require('../../../../../runtime/data')
const makeReturn = require('./return')

/**
 * GetSystemTime kernel32 function call.
 * Retrieves the current system date and time.
 * @param {Object} win - Win32 object
 * @return {Object} - Result object with system time
 */
const GetSystemTime = function(win) {
  const now = new Date()
  const systemTime = win.take('system-time').copy().with({
    year: data.toObject(now.getUTCFullYear()),
    month: data.toObject(now.getUTCMonth() + 1),
    day: data.toObject(now.getUTCDate()),
    'day-of-week': data.toObject(now.getUTCDay()),
    hour: data.toObject(now.getUTCHours()),
    minute: data.toObject(now.getUTCMinutes()),
    second: data.toObject(now.getUTCSeconds()),
    milliseconds: data.toObject(now.getUTCMilliseconds()),
  })
  return makeReturn(win, true, systemTime)
}

module.exports = GetSystemTime
