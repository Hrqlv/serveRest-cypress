class UsuariosPage {
  constructor() {
    this.url = 'https://serverest.dev';
    this.authToken = '';
  }
  
  postUsuarios(name, email, password, adm) {
    return cy.request({
      method: 'POST',
      url: `${this.url}/usuarios`,
      body: {
        nome: name,
        email: email,
        password: password,
        administrador: adm
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getUsuarios() {
    return cy.request({
      method: 'GET',
      url: `${this.url}/usuarios`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authToken}`
      }
    });
  }

  getUsuariosID(userId) {
    return cy.request({
      method: 'GET',
      url: `${this.url}/usuarios/${userId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authToken}`
      }
    });
  }

  deleteUsuarioID(userId) {
    return cy.request({
      method: 'DELETE',
      url: `${this.url}/usuarios/${userId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authToken}`
      }
    });
  }

  putUsuarios(userId, name, email, password, adm) {
    return cy.request({
      method: 'PUT',
      url: `${this.url}/usuarios/${userId}`,
      body: {
        nome: name,
        email: email,
        password: password,
        administrador: adm
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authToken}`
      }
    });
  }
}

export default new UsuariosPage();
