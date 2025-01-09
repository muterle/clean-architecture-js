const { AppError } = require("../shared/errors");
const findBookByTitleOrIsbnUsecase = require("./find-books-by-title-or-isbn.usecase");

describe("Find book by Title or ISBN  UseCase", () => {
  const booksRepository = {
    findByTitleOrISBN: jest.fn(),
  };

  test("Return a book if exists", async () => {
    const filterDto = {
      filter: "Book Title",
    };

    const outputDto = [
      {
        title: "Book Title",
        quantity: 1,
        author: "Book Author",
        genre: "valid",
        isbn: "01234567890",
      },
    ];
    booksRepository.findByTitleOrISBN.mockResolvedValue(outputDto);

    const sut = findBookByTitleOrIsbnUsecase({ booksRepository });
    const output = await sut(filterDto);

    expect(output.right).toEqual(outputDto);
    expect(booksRepository.findByTitleOrISBN).toHaveBeenCalledWith(filterDto.filter);
    expect(booksRepository.findByTitleOrISBN).toHaveBeenCalledTimes(1);
  });

  test("Return null if not exists", async () => {
    const filterDto = {
      filter: "Book Not",
    };

    booksRepository.findByTitleOrISBN.mockResolvedValue([]);

    const sut = findBookByTitleOrIsbnUsecase({ booksRepository });
    const output = await sut(filterDto);

    expect(output.right).toEqual([]);
    expect(booksRepository.findByTitleOrISBN).toHaveBeenCalledWith(filterDto.filter);
    expect(booksRepository.findByTitleOrISBN).toHaveBeenCalledTimes(1);
  });

  test("should throw if any dependency throws", async () => {
    expect(() => findBookByTitleOrIsbnUsecase({})).toThrow(AppError.dependencies);
  });

  test("should throw if any book parameter is not provided", async () => {
    const sut = findBookByTitleOrIsbnUsecase({ booksRepository });
    await expect(() => sut({})).rejects.toThrow(AppError.bookParamsNotProvided);
  });
});
