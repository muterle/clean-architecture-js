const { AppError, Either } = require("../shared/errors");

module.exports = function findBookByTitleOrISBNUseCase({ booksRepository }) {
  if (!booksRepository) throw new AppError(AppError.dependencies);

  return async function findBookByTitleOrISBNUseCase({ filter }) {
    if (!filter) throw new AppError(AppError.bookParamsNotProvided);

    const book = await booksRepository.findByTitleOrISBN(filter);

    return Either.Right(book);
  };
};
