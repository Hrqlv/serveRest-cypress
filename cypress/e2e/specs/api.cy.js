/// <reference types="cypress" />

import ServicesAPI from '../pages/servicesAPI.page';
import { faker } from '@faker-js/faker';

let user, userId, authToken, produtosID, carrinhoID;

describe('ServeRest Tests - API', () => {
  beforeEach(() => {
    user = {
      nome: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: 'true'
    };

    // Realizar Cadastro e Login
    cy.wrap(null).then(() => {
      return ServicesAPI.postUsuarios(user.nome, user.email, user.password, user.administrador)
        .then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.message).to.eq('Cadastro realizado com sucesso');
          userId = response.body._id;
        });
    }).then(() => {
      return ServicesAPI.postLogin(user.email, user.password)
        .then((response) => {
          authToken = response.body.authorization;
          expect(authToken).to.not.be.null;
          ServicesAPI.authToken = authToken;
        });
    });
  });

  it('Teste de Login - API', () => {
    // Verificar se o login retorna o token de autorização
    expect(authToken).to.not.be.null;
  });

  it('Fluxo de Usuários - API', () => {
    // Listar todos os usuários
    ServicesAPI.getUsuarios()
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('usuarios');
        expect(response.body.usuarios.length).to.be.greaterThan(0);
      });

    // Obter detalhes de um usuário específico
    ServicesAPI.getUsuariosID(userId)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('_id', userId);
      });

    // Deletar um usuário
    ServicesAPI.deleteUsuarioID(userId)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Registro excluído com sucesso');
      });
  });

  it('Fluxo de Produtos - API', () => {
    const nomeProduto = `${faker.commerce.productName()}-${faker.datatype.uuid()}`; 
    const preco = faker.datatype.number({ min: 1, max: 1000 });
    const descricao = faker.lorem.words(3);
    const quantidade = faker.datatype.number({ min: 1, max: 100 });

    // Criar um novo produto
    ServicesAPI.postProdutos(nomeProduto, preco, descricao, quantidade)
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
        produtosID = response.body._id;

        // Listar todos os produtos
        return ServicesAPI.getProdutos().then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('produtos');
          expect(response.body.produtos.length).to.be.greaterThan(0);
        });
      }).then(() => {
        // Obter detalhes de um produto específico
        return ServicesAPI.getProdutosID(produtosID).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('_id');
        });
      }).then(() => {
        // Atualizar um produto
        const novoNome = `${faker.commerce.productName()}-${faker.datatype.uuid()}`;
        return ServicesAPI.putProdutosID(produtosID, novoNome, preco, descricao, quantidade).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.message).to.eq('Registro alterado com sucesso');
        });
      }).then(() => {
        // Deletar um produto
        return ServicesAPI.deleteProduto(produtosID).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.message).to.eq('Registro excluído com sucesso');
        });
      });
  });

  it('Fluxo de Carrinho - API', () => {
    const nomeProduto = `${faker.commerce.productName()}-${faker.datatype.uuid()}`; 
    const preco = faker.datatype.number({ min: 1, max: 1000 });
    const descricao = faker.lorem.words(3);
    const quantidade = faker.datatype.number({ min: 1, max: 100 });

    // Criar um novo produto
    ServicesAPI.postProdutos(nomeProduto, preco, descricao, quantidade)
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
        produtosID = response.body._id;

        // Adicionar o produto ao carrinho
        return ServicesAPI.postCarrinho(produtosID, quantidade)
          .then((response) => {
            expect(response.status).to.eq(201);
            carrinhoID = response.body._id;
            return carrinhoID;
          });
      }).then(() => {
        // Listar carrinhos
        return ServicesAPI.getCarrinho().then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('carrinhos');
          expect(response.body.carrinhos.length).to.be.greaterThan(0);
        });
      }).then(() => {
        // Obter detalhes do carrinho por ID
        return ServicesAPI.getCarrinhoID(carrinhoID).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('_id', carrinhoID);
        });
      }).then(() => {
        // Concluir a compra
        return ServicesAPI.concluirCompra(carrinhoID).then((response) => {
          expect(response.status).to.eq(200);
        });
      }).then(() => {
        // Cancelar a compra
        return ServicesAPI.cancelarCompra(carrinhoID).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
  });
});