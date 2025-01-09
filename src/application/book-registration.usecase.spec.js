const { AppError } = require("../shared/errors");
const bookRegistrationUsecase = require("./book-registration.usecase");

describe("Book Registration Use Case", () => {
  const booksRepository = {
    create: jest.fn(),
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
});
