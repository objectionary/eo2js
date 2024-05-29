const ErFailure = require('./error/ErFailure');

/**
 * Encaged objects.
 * @type {{}}
 */
const OBJECTS = {}

/**
 * Locators generator.
 * @type {number}
 */
let locator = 0

/**
 * Cages for objects
 * @type {{
 *  init: function(Object): number,
 *  encage: function(Number, Object),
 *  get: function(Number): Object
 * }}
 */
const cages = {
  /**
   * Encage object for the first time.
   * New locator will be generated.
   * @param {Number} object
   * @return {number}
   */
  init: function(object) {
    const loc = ++locator
    if (!OBJECTS.hasOwnProperty(loc)) {
      OBJECTS[loc] = object
    }
    return loc
  },
  /**
   * Encage object to the storage by locator.
   * @param {Number} loc - Locator
   * @param {Object} object - Object
   */
  encage: function(loc, object) {
    if (!OBJECTS.hasOwnProperty(loc)) {
      throw new ErFailure(
        `Encaged object with locator ${loc} was not initialized, can't reencage, can't encage`
      )
    }
    const current = OBJECTS[loc].forma()
    const forma = object.forma()
    if (current !== forma) {
      throw new ErFailure(
        `Can't encage an object formed by ${forma} because object formed by ${current} was encaged before`
      )
    }
    OBJECTS[loc] = object
  },
  /**
   * Retrieve object from storage by locator
   * @param {Number} loc - Locator
   * @return {Object}
   */
  get: function(loc) {
    if (!OBJECTS.hasOwnProperty(loc)) {
      throw new ErFailure(
        `Object with locator ${loc} is absent in cage, can't get`
      )
    }
    return OBJECTS[loc]
  }
}

module.exports = cages
