/**
 * @description: WARNING: this class must not be instanced, use the Left or Right methods
 */
module.exports = class Either {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  static Left(left) {
    return new Either(left, null);
  }

  static Right(right) {
    return new Either(null, right);
  }

  static valueAlreadyRegistered(value) {
    return { message: `${value} already registered` };
  }
};
