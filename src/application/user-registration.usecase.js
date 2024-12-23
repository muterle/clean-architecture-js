const AppError = require("../shared/errors/AppError");

module.exports = function UserRegistrationUseCase({ usersRepository }) {
  if (!usersRepository) throw new AppError(AppError.dependencies);

  return async function ({ full_name, cpf, phone, address, email }) {
    const checkData = full_name && cpf && phone && address && email;
    if (!checkData) throw new AppError(AppError.userParamsNotProvided);

    const checkUserExistsByCpf = await usersRepository.findByCpf(cpf);
    if (checkUserExistsByCpf) throw new AppError(AppError.userAlreadyExists);

    await usersRepository.create({ full_name, cpf, phone, address, email });
  };
};
