module.exports = function UserRegistrationUseCase({ usersRepository }) {
  return async function ({ full_name, cpf, phone, address, email }) {
    await usersRepository.create({ full_name, cpf, phone, address, email });
  };
};
