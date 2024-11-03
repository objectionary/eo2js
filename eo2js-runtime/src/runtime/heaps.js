const ErFailure = require('./error/ErFailure');

/**
 * Memory itself.
 * @type {{}}
 */
const BLOCKS = {}

/**
 * Blocks identifier
 * @type {number}
 */
let identifier = 0

/**
 * Dynamic memory.
 * @type {{
 *  malloc: function(Number): number,
 *  read: function(Number, Number, Number): Array.<Number>,
 *  free: function(Number),
 *  write: function(Number, Number, Array.<Number>)
 * }}
 */
const heaps = {
  /**
   * Allocate block in memory of given size.
   * @param {Number} size - Size of the block to allocate
   * @return {Number} - Identifier of allocated block
   */
  malloc: function(size) {
    const id = ++identifier
    if (BLOCKS.hasOwnProperty(id)) {
      throw new ErFailure(
        `Can't allocate block in memory with identifier ${id} because it's already allocated`
      )
    }
    BLOCKS[id] = Array(size).fill(0)
    return id
  },
  /**
   * Write given data to the block in memory by given identifier.
   * @param {Number} id - Identifier
   * @param {Number} offset - Offset
   * @param {Array.<Number>} data - Data tto write
   */
  write: function(id, offset, data) {
    if (!BLOCKS.hasOwnProperty(id)) {
      throw new ErFailure(
        `Can't read a block in memory with identifier ${id} because it's not allocated`,
      )
    }
    const current = BLOCKS[id]
    const length = current.length;
    if (length < offset + data.length) {
      throw new ErFailure(
        `Can't write ${data.length} bytes with offset ${offset} to the block with identifier ${id}, because only ${length} were allocated`,
      );
    }
    const result = Array(length).fill(0)
    if (offset > 0) {
      result.splice(0, offset, ...current.slice(0, offset))
    }
    result.splice(offset, data.length, ...data)
    if (length > offset + data.length) {
      result.splice(
        offset + data.length,
        length - offset - data.length,
        ...current.slice(offset + data.length)
      )
    }
    BLOCKS[id] = result
  },
  /**
   * Get data from the block in memory by identifier.
   * @param {Number} id - Identifier
   * @param {Number} offset - Offset
   * @param {Number} length - Length
   * @return {Array.<Number>} - Data from the block in memory
   */
  read: function(id, offset, length) {
    if (!BLOCKS.hasOwnProperty(id)) {
      throw new ErFailure(
        `Block in memory by identifier ${id} is not allocated, can't read`,
      );
    }
    const bytes = BLOCKS[id]
    if (offset + length > bytes.length) {
      throw new ErFailure(
        `Can't read ${length} bytes from offset ${offset}, because only ${bytes.length} are allocated`,
      );
    }
    return bytes.slice(offset, offset + length)
  },
  /**
   * Get size of allocated block in memory.
   * @param {Number} id - Identifier
   * @return {Number} - Size of the block
   */
  size: function(id) {
    if (!BLOCKS.hasOwnProperty(id)) {
      throw new ErFailure(
        `Block in memory by identifier '${id}' is not allocated, can't get size`
      )
    }
    return BLOCKS[id].length
  },
  /**
   * Change size of block in memory.
   * @param {Number} id - Identifier
   * @param {Number} size - New size
   */
  resize: function(id, size) {
    if (size < 0) {
      throw new ErFailure(
        `Can't change size of block in memory by identifier '${id}' to negative: ${size}`
      )
    }
    if (!BLOCKS.hasOwnProperty(id)) {
      throw new ErFailure(
        `Block in memory by identifier '${id}' is not allocated, can't resize`
      )
    }
    const bytes = BLOCKS[id]
    let res
    if (size > bytes.length) {
      res = [...bytes, ...Array(size - bytes.length).fill(0)]
    } else {
      res = bytes.slice(0, size)
    }
    BLOCKS[id] = res
  },
  /**
   * Free the block in memory by identifier.
   * @param {Number} id - Identifier of pointer
   */
  free: function(id) {
    if (!BLOCKS.hasOwnProperty(id)) {
      throw new ErFailure(
        `Can't free a block in memory with identifier ${id} because it's not allocated`,
      );
    }
    delete BLOCKS[id]
  }
}

module.exports = heaps
