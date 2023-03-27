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

Rota de localização/criação/atualização/remoção dos usuários cadastrados na aplicação.

#### /findAll

| Código | Resposta                              |
| ------ | ------------------------------------- |
| 200    | Retorna todos os usuários cadastrados |
| 500    | Erro interno                          |

Trecho do código do findAllUsersController:

```javascript
const findAllUsersController = async (req, res) => {
  try {
    return res.status(200).send(await userService.findAllUsersService());
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

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

#### /create

| Código | Resposta                             |
| ------ | ------------------------------------ |
| 201    | Retorna um usuário cadastrado válido |
| 500    | Erro interno                         |

Trecho do código do createUserController:

```javascript
const createUserController = async (req, res) => {
  try {
    if (req.body.pizzas_fav === undefined) {
      req.body.pizzas_fav = { default: undefined };
    }

    if (req.body.bebida_fav === undefined) {
      req.body.bebida_fav = { default: undefined };
    }

    return res.status(201).send(await userService.createUserService(req.body));
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /update

| Código | Resposta                             |
| ------ | ------------------------------------ |
| 200    | Retorna um usuário válido atualizado |
| 500    | Erro interno                         |

Trecho do código do updateUserController:

```javascript
const updateUserController = async (req, res) => {
  try {
    return res
      .status(200)
      .send(await userService.updateUserService(req.params.id, req.body));
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /remove

| Código | Resposta                                                         |
| ------ | ---------------------------------------------------------------- |
| 200    | Retorna um usuário válido deletado da aplicação                  |
| 404    | Retorna uma mensagem informando que o usuário não foi encontrado |
| 500    | Erro interno                                                     |

Trecho do código do removeUserController:

```javascript
const removeUserController = async (req, res) => {
  try {
    const deletedUser = await userService.removeUserService(req.params.id);

    if (deletedUser == null) {
      return res
        .status(404)
        .send({ message: `Usuário não localizado em nossa base de dados.` });
    } else {
      return res.status(200).send({ message: `Usuário deletado com sucesso.` });
    }
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /addAddress

| Código | Resposta                                    |
| ------ | ------------------------------------------- |
| 201    | Retorna uma mensagem de endereço adicionado |
| 400    | Retorna uma mensagem informando o erro      |
| 500    | Erro interno                                |

Trecho do código do addUserAddressController:

```javascript
const addUserAddressController = async (req, res) => {
  try {
    const endereco = await userService.addUserAddressService(
      req.params.id,
      req.body
    );

    if (endereco.value == null) {
      return res
        .status(400)
        .send({ message: `Algo deu errado com o endereço, tente novamente.` });
    } else {
      return res
        .status(201)
        .send({ message: `Endereço adicionado com sucesso.` });
    }
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /removeAddress

| Código | Resposta                               |
| ------ | -------------------------------------- |
| 200    | Retorna o endereço removido            |
| 400    | Retorna uma mensagem informando o erro |
| 500    | Erro interno                           |

Trecho do código do removeUserAddressController:

```javascript
const removeUserAddressController = async (req, res) => {
  try {
    const endereco = await userService.removeUserAddressService(
      req.body.id,
      req.body.addressId
    );
    let found = false;

    endereco.value.enderecos.map((valor, chave) => {
      if (valor._id == req.body.addressId) {
        found = true;
      }
    });

    if (found) {
      return res
        .status(200)
        .send({ message: `Endereço removido com sucesso.` });
    } else {
      return res.status(400).send({
        message: `O endereço não consta na base de dados para o Id ${req.body.id} informado, tente novamente.`,
      });
    }
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /addFavPizza

| Código | Resposta                                 |
| ------ | ---------------------------------------- |
| 201    | Retorna uma mensagem de pizza adicionada |
| 400    | Retorna uma mensagem informando o erro   |
| 500    | Erro interno                             |

Trecho do código do addUserFavPizzaController:

```javascript
const addUserFavPizzaController = async (req, res) => {
  try {
    const pizzaFavAdd = await userService.addUserFavPizzaService(
      req.params.id,
      req.body
    );

    if (pizzaFavAdd.value == null) {
      return res.status(400).send({
        message: `Algo deu errado em adicionar uma pizza como favorita, tente novamente.`,
      });
    } else {
      return res
        .status(201)
        .send({ message: `Pizza favorita adicionada com sucesso.` });
    }
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /removeFavPizza

| Código | Resposta                               |
| ------ | -------------------------------------- |
| 201    | Retorna um mensagem de pizza removida  |
| 400    | Retorna uma mensagem informando o erro |
| 500    | Erro interno                           |

Trecho do código do removeUserFavPizzaController:

```javascript
const removeUserFavPizzaController = async (req, res) => {
  try {
    const pizzasFavRm = await userService.removeUserFavPizzaService(
      req.params.id,
      req.body
    );
    let found = false;

    pizzasFavRm.value.pizzas_fav.map((valor, chave) => {
      if (valor._id == req.body._id) {
        found = true;
      }
    });

    if (found) {
      return res
        .status(201)
        .send({ message: `Pizza favorita removida com sucesso.` });
    } else {
      return res.status(400).send({
        message: `O item favorito não consta na base de dados para o Id ${req.params.id} informado, tente novamente.`,
      });
    }
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /addFavBebida

| Código | Resposta                                 |
| ------ | ---------------------------------------- |
| 201    | Retorna um mensagem de bebida adicionada |
| 400    | Retorna uma mensagem informando o erro   |
| 500    | Erro interno                             |

Trecho do código do addUserFavBebidaController:

```javascript
const addUserFavBebidaController = async (req, res) => {
  try {
    const bebidaFavAdd = await userService.addUserFavBebidaService(
      req.params.id,
      req.body
    );

    if (bebidaFavAdd.value == null) {
      return res
        .status(400)
        .send({
          message: `Algo deu errado em adicionar uma bebida como favorita, tente novamente.`,
        });
    } else {
      return res
        .status(201)
        .send({ message: `Bebida favorita adicionada com sucesso.` });
    }
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /removeFavBebida

| Código | Resposta                               |
| ------ | -------------------------------------- |
| 201    | Retorna um mensagem de bebida removida |
| 400    | Retorna uma mensagem informando o erro |
| 500    | Erro interno                           |

Trecho do código do removeUserFavBebidaController:

```javascript
const removeUserFavBebidaController = async (req, res) => {
  try {
    const bebidaFavRm = await userService.removeUserFavBebidaService(
      req.params.id,
      req.body
    );
    let found = false;

    bebidaFavRm.value.bebida_fav.map((valor, chave) => {
      if (valor._id == req.body._id) {
        found = true;
      }
    });

    if (found) {
      return res
        .status(201)
        .send({ message: `Bebida favorita removida com sucesso.` });
    } else {
      return res
        .status(400)
        .send({
          message: `O item favorito não consta na base de dados para o Id ${req.params.id} informado, tente novamente.`,
        });
    }
  } catch (err) {
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
