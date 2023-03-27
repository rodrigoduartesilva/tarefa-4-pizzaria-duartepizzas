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
      return res.status(400).send({
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

### Pizza

Rota de localização/criação/atualização/remoção dos tipos de pizzas cadastrados na aplicação.

#### /findAll

| Código | Resposta                                                                    |
| ------ | --------------------------------------------------------------------------- |
| 200    | Retorna todas as pizzas cadastradas                                         |
| 404    | Retorna uma mensagem informando que o item não se encontra na base de dados |
| 500    | Erro interno                                                                |

Trecho do código do findAllPizzasController:

```javascript
const findAllPizzasController = async (req, res) => {
  try {
    if ((await pizzaService.findAllPizzasService()) == "") {
      return res
        .status(404)
        .send("Não há pizzas cadastradas em nossa base de dados.");
    } else {
      return res.status(200).send(await pizzaService.findAllPizzasService());
    }
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /findById

| Código | Resposta                                                                    |
| ------ | --------------------------------------------------------------------------- |
| 200    | Retorna uma pizza cadastrada atraves de um Id informado                     |
| 404    | Retorna uma mensagem informando que o item não se encontra na base de dados |
| 500    | Erro interno                                                                |

Trecho do código do findPizzaByIdController:

```javascript
const findPizzaByIdController = async (req, res) => {
  try {
    const pizza = await pizzaService.findPizzaByIdService(req.params.id);

    if (!pizza) {
      return res.status(404).send({
        message: "Sabor de pizza não localizado em nossa base de dados.",
      });
    }

    return res.status(200).send(pizza);
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /create

| Código | Resposta                                       |
| ------ | ---------------------------------------------- |
| 201    | Retorna um novo tipo/sabor de pizza cadastrada |
| 500    | Erro interno                                   |

Trecho do código do createPizzaController:

```javascript
const createPizzaController = async (req, res) => {
  try {
    if (req.body.categorias === undefined) {
      req.body.categorias = { default: undefined };
    }

    const corpo = {
      ...req.body,
      userId: req.userId,
    };

    return res.status(201).send(await pizzaService.createPizzaService(corpo));
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /update

| Código | Resposta                                                                    |
| ------ | --------------------------------------------------------------------------- |
| 200    | Atualiza um tipo/sabor de pizza cadastrada                                  |
| 404    | Retorna uma mensagem informando que o item não se encontra na base de dados |
| 500    | Erro interno                                                                |

Trecho do código do updatePizzaController:

```javascript
const updatePizzaController = async (req, res) => {
  try {
    const updateId = await pizzaService.updatePizzaService(req.params.id);

    if (updateId == null) {
      return res.status(404).send({
        message: `A pizza com o Id ${req.params.id} não foi localizado em nossa base de dados.`,
      });
    } else {
      return res
        .status(200)
        .send(await pizzaService.updatePizzaService(updateId, req.body));
    }
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /remove

| Código | Resposta                                                                    |
| ------ | --------------------------------------------------------------------------- |
| 200    | Deleta um tipo/sabor de pizza cadastrada                                    |
| 404    | Retorna uma mensagem informando que o item não se encontra na base de dados |
| 500    | Erro interno                                                                |

Trecho do código do deletePizzaController:

```javascript
const deletePizzaController = async (req, res) => {
  try {
    const deletedPizza = await pizzaService.deletePizzaService(req.params.id);

    if (deletedPizza == null) {
      return res.status(404).send({
        message: `Sabor de pizza não localizado em nossa base de dados.`,
      });
    } else {
      return res
        .status(200)
        .send({ message: `Sabor de pizza deletado com sucesso.` });
    }
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /addCategoria

| Código | Resposta                                       |
| ------ | ---------------------------------------------- |
| 200    | Retorna uma pizza com uma categoria cadastrada |
| 500    | Erro interno                                   |

Trecho do código do addCategoriaPizzaController:

```javascript
const addCategoriaPizzaController = async (req, res) => {
  try {
    const categoria = await pizzaService.addCategoriaPizzaService(
      req.params.id,
      req.body
    );
    return res.status(200).send(categoria);
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /removeCategoria

| Código | Resposta                                     |
| ------ | -------------------------------------------- |
| 200    | Retorna uma pizza com uma categoria deletada |
| 500    | Erro interno                                 |

Trecho do código do removeCategoriaPizzaController:

```javascript
const removeCategoriaPizzaController = async (req, res) => {
  try {
    const categoriaRm = await pizzaService.removeCategoriaPizzaService(
      req.params.id,
      req.body
    );

    let found = false;

    categoriaRm.value.categorias.map((valor, chave) => {
      if (valor._id == req.body._id) {
        found = true;
      }
    });

    if (found) {
      return res
        .status(200)
        .send({ message: `Categoria deletada com sucesso.` });
    } else {
      return res.status(404).send({
        message: `Categoria não adicionada ao sabor de pizza informada em nossa base de dados.`,
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

### Categoria

Rota de localização/criação/atualização/remoção das categorias de pizzas e bebidas cadastradas na aplicação.

#### /findAll

| Código | Resposta                                                                    |
| ------ | --------------------------------------------------------------------------- |
| 200    | Retorna todas as categorias cadastradas                                     |
| 404    | Retorna uma mensagem informando que o item não se encontra na base de dados |
| 500    | Erro interno                                                                |

Trecho do código do findAllCategoriaController:

```javascript
const findAllCategoriaController = async (req, res) => {
  try {
    if ((await categoriaService.findAllCategoriaService()) == "") {
      return res
        .status(404)
        .send("Não há categorias ativas em nossa base de dados.");
    } else {
      return res
        .status(200)
        .send(await categoriaService.findAllCategoriaService());
    }
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /findById

| Código | Resposta                                                                    |
| ------ | --------------------------------------------------------------------------- |
| 200    | Retorna uma categoria cadastrada atraves de um Id informado                 |
| 404    | Retorna uma mensagem informando que o item não se encontra na base de dados |
| 500    | Erro interno                                                                |

Trecho do código do findCategoriaByIdController:

```javascript
const findCategoriaByIdController = async (req, res) => {
  try {
    const categoria = await categoriaService.findCategoriaByIdService(
      req.params.id
    );

    if (!categoria) {
      return res.status(404).send({
        message: `A categoria com o Id ${req.params.id} não foi localizado em nossa base de dados.`,
      });
    }

    return res.status(200).send(categoria);
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /create

| Código | Resposta                              |
| ------ | ------------------------------------- |
| 201    | Retorna uma nova categoria cadastrada |
| 500    | Erro interno                          |

Trecho do código do createCategoriaController:

```javascript
const createCategoriaController = async (req, res) => {
  try {
    return res
      .status(201)
      .send(await categoriaService.createCategoriaService(req.body));
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /update

| Código | Resposta                                                                    |
| ------ | --------------------------------------------------------------------------- |
| 200    | Retorna uma nova categoria atualizada                                       |
| 404    | Retorna uma mensagem informando que o item não se encontra na base de dados |
| 500    | Erro interno                                                                |

Trecho do código do updateCategoriaController:

```javascript
const updateCategoriaController = async (req, res) => {
  try {
    const updateId = await categoriaService.updateCategoriaService(
      req.params.id
    );

    if (updateId == null) {
      return res.status(404).send({
        message: `A categoria com o Id ${req.params.id} não foi localizado em nossa base de dados.`,
      });
    } else {
      return res
        .status(200)
        .send(
          await categoriaService.updateCategoriaService(updateId, req.body)
        );
    }
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /remove

| Código | Resposta                                                                    |
| ------ | --------------------------------------------------------------------------- |
| 200    | Retorna uma categoria deletada                                              |
| 404    | Retorna uma mensagem informando que o item não se encontra na base de dados |
| 500    | Erro interno                                                                |

Trecho do código do deleteCategoriaController:

```javascript
const deleteCategoriaController = async (req, res) => {
  try {
    const deletedCategoria = await categoriaService.deleteCategoriaService(
      req.params.id
    );

    if (deletedCategoria == null) {
      return res
        .status(404)
        .send({ message: `Categoria não localizada em nossa base de dados.` });
    } else {
      return res
        .status(200)
        .send({ message: `Categoria deletada com sucesso.` });
    }
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

### Carrinho

Rota de localização/criação/atualização/remoção do carrinho de compras cadastradas na aplicação.

#### /findAll

| Código | Resposta                                                                    |
| ------ | --------------------------------------------------------------------------- |
| 200    | Retorna todos os carrinhos cadastrados                                      |
| 404    | Retorna uma mensagem informando que o item não se encontra na base de dados |
| 500    | Erro interno                                                                |

Trecho do código do findAllCarrinhosController:

```javascript
const findAllCarrinhosController = async (req, res) => {
  try {
    if ((await CarrinhoService.findAllCarrinhosService()) == "") {
      return res
        .status(404)
        .send("Não há carrinhos ativos em nossa base de dados.");
    } else {
      return res
        .status(200)
        .send(await CarrinhoService.findAllCarrinhosService());
    }
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /findById

| Código | Resposta                                                                    |
| ------ | --------------------------------------------------------------------------- |
| 200    | Retorna um carrinho cadastrado atraves de um Id informado                   |
| 404    | Retorna uma mensagem informando que o item não se encontra na base de dados |
| 500    | Erro interno                                                                |

Trecho do código do findCarrinhoByIdController:

```javascript
const findCarrinhoByIdController = async (req, res) => {
  try {
    const carrinho = await CarrinhoService.findCarrinhoByIdService(
      req.params.id
    );

    if (!carrinho) {
      return res.status(404).send({
        message: `O carrinho com o Id ${req.params.id} não foi localizado em nossa base de dados.`,
      });
    }

    return res.status(200).send(carrinho);
  } catch (err) {
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
| 201    | Retorna uma novo carrinho cadastrado |
| 500    | Erro interno                         |

Trecho do código do createCarrinhoController:

```javascript
const createCarrinhoController = async (req, res) => {
  try {
    const corpo = {
      ...req.body,
      userId: req.userId,
    };
    return res
      .status(201)
      .send(await CarrinhoService.createCarrinhoService(corpo));
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /update

| Código | Resposta                                                                    |
| ------ | --------------------------------------------------------------------------- |
| 200    | Retorna um carrinho atualizado                                              |
| 404    | Retorna uma mensagem informando que o item não se encontra na base de dados |
| 500    | Erro interno                                                                |

Trecho do código do updateCarrinhoController:

```javascript
const updateCarrinhoController = async (req, res) => {
  try {
    const updateId = await CarrinhoService.updateCarrinhoService(req.params.id);

    if (updateId == null) {
      return res.status(404).send({
        message: `O carrinho com o Id ${req.params.id} não foi localizado em nossa base de dados.`,
      });
    } else {
      return res
        .status(200)
        .send(await CarrinhoService.updateCarrinhoService(updateId, req.body));
    }
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /remove

| Código | Resposta                                                                    |
| ------ | --------------------------------------------------------------------------- |
| 200    | Retorna um carrinho deletado                                                |
| 404    | Retorna uma mensagem informando que o item não se encontra na base de dados |
| 500    | Erro interno                                                                |

Trecho do código do deleteCarrinhoController:

```javascript
const deleteCarrinhoController = async (req, res) => {
  try {
    const deletedCarrinho = await CarrinhoService.deleteCarrinhoService(
      req.params.id
    );

    if (deletedCarrinho == null) {
      return res.status(404).send({
        message: `O carrinho com o Id ${req.params.id} não foi localizado em nossa base de dados.`,
      });
    } else {
      return res
        .status(200)
        .send({ message: `Carrinho deletado com sucesso.` });
    }
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

### Pedido

Rota de localização/criação/atualização/remoção dos pedidos de compras cadastradas na aplicação.

#### /findAll

| Código | Resposta                                                                    |
| ------ | --------------------------------------------------------------------------- |
| 200    | Retorna todos os pedidos cadastrados                                        |
| 404    | Retorna uma mensagem informando que o item não se encontra na base de dados |
| 500    | Erro interno                                                                |

Trecho do código do findAllPedidosController:

```javascript
const findAllPedidosController = async (req, res) => {
  try {
    if ((await pedidoService.findAllPedidosService()) == "") {
      return res
        .status(404)
        .send("Não há pedidos ativos em nossa base de dados.");
    } else {
      return res.status(200).send(await pedidoService.findAllPedidosService());
    }
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /findById

| Código | Resposta                                                                    |
| ------ | --------------------------------------------------------------------------- |
| 200    | Retorna um pedido cadastrado atraves de um Id informado                     |
| 404    | Retorna uma mensagem informando que o item não se encontra na base de dados |
| 500    | Erro interno                                                                |

Trecho do código do findPedidoByIdController:

```javascript
const findPedidoByIdController = async (req, res) => {
  try {
    const pedido = await pedidoService.findPedidoByIdService(req.params.id);

    if (!pedido) {
      return res.status(404).send({
        message: `O pedido com o Id ${req.params.id} não foi localizado em nossa base de dados.`,
      });
    }

    return res.status(200).send(pedido);
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /create

| Código | Resposta                           |
| ------ | ---------------------------------- |
| 201    | Retorna uma novo pedido cadastrado |
| 500    | Erro interno                       |

Trecho do código do createPedidoController:

```javascript
const createPedidoController = async (req, res) => {
  try {
    const corpo = {
      ...req.body,
      userId: req.userId,
    };
    return res.status(201).send(await pedidoService.createPedidoService(corpo));
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /remove

| Código | Resposta                                                                    |
| ------ | --------------------------------------------------------------------------- |
| 200    | Retorna um pedido deletado                                                  |
| 404    | Retorna uma mensagem informando que o item não se encontra na base de dados |
| 500    | Erro interno                                                                |

Trecho do código do deletePedidoController:

```javascript
const deletePedidoController = async (req, res) => {
  try {
    const deletedPedido = await pedidoService.deletePedidoService(
      req.params.id
    );

    if (deletedPedido == null) {
      return res.status(404).send({
        message: `O pedido com o Id ${req.params.id} não foi localizado em nossa base de dados.`,
      });
    } else {
      return res.status(200).send({ message: `Pedido deletado com sucesso.` });
    }
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /updateStatus

| Código | Resposta                                                                    |
| ------ | --------------------------------------------------------------------------- |
| 200    | Retorna um pedido com o status modificado                                   |
| 404    | Retorna uma mensagem informando que o item não se encontra na base de dados |
| 500    | Erro interno                                                                |

Trecho do código do updateStatusPedidoController:

```javascript
const updateStatusPedidoController = async (req, res) => {
  try {
    const statusPedido = await pedidoService.updateStatusPedidoService(
      req.params.id
    );

    if (statusPedido == null) {
      return res.status(404).send({
        message: `O pedido com o Id ${req.params.id} não foi localizado em nossa base de dados.`,
      });
    } else {
      return res.status(200).send(statusPedido);
    }
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

### Bebida

Rota de localização/criação/atualização/remoção dos tipos de bebidas cadastrados na aplicação.

#### /findAll

| Código | Resposta                                                                    |
| ------ | --------------------------------------------------------------------------- |
| 200    | Retorna todas as bebidas cadastradas                                        |
| 404    | Retorna uma mensagem informando que o item não se encontra na base de dados |
| 500    | Erro interno                                                                |

Trecho do código do findAllBebidasController:

```javascript
const findAllBebidasController = async (req, res) => {
  try {
    if ((await bebidaService.findAllBebidasService()) == "") {
      return res
        .status(404)
        .send("Não há bebidas cadastradas em nossa base de dados.");
    } else {
      return res.status(200).send(await bebidaService.findAllBebidasService());
    }
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /findById

| Código | Resposta                                                                    |
| ------ | --------------------------------------------------------------------------- |
| 200    | Retorna uma bebida cadastrada atraves de um Id informado                    |
| 404    | Retorna uma mensagem informando que o item não se encontra na base de dados |
| 500    | Erro interno                                                                |

Trecho do código do findBebidaByIdController:

```javascript
const findBebidaByIdController = async (req, res) => {
  try {
    const bebida = await bebidaService.findBebidaByIdService(req.params.id);

    if (!bebida) {
      return res
        .status(404)
        .send({ message: "Bebida não localizado em nossa base de dados." });
    }

    return res.status(200).send(bebida);
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /create

| Código | Resposta                                        |
| ------ | ----------------------------------------------- |
| 201    | Retorna um novo tipo/sabor de bebida cadastrada |
| 500    | Erro interno                                    |

Trecho do código do createBebidaController:

```javascript
const createBebidaController = async (req, res) => {
  try {
    if (req.body.categorias === undefined) {
      req.body.categorias = { default: undefined };
    }

    const corpo = {
      ...req.body,
      userId: req.userId,
    };

    return res.status(201).send(await bebidaService.createBebidaService(corpo));
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /update

| Código | Resposta                                                                    |
| ------ | --------------------------------------------------------------------------- |
| 200    | Atualiza um tipo/sabor de bebida cadastrada                                 |
| 404    | Retorna uma mensagem informando que o item não se encontra na base de dados |
| 500    | Erro interno                                                                |

Trecho do código do updateBebidaController:

```javascript
const updateBebidaController = async (req, res) => {
  try {
    const updateId = await bebidaService.updateBebidaService(req.params.id);

    if (updateId == null) {
      return res
        .status(404)
        .send({
          message: `A bebida com o Id ${req.params.id} não foi localizado em nossa base de dados.`,
        });
    } else {
      return res
        .status(200)
        .send(await bebidaService.updateBebidaService(updateId, req.body));
    }
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /remove

| Código | Resposta                                                                    |
| ------ | --------------------------------------------------------------------------- |
| 200    | Deleta um tipo/sabor de bebida cadastrada                                   |
| 404    | Retorna uma mensagem informando que o item não se encontra na base de dados |
| 500    | Erro interno                                                                |

Trecho do código do deleteBebidaController:

```javascript
const deleteBebidaController = async (req, res) => {
  try {
    const deletedBebida = await bebidaService.deleteBebidaService(
      req.params.id
    );

    if (deletedBebida == null) {
      return res
        .status(404)
        .send({ message: `Bebida não localizada em nossa base de dados.` });
    } else {
      return res.status(200).send({ message: `Bebida deletada com sucesso.` });
    }
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /addCategoria

| Código | Resposta                                        |
| ------ | ----------------------------------------------- |
| 200    | Retorna uma bebida com uma categoria cadastrada |
| 500    | Erro interno                                    |

Trecho do código do addCategoriaBebidaController:

```javascript
const addCategoriaBebidaController = async (req, res) => {
  try {
    const categoria = await bebidaService.addCategoriaBebidaService(
      req.params.id,
      req.body
    );
    return res.status(200).send(categoria);
  } catch (err) {
    console.log(`erro: ${err.message}`);
    return res
      .status(500)
      .send({ message: `Erro inesperado, tente novamente.` });
  }
};
```

#### /removeCategoria

| Código | Resposta                                      |
| ------ | --------------------------------------------- |
| 200    | Retorna uma bebida com uma categoria deletada |
| 500    | Erro interno                                  |

Trecho do código do removeCategoriaBebidaController:

```javascript
const removeCategoriaBebidaController = async (req, res) => {
  try {
    const categoriaRm = await bebidaService.removeCategoriaBebidaService(
      req.params.id,
      req.body
    );

    let found = false;

    categoriaRm.value.categorias.map((valor, chave) => {
      if (valor._id == req.body._id) {
        found = true;
      }
    });

    if (found) {
      return res
        .status(200)
        .send({ message: `Categoria deletada com sucesso.` });
    } else {
      return res
        .status(404)
        .send({
          message: `Categoria não adicionada a bebida informada em nossa base de dados.`,
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
