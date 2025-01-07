const userRegistrationUseCase = require("./user-registration.usecase");
const AppError = require("../shared/errors/AppError");
const { Either } = require("../shared/errors");

describe("User Registration Use Case", () => {
  const usersRepository = {
    create: jest.fn(),
    findByCpf: jest.fn(),
    findByEmail: jest.fn(),
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

    expect(output.right).toBeNull();
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

  test("should throw if user already exists by cpf", async () => {
    usersRepository.findByCpf.mockResolvedValueOnce(true);
    const userDto = {
      full_name: "Full Name",
      email: "email@email.com",
      cpf: "12345678909",
      phone: "1199887755",
      address: "User Street, 123",
    };

    const sut = userRegistrationUseCase({ usersRepository });
    const output = await sut(userDto);
    expect(output.right).toBeNull();
    expect(output.left).toEqual(Either.valueAlreadyRegistered("CPF"));
    expect(usersRepository.findByCpf).toHaveBeenLastCalledWith(userDto.cpf);
    expect(usersRepository.findByCpf).toHaveBeenCalledTimes(1);
  });

  test("should throw if user already exists by cpf", async () => {
    usersRepository.findByCpf.mockResolvedValueOnce(false);
    usersRepository.findByEmail.mockResolvedValueOnce(true);
    const userDto = {
      full_name: "Full Name",
      email: "email@email.com",
      cpf: "12345678909",
      phone: "1199887755",
      address: "User Street, 123",
    };

    const sut = userRegistrationUseCase({ usersRepository });
    const output = await sut(userDto);
    expect(output.right).toBeNull();
    expect(output.left).toEqual(Either.valueAlreadyRegistered("EMAIL"));
    expect(usersRepository.findByEmail).toHaveBeenLastCalledWith(userDto.email);
    expect(usersRepository.findByEmail).toHaveBeenCalledTimes(1);
  });
});
