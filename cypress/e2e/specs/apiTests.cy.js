/// <reference types="cypress" />

import ServicesAPI from '../pages/apiTests.page';
import { faker } from '@faker-js/faker';

let user, userId, authToken, produtosID, carrinhoID;
let nomeProduto, preco, descricao, quantidade;

describe('ServeRest Tests - API', () => {
  beforeEach(() => {
    user = {
      nome: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: 'true'
    };

    nomeProduto = `${faker.commerce.productName()}-${faker.datatype.uuid()}`;
    preco = faker.datatype.number({ min: 1, max: 1000 });
    descricao = faker.lorem.words(3);
    quantidade = faker.datatype.number({ min: 1, max: 100 });

    // Realizar Cadastro e Login
    ServicesAPI.postUsuarios(user.nome, user.email, user.password, user.administrador)
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
        userId = response.body._id;

        return ServicesAPI.postLogin(user.email, user.password);
      })
      .then((response) => {
        authToken = response.body.authorization;
        expect(authToken).to.not.be.null;
        ServicesAPI.authToken = authToken;

        return ServicesAPI.postProdutos(nomeProduto, preco, descricao, quantidade);
      })
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
        produtosID = response.body._id;
      });
  });

  it('Fluxo de Usuários - API', () => {
    ServicesAPI.getUsuarios()
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('usuarios');
        expect(response.body.usuarios.length).to.be.greaterThan(0);

        return ServicesAPI.getUsuariosID(userId);
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('_id', userId);

        return ServicesAPI.putUsuarios(userId, user.nome, user.email, user.password, user.administrador);
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Registro alterado com sucesso');

        return ServicesAPI.deleteUsuarioID(userId);
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Registro excluído com sucesso');
      });
  });

  it('Fluxo de Produtos - API', () => {
    ServicesAPI.getProdutos()
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('produtos');
        expect(response.body.produtos.length).to.be.greaterThan(0);

        return ServicesAPI.getProdutosID(produtosID);
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('_id', produtosID);

        return ServicesAPI.putProdutosID(produtosID, nomeProduto, preco, descricao, quantidade);
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Registro alterado com sucesso');

        return ServicesAPI.deleteProduto(produtosID);
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Registro excluído com sucesso');
      });
  });

  it('Fluxo de Carrinho - API', () => {
    ServicesAPI.postCarrinho(produtosID, quantidade)
      .then((response) => {
        expect(response.status).to.eq(201);
        carrinhoID = response.body._id;

        return ServicesAPI.getCarrinho();
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('carrinhos');
        expect(response.body.carrinhos.length).to.be.greaterThan(0);

        return ServicesAPI.getCarrinhoID(carrinhoID);
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('_id', carrinhoID);

        return ServicesAPI.concluirCompra(carrinhoID);
      })
      .then((response) => {
        expect(response.status).to.eq(200);

        return ServicesAPI.cancelarCompra(carrinhoID);
      })
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });
});
