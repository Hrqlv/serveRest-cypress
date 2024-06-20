class UsuariosPage {
    constructor() {
        this.url = 'https://serverest.dev';
      }

    pegarListaUsuarios() {
      return cy.request({
        method: 'GET',
        url: `${this.url}/usuarios`, 
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    }

    cadastrarUsuario(name, email, password, adm) {
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
          }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.message).to.eq('Cadastro realizado com sucesso');
            Cypress.env('authToken', response.body.token);
          });
  }
}
  
  export default new UsuariosPage();
  