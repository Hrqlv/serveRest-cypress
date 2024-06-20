class LoginPage {
    constructor() {
        this.url = 'https://serverest.dev';
      }

    login() {
      return cy.request({
        method: 'POST',
        url: `${this.url}/login`, 
        body: {
            "email": "fulano@qa.com",
            "password": "teste"
          },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Login realizado com sucesso');
        Cypress.env('authToken', response.body.token);
      });
    }
  }
  
  export default new LoginPage();
  