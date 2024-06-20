/// <reference types="cypress" />

import CadastroPage from '../pages/serveRest.page';
import { faker } from '@faker-js/faker';

let user;
user = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

beforeEach(() => {
  cy.visit('/');
});

describe('ServeRest Tests - Fluxos Positivo', () => {
  it('Realizar cadastro e logo adicionar produto na sequência', () => {
    CadastroPage.realizarCadastro(user.username,
      user.email,
      user.password)
    CadastroPage.adicionarProduto();
    CadastroPage.adicionarProdutoNoCarrinho()
    CadastroPage.validarMensagem()
  })
});

describe('Fluxos negativo', () => {
  it('Validar mensagens de erro na tela de cadastro', () => {
    CadastroPage.validarMensagensErroTelaCadastro()
  })
})
