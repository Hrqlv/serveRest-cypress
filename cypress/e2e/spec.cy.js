/// <reference types="cypress" />

import CadastroPage from "./pages/serveRest.page";
import { faker } from '@faker-js/faker';


describe('ServeRest Tests', () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it('Realizar cadastro', () => { 
    CadastroPage.cadastro(faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password());
  });

  it('Adicionar um produto na lista', () => {
    CadastroPage.produto()
  })
});
