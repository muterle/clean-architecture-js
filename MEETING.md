## Reunião

> Somos uma biblioteca pequena e gostaríamos de controlar a nossa entrada e saída de livros. Queremos cadastrar o usuário que irá pegar o livro emprestado, cadastrar os livros da nossa biblioteca e poder emprestar os livros para qualquer usuário, além de buscar os registros de empréstimos.

## Dados

- Usuário: [nome_completo, CPF, telefone, endereço, email]
- Livro: [nome, quantidade, quantidade, autor, gênero, ISBN]
- Empréstimo: [usuario_id, livro_id, data_retorno, data_devolução, data_saída]

## UseCases (Regras de Negócio)

[X] Cadastrar um novo usuário
[X] - CPF ou email devem ser únicos

[] Buscar um cadastro de usuário por CPF
[] - Retornar um usuário ou vazio

[] Cadastrar um novo livro
[] - ISBN deve ser único

[] Buscar um livro por nme ou ISBN
[] - Retornar um livro ou vazio

[] Emprestar um livro ao usuário
[] - A data de retorno deve ser maior que a data de saída
[] - Um usuário não pode estar com mais de um livro com o mesmo ISBN
[] - Um usuário pode estar com mais de um livro com o ISBN diferentes
[] - Ao cadastrar um empréstimo, será enviado um email automaticamente informando o nome do livro, nome do usuário, CPF, a data de saída e a data de retorno

[] Devolução do livro
[] - Caso o usuário tenha atrasado, será gerada uma multa fixa de R$10,00

[] Mostrar todos os empréstimos pendentes, com o nome do livro, nome do usuário, CPF, data de saída e data de retorno mais antiga

## Estrutura

###UsersRepository
[] create:({ full_name, cpf, phone, address, email }) => Promise<void>
[] findByCpf(cpf) => Promise<boolean>
[] findByEmail(email) => Promise<boolean>
