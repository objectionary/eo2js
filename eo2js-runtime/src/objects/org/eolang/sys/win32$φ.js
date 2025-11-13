// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../../runtime/object')
const {LAMBDA, RHO} = require('../../../../runtime/attribute/specials');
const {STRING, NUMBER} = require('../../../../runtime/types');
const dataized = require('../../../../runtime/dataized');
const ErFailure = require('../../../../runtime/error/ErFailure');
const data = require('../../../../runtime/data')

// Import all Win32 function implementations
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
 * Win32.φ - dispatcher for Win32 system function calls.
 * Routes Win32 API calls to their appropriate implementations.
 * @return {Object} - Win32.φ object that dispatches function calls
 */
const win32$φ = function() {
  const obj = object('win32$φ')
  obj.assets[LAMBDA] = function(self) {
    const rho = self.take(RHO);
    const functionName = dataized(rho.take('name'), STRING);
    const args = rho.take('args');
    const retriever = args.take('at');
    const length = dataized(args.take('length'), NUMBER);

    /**
     * Get argument by index from args array.
     * @param {number} index - Argument index
     * @return {*} - Argument value
     */
    const getArg = function(index) {
      if (index >= length) {
        throw new ErFailure(
          `Argument index ${index} is out of bounds (length: ${length})`
        );
      }
      return dataized(
        retriever.with({0: data.toObject(index)}),
        STRING
      );
    };

    // Map of supported Win32 functions to their implementations
    const functions = {
      'GetCurrentProcessId': GetCurrentProcessId,
      'ReadFile': ReadFile,
      'WriteFile': WriteFile,
      'GetEnvironmentVariable': GetEnvironmentVariable,
      'GetSystemTime': GetSystemTime,
      'socket': socket,
      'connect': connect,
      'accept': accept,
      'bind': bind,
      'listen': listen,
      'send': send,
      'recv': recv,
      'closesocket': closesocket,
      'inet_addr': inet_addr,
      'WSAStartup': WSAStartup,
      'WSACleanup': WSACleanup,
      'WSAGetLastError': WSAGetLastError,
    };

    // Check if function is supported
    if (!Object.hasOwn(functions, functionName)) {
      throw new ErFailure(
        `Can't make win32 function call '${functionName}' because it's either not supported yet or does not exist`
      );
    }

    // Call the function with appropriate parameters
    const func = functions[functionName];
    if (functionName === 'GetCurrentProcessId') {
      // Simple functions that don't need arguments
      return func(rho);
    } else if (functionName === 'GetSystemTime') {
      // GetSystemTime doesn't need arguments
      return func(rho, args);
    } else {
      // Functions that need argument handling
      return func(rho, args, getArg, length);
    }
  }
  return obj
}

module.exports = win32$φ
