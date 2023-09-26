# App

Find a Friend app.

## RFs (Requisitos funcionais)

- [X] Deve ser possível se cadastrar como uma organização;
- [X] Deve ser possível se autenticar como uma organização;
- [X] Deve ser possível cadastrar um pet;
- [X] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade;
- [X] Deve ser possível filtrar os pets por suas características;
- [X] Deve ser possível visualizar detalhes de um pet para adoção;

## RNs (Regras de negócio)

- [X] Uma ORG precisa ter um nome, um telefone, um email, uma senha e um endereco;
- [X] Uma ORG não pode se cadastrar com um email já existente;
- [X] Pet só pode ser cadastrado por uma ORG logada;
- [X] Um pet deve estar ligado a uma ORG;
- [X] Para listar os pets, obrigatoriamente precisamos informar a cidade;
- [X] O Usuário que quer adotar, entrará em contato com a ORG via WhatsApp;
- [X] Todos os filtros, além da cidade, são opcionais;
- [X] Para uma ORG acessar a aplicação como admin, ela precisa estar logada
 
## RNFs (Requisitos não-funcionais)

- [X] A senha da ORG deve ser criptografada;
- [X] Os dados da aplicação devem ser armazenados em um banco de dados PostgreSQL;
- [X] Todas as listas de dados precisam estar paginadas, com 10 itens por página;
- [X] A ORG deve ser identificado por um JWT ( JSON Web Token );
