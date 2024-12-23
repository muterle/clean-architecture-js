module.exports = function UserRegistrationUseCase() {
  return async function ({ full_name, cpf, phone, address, email }) {
    await usersRepository.create({ full_name, cpf, phone, address, email });
  };
};
