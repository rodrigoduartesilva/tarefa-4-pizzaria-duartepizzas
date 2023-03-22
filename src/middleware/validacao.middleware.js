const validaUsuario = (req, res, next) => {
    if (!req.body.nome) {
        return res.status(400).send({ message: `O campo 'nome' precisa ser preenchido.` });
    }

    if (!req.body.email) {
        return res.status(400).send({ message: `O campo 'email' precisa ser preenchido.` });
    }

    if (!req.body.senha) {
        return res.status(400).send({ message: `O campo 'senha' precisa ser preenchido.` });
    }

    if (!req.body.imagem) {
        return res.status(400).send({ message: `O campo 'imagem' precisa ser preenchido.` });
    }

    if (!req.body.admin) {
        return res.status(400).send({ message: `O campo 'admin' precisa ser preenchido.` });
    }

    return next();
}

const validaPizza = (req, res, next) => {
    let erros = [];//array para acumular os erros

    if (!req.body.nome) {
        erros.push('nome');
    }

    if (!req.body.descricao) {
        erros.push('descricao');
    }

    if (!req.body.precoUnitario) {
        erros.push('precoUnitario');
    }

    if (!req.body.imagem) {
        erros.push('imagem');
    }

    if (!req.body.codigoBarra) {
        erros.push('codigoBarra');
    }


    //Teste de quantos erros ocorreram
    if (erros.length == 0) {
        return next();
    } else {
        if (erros.length > 1) {
            return res.status(400).send({ message: `Os campos ${erros} precisam ser preenchidos.` });
        } else {
            return res.status(400).send({ message: `O campo ${erros} precisa ser preenchido.` });
        }
    }
}

const validaCategoria = (req, res, next) => {
    if (!req.body.nome) {
        return res.status(400).send({ message: `O campo 'nome' precisa ser preenchido.` });
    }

    return next();
}


module.exports = {
    validaUsuario,
    validaPizza,
    validaCategoria
}