const userRegistrationUseCase = require("./user-registration.usecase");
const AppError = require("../shared/errors/AppError");

describe("User Registration Use Case", () => {
  const usersRepository = {
    create: jest.fn(),
  };

  test("should register a new user", async () => {
    const userDto = {
      full_name: "Full Name",
      email: "email@emal.com",
      cpf: "12345678909",
      phone: "1199887755",
      address: "User Street, 123",
    };

    const sut = userRegistrationUseCase({ usersRepository });
    const output = await sut(userDto);

    expect(output).toBeUndefined();
    expect(usersRepository.create).toHaveBeenCalledWith(userDto);
    expect(usersRepository.create).toHaveBeenCalledTimes(1);
  });

  test("should throw if any dependency throws", async () => {
    expect(() => userRegistrationUseCase({})).toThrow(AppError.dependencies);
  });

  test("should throw if any user parameter is not provided", async () => {
    const sut = userRegistrationUseCase({ usersRepository });

    await expect(() => sut({})).rejects.toThrow(AppError.userParamsNotProvided);
  });
});
