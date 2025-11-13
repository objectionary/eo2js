// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const data = require('../../../../../runtime/data')

/**
 * GetSystemTime kernel32 function call.
 * Retrieves the current system date and time.
 * @param {Object} win - Win32 object
 * @param {Object} args - Arguments object
 * @return {Object} - Result object with system time
 */
const GetSystemTime = function(win, args) {
  const now = new Date()
  const result = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    dayOfWeek: now.getDay(),
    day: now.getDate(),
    hour: now.getHours(),
    minute: now.getMinutes(),
    second: now.getSeconds(),
    milliseconds: now.getMilliseconds(),
  }
  return data.toObject(JSON.stringify(result))
}

module.exports = GetSystemTime
