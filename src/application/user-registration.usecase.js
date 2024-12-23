module.exports = function UserRegistrationUseCase({ usersRepository }) {
  if (!usersRepository) {
    throw new Error("usersRepository is required");
  }

  return async function ({ full_name, cpf, phone, address, email }) {
    await usersRepository.create({ full_name, cpf, phone, address, email });
  };
};
