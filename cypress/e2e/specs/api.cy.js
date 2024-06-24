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
    UsuariosPage.postarUsuarios(user.username, user.email, user.password, user.administrador)
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

    // Cadastrar Produto
    // ProdutosPage.postarProdutos()
    // .then((response) => {
    //   expect(response.body.message).to.eq('Cadastro realizado com sucesso');
    //   produtosID = response.body._id;
    //   expect(response.status).to.eq(201);
    // });
})

  it('Pegar dados dos usuarios - GET', () => {
    UsuariosPage.obterDadosUsuarios()
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('usuarios');
        expect(response.body.usuarios.length).to.be.greaterThan(0);
      });
  });

  it('Buscar o usuario pelo id - GET', () => {
    UsuariosPage.obterDadosUsuariosID(userId)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('_id', userId);
      });
  });

  it('Excluir o usuario pelo id - DELETE', () => {
    UsuariosPage.deletarUsuarioID(userId)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Registro excluído com sucesso');
      });
  });

  it('Alterar o usuario referente ao id - PUT', () => {
    UsuariosPage.alterarDadosUsuarios(userId, user.username, user.email, user.password, user.administrador)
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      });
  });

  it('Pegar dados dos produtos - GET', () => {
    ProdutosPage.obterDadosProdutos()
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('produtos');
      expect(response.body.produtos.length).to.be.greaterThan(0);
    });
  })

//   it('Pegar produtos produtos pelo ID - GET', () => {
//     ProdutosPage.obterDadosUsuariosID(produtosID).then((response) => {
//       expect(response.status).to.eq(200);
//       const produtoIDBody = response.body;
//       expect(produtoIDBody).to.have.property('_id');
//   })
// })
})