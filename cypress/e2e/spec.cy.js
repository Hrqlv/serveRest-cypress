/// <reference types="cypress" />

import CadastroPage from './pages/serveRest.page';
import { faker } from '@faker-js/faker';

describe('ServeRest Tests', () => {
  let user;
  user = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  beforeEach(() => {
    cy.visit('/');
    CadastroPage.realizarCadastro(user.username, user.email, user.password)
  });

  it('Adicionar produto na sequência', () => {
    CadastroPage.adicionarProduto();
    CadastroPage.adicionarProdutoNoCarrinho()
    CadastroPage.validarMensagem()
  })
});
