// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const {RHO} = require('../../../../../runtime/attribute/specials')
const {STRING, NUMBER} = require('../../../../../runtime/types')
const dataized = require('../../../../../runtime/dataized')
const ErFailure = require('../../../../../runtime/error/ErFailure')
const data = require('../../../../../runtime/data')

const GetCurrentProcessId = require('./GetCurrentProcessId')
const ReadFile = require('./ReadFile')
const WriteFile = require('./WriteFile')
const GetEnvironmentVariable = require('./GetEnvironmentVariable')
const GetSystemTime = require('./GetSystemTime')
const socket = require('./socket')
const connect = require('./connect')
const accept = require('./accept')
const bind = require('./bind')
const listen = require('./listen')
const send = require('./send')
const recv = require('./recv')
const closesocket = require('./closesocket')
const inet_addr = require('./inet_addr')
const WSAStartup = require('./WSAStartup')
const WSACleanup = require('./WSACleanup')
const WSAGetLastError = require('./WSAGetLastError')

/**
 * Convert tuple-like args to array of objects.
 * @param {Object} args - Tuple-like arguments object
 * @return {Object[]} - Array of argument objects
 */
const tupleToArray = function(args) {
  const retriever = args.take('at')
  const length = dataized(args.take('length'), NUMBER)
  const params = []
  for (let idx = 0; idx < length; idx += 1) {
    params.push(
      retriever.with({0: data.toObject(idx)})
    )
  }
  return params
}

/**
 * Dispatch Win32 system calls.
 * @param {Object} self - win32$φ object
 * @return {*} - function result
 */
const dispatch = function(self) {
  const rho = self.take(RHO)
  const functionName = dataized(rho.take('name'), STRING)
  const args = rho.take('args')
  const params = tupleToArray(args)

  const functions = {
    GetCurrentProcessId,
    ReadFile,
    WriteFile,
    GetEnvironmentVariable,
    GetSystemTime,
    socket,
    connect,
    accept,
    bind,
    listen,
    send,
    recv,
    closesocket,
    inet_addr,
    WSAStartup,
    WSACleanup,
    WSAGetLastError,
  }

  if (!Object.hasOwn(functions, functionName)) {
    throw new ErFailure(
      `Can't make win32 function call '${functionName}' because it's either not supported yet or does not exist`
    )
  }

  const func = functions[functionName]
  return func(rho, params)
}

module.exports = dispatch
