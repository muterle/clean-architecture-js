const { AppError, Either } = require("../shared/errors");

module.exports = function findUserByCpfUseCase({ usersRepository }) {
  if (!usersRepository) throw new AppError(AppError.dependencies);

  return async function ({ cpf }) {
    if (!cpf) throw new AppError(AppError.userParamsNotProvided);

    const user = await usersRepository.findByCpf(cpf);

    return Either.Right(user);
  };
};
