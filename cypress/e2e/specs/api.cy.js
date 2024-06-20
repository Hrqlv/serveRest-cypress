/// <reference types="cypress" />

import LoginPage from '../pages/api.page';

describe('ServeRest Tests - API', () => {

  it('Deve realizar login com sucesso via API', () => {
    LoginPage.login()
  });
});
