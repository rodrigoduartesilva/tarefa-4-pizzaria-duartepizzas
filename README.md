# Atividade 4 - API Pizzaria

Código do projeto da API Pizzaria.

Esta atividade tem como principal objetivo consolidar os conhecimentos em API e MongoDB.

## Instalação

1. baixe ou clone o código;
2. abra o terminal (Git Bash, terminal do VS Code ou terminal de sua distribuição Linux, por exemplo);
3. execute: npm i (para realizar a instalação dos pacotes);
4. rode usando: npm run dev (dependencia de dev - devDependecies).

## Endpoints

Abaixo uma lista de todos os endpoints da aplicação:

### Auth

Rota de autenticação do usuário logado.

#### /auth

| Código | Resposta                                                         |
| ------ | ---------------------------------------------------------------- |
| 200    | Retorna usuário + token autenticado                              |
| 400    | Retorna uma mensagem informando que o usuário não foi encontrado |

Trecho do código do authController:

```javascript
const loginController = async (req, res) => {
  const { email, senha } = req.body;

  const user = await authService.loginService(email);

  if (!user) {
    return res.status(400).send({ message: `Usuário não encontrado.` });
  }

  const isPasswordValid = await bcrypt.compare(senha, user.senha);

  if (!isPasswordValid) {
    return res.status(400).send({ message: "Senha inválida" });
  }

  const token = authService.generateToken(user.id);

  res.status(200).send({
    email,
    token,
  });
};
```

### Usuario

Rota de localização de um usuário através de um Id.

#### /findById

| Código | Resposta                                                         |
| ------ | ---------------------------------------------------------------- |
| 200    | Retorna um usuário válido                                        |
| 400    | Retorna uma mensagem informando o erro                           |
| 404    | Retorna uma mensagem informando que o usuário não foi encontrado |
| 500    | Erro interno                                                     |

Trecho do código do findUserByIdController:

```javascript
const findUserByIdController = async (req, res) => {
  try {
    const user = await userService.findUserByIdService(req.params.id);

    if (!user) {
      return res
        .status(404)
        .send({ message: "Usuário não localizado em nossa base de dados." });
    }

    return res.status(200).send(user);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res
        .status(400)
        .send({ message: `O id informado está incorreto, tente novamente.` });
    }

    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

### Pizza

### Categoria

### Carrinho

### Pedido

### Bebida
