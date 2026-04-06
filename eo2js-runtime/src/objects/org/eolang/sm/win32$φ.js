// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../../runtime/object')
const {LAMBDA, RHO} = require('../../../../runtime/attribute/specials')
const {STRING, NUMBER} = require('../../../../runtime/types')
const dataized = require('../../../../runtime/dataized')
const data = require('../../../../runtime/data')
const ErFailure = require('../../../../runtime/error/ErFailure')
const GetCurrentProcessId = require('./win32/GetCurrentProcessId')
const ReadFile = require('./win32/ReadFile')
const WriteFile = require('./win32/WriteFile')
const GetEnvironmentVariable = require('./win32/GetEnvironmentVariable')
const GetSystemTime = require('./win32/GetSystemTime')
const socket = require('./win32/socket')
const connect = require('./win32/connect')
const accept = require('./win32/accept')
const bind = require('./win32/bind')
const listen = require('./win32/listen')
const send = require('./win32/send')
const recv = require('./win32/recv')
const closesocket = require('./win32/closesocket')
const inet_addr = require('./win32/inet_addr')
const WSAStartup = require('./win32/WSAStartup')
const WSACleanup = require('./win32/WSACleanup')
const WSAGetLastError = require('./win32/WSAGetLastError')

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

/**
 * Win32.φ dispatcher for Win32 system function calls.
 * @return {Object} - Win32.φ object
 */
const win32$φ = function() {
  const obj = object('win32$φ')
  obj.assets[LAMBDA] = function(self) {
    const result = dispatch(self)
    if (result === undefined) {
      throw new ErFailure('win32$φ dispatch returned undefined')
    }
    return result
  }
  return obj
}

module.exports = win32$φ
