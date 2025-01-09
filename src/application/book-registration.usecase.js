const { AppError, Either } = require("../shared/errors");

module.exports = function bookRegistrationUseCase({ booksRepository }) {
  if (!booksRepository) throw new AppError(AppError.dependencies);

  return async function registerBook({ title, quantity, author, genre, isbn }) {
    const newBook = await booksRepository.create({ title, quantity, author, genre, isbn });
    return Either.Right(null);
  };
};
