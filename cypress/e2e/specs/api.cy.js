/// <reference types="cypress" />

import LoginPage from '../pages/login.page';
import UsuariosPage from '../pages/usuarios.page'

describe('ServeRest Tests - API', () => {

  it('Deve realizar login com sucesso via API', () => {
    LoginPage.login()
  });

  it('Pegar dados dos usuarios - GET', () => {
    UsuariosPage.usuarios()
  })
});
