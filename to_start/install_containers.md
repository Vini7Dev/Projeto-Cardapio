# Para iniciar

### Crie o container para o banco de dados:
- docker run --name menue -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d -t postgres

**Dica:** um bom Software para realizar as próximas ações é o **DBeaver**.

Em seguida, crie um banco de dados chamado **menue** com as seguintes credenciais:
- Usuário: postgres;
- Senha: postgres.

Adicione a extensão **uuid-ossp**;

### Crie um container para o cache:
- docker run --name redis -p 6379:6379 -d -t redis:alpine
