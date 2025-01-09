const { AppError, Either } = require("../shared/errors");
const bookRegistrationUsecase = require("./book-registration.usecase");

describe("Book Registration Use Case", () => {
  const booksRepository = {
    create: jest.fn(),
    findByISBN: jest.fn(),
  };

  test("should register a new book", async () => {
    const bookDto = {
      title: "Book Title",
      quantity: 1,
      author: "Book Author",
      genre: "valid",
      isbn: "01234567890",
    };

    const sut = bookRegistrationUsecase({ booksRepository });
    const output = await sut(bookDto);

    expect(output.right).toBeNull();
    expect(booksRepository.create).toHaveBeenCalledWith(bookDto);
    expect(booksRepository.create).toHaveBeenCalledTimes(1);
  });

  test("should throw if any dependency throws", async () => {
    expect(() => bookRegistrationUsecase({})).toThrow(AppError.dependencies);
  });

  test("should throw if any book parameter is not provided", async () => {
    const sut = bookRegistrationUsecase({ booksRepository });
    await expect(() => sut({})).rejects.toThrow(AppError.bookParamsNotProvided);
  });

  test("should throw if book already exists by isbn", async () => {
    booksRepository.findByISBN.mockResolvedValueOnce(true);
    const bookDto = {
      title: "Book Title",
      quantity: 1,
      author: "Book Author",
      genre: "valid",
      isbn: "01234567890",
    };

    const sut = bookRegistrationUsecase({ booksRepository });
    const output = await sut(bookDto);
    expect(output.right).toBeNull();
    expect(output.left).toEqual(Either.valueAlreadyRegistered("ISBN"));
    expect(booksRepository.findByISBN).toHaveBeenLastCalledWith(bookDto.isbn);
    expect(booksRepository.findByISBN).toHaveBeenCalledTimes(1);
  });
});
