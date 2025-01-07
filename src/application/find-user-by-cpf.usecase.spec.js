const findUserByCpfUsecase = require("./find-user-by-cpf.usecase");

describe("Find user by CPF UseCase", () => {
  const usersRepository = {
    findByCpf: jest.fn(),
  };

  test("Return a user if exists", async () => {
    const cpfDto = {
      cpf: "12345678909",
    };

    const outputDto = {
      full_name: "Full Name",
      email: "email@emal.com",
      cpf: "12345678909",
      phone: "1199887755",
      address: "User Street, 123",
    };
    usersRepository.findByCpf.mockResolvedValue(outputDto);

    const sut = findUserByCpfUsecase({ usersRepository });
    const output = await sut(cpfDto);

    expect(output.right).toEqual(outputDto);
    expect(usersRepository.findByCpf).toHaveBeenCalledWith(cpfDto.cpf);
    expect(usersRepository.findByCpf).toHaveBeenCalledTimes(1);
  });

  test("Return null if user not exists", async () => {
    usersRepository.findByCpf.mockResolvedValue(null);

    const cpfDto = {
      cpf: "12345678900",
    };

    const sut = findUserByCpfUsecase({ usersRepository });
    const output = await sut(cpfDto);

    expect(output.right).toBeNull();
    expect(usersRepository.findByCpf).toHaveBeenCalledWith(cpfDto.cpf);
    expect(usersRepository.findByCpf).toHaveBeenCalledTimes(1);
  });
});
