/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
import LoginPage from '../pages/login.page';
import UsuariosPage from '../pages/usuarios.page'

let user;
let administrador = 'true';

user = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

describe('ServeRest Tests - API', () => {

  it('Realizar login com sucesso - POST', () => {
    LoginPage.realizarLogin()
  });

  it('Pegar dados dos usuarios - GET', () => {
    UsuariosPage.pegarListaUsuarios()
  })

  it('Cadastrar um usuario - POST', () => {
    UsuariosPage.cadastrarUsuario(user.username,
        user.email,
        user.password,
        administrador 
    )
  })
});
