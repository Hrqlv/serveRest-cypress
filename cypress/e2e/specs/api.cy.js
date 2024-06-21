/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
import UsuariosPage from '../pages/usuarios.page';
import LoginPage from '../pages/login.page';
import ProdutosPage from '../pages/produtos.page'

let user, userId;
let produtosID;

const nomeProduto = `${faker.commerce.productName()}-${faker.datatype.uuid()}`;
const preco = faker.datatype.number({ min: 1, max: 1000 });
const descricao = faker.lorem.words(3);
const quantidade = faker.datatype.number({ min: 1, max: 100 });


describe('ServeRest Tests - API', () => {

  before(() => {
    user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: 'true'
    };

    // Realizar Cadastro
    UsuariosPage.postUsuarios(user.username, user.email, user.password, user.administrador)
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
        userId = response.body._id;
      });

    // Realizar Login
    LoginPage.realizarLogin(user.email, user.password)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Login realizado com sucesso');
        LoginPage.authToken = response.body.authorization;
      });

    //Cadastrar Produto
    ProdutosPage.postProdutos(nomeProduto, preco, descricao, quantidade)
    .then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      produtosID = response.body._id;
  });

  
  it('Pegar dados dos usuarios - GET', () => {
    UsuariosPage.getUsuarios()
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('usuarios');
        expect(response.body.usuarios.length).to.be.greaterThan(0);
      });
  });

  it('Buscar o usuario pelo id - GET', () => {
    UsuariosPage.getUsuariosID(userId)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('_id', userId);
      });
  });

  it('Excluir o usuario pelo id - DELETE', () => {
    UsuariosPage.deleteUsuarioID(userId)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Registro excluído com sucesso');
      });
  });

  it('Alterar o usuario referente ao id - PUT', () => {
    UsuariosPage.putUsuarios(userId, user.username, user.email, user.password, user.administrador)
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      });
  });

  it('Pegar dados dos produtos - GET', () => {
    ProdutosPage.getProdutos()
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('produtos');
      expect(response.body.produtos.length).to.be.greaterThan(0);
    });
  })
  })
  // it('Cadastrar Produto - POST', () => {
  //   ProdutosPage.postProdutos(nomeProduto, preco, descricao, quantidade)
  //   .then((response) => {
  //     expect(response.status).to.eq(201);
  //     expect(response.body.message).to.eq('Cadastro realizado com sucesso');
  //     produtosID = response.body._id;
  //   });
  })
