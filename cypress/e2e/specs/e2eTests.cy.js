/// <reference types="cypress" />

import CadastroProdutoPage from '../pages/e2eTests.page';
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

describe('ServeRest Tests - Fluxos Positivo - E2E', () => {
  it('Realizar cadastro e logo adicionar produto na sequência', () => {
    CadastroProdutoPage.realizarCadastro(user.username,
      user.email,
      user.password)
    CadastroProdutoPage.adicionarProduto();
    CadastroProdutoPage.adicionarProdutoNoCarrinho()
    CadastroProdutoPage.validarMensagem()
  })
});

describe('Fluxos negativo', () => {
  it('Validar mensagens de erro na tela de cadastro', () => {
    CadastroProdutoPage.validarMensagensErroTelaCadastro()
  })
})
