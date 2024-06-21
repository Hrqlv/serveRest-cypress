class LoginPage {
    constructor() {
        this.url = 'https://serverest.dev';
      }

    realizarLogin(email, senha) {
      return cy.request({
        method: 'POST',
        url: `${this.url}/login`, 
        body: {
            email: email,
            password: senha
          },
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }
  
  export default new LoginPage();
  