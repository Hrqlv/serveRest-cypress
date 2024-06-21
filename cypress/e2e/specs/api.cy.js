/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
import UsuariosPage from '../pages/usuarios.page';
import LoginPage from '../pages/login.page';

let user;
let userId;

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
});
