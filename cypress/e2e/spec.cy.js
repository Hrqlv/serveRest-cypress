/// <reference types="cypress" />

import CadastroPage from "./pages/serveRest.page";
import { faker } from '@faker-js/faker';


describe('ServeRest Tests', () => {
  beforeEach(() => {
    cy.visit('https://front.serverest.dev/cadastrarusuarios')
  })

  it('Realizar cadastro', () => { 
    CadastroPage.cadastro(faker.internet.userName(), faker.internet.email(), faker.internet.password());
  });
});
