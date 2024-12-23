const AppError = require("../shared/errors/AppError");

module.exports = function UserRegistrationUseCase({ usersRepository }) {
  if (!usersRepository) {
    throw new AppError(AppError.dependencies);
  }

  return async function ({ full_name, cpf, phone, address, email }) {
    await usersRepository.create({ full_name, cpf, phone, address, email });
  };
};
