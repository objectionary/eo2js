// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const {RHO} = require('../../../../../runtime/attribute/specials');
const {STRING, NUMBER} = require('../../../../../runtime/types');
const dataized = require('../../../../../runtime/dataized');
const ErFailure = require('../../../../../runtime/error/ErFailure');
const data = require('../../../../../runtime/data');

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
 * Dispatch Win32 system calls.
 * @param {Object} self - win32$φ object
 * @return {*} - function result
 */
const dispatch = function(self) {
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
  };

  if (!Object.hasOwn(functions, functionName)) {
    throw new ErFailure(
      `Can't make win32 function call '${functionName}' because it's either not supported yet or does not exist`
    );
  }

  const func = functions[functionName];
  if (functionName === 'GetCurrentProcessId') {
    return func(rho);
  } else if (functionName === 'GetSystemTime') {
    return func(rho, args);
  }
  return func(rho, args, getArg, length);
};

module.exports = dispatch
