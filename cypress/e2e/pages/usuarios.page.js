class UsuariosPage {
    constructor() {
        this.url = 'https://serverest.dev';
      }

    usuarios() {
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
  }
  
  export default new UsuariosPage();
  