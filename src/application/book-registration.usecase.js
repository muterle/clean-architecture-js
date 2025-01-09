const { AppError, Either } = require("../shared/errors");

module.exports = function bookRegistrationUseCase({ booksRepository }) {
  if (!booksRepository) throw new AppError(AppError.dependencies);

  return async function registerBook({ title, quantity, author, genre, isbn }) {
    const checkData = title && quantity && author && genre && isbn;
    if (!checkData) throw new AppError(AppError.bookParamsNotProvided);

    const checkBookExistsByISBN = await booksRepository.findByISBN(isbn);
    if (checkBookExistsByISBN) return Either.Left(Either.valueAlreadyRegistered("ISBN"));

    await booksRepository.create({ title, quantity, author, genre, isbn });
    return Either.Right(null);
  };
};
