const { Either } = require("../shared/errors");
const AppError = require("../shared/errors/AppError");

module.exports = function UserRegistrationUseCase({ usersRepository }) {
  if (!usersRepository) throw new AppError(AppError.dependencies);

  return async function ({ full_name, cpf, phone, address, email }) {
    const checkData = full_name && cpf && phone && address && email;
    if (!checkData) throw new AppError(AppError.userParamsNotProvided);

    const checkUserExistsByCpf = await usersRepository.findByCpf(cpf);
    if (checkUserExistsByCpf) return Either.Left(Either.valueAlreadyRegistered("CPF"));

    const checkUserExistsByEmail = await usersRepository.findByEmail(email);
    if (checkUserExistsByEmail) return Either.Left(Either.valueAlreadyRegistered("EMAIL"));

    await usersRepository.create({ full_name, cpf, phone, address, email });

    return Either.Right(null);
  };
};
