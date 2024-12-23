module.exports = class AppError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }

  static dependencies = "Dependency not provided";
  static userParamsNotProvided = "User params not provided";
  static userAlreadyExists = "User already exists";
};
