class CadastroPage {
    cadastro(user, email, password) {
        cy.get('[data-testid="nome"]').type(user);
        cy.get('[data-testid="email"]').type(email);
        cy.get('[data-testid="password"]').type(password);
        cy.get('[data-testid="cadastrar"]').click()
        cy.contains('Cadastro realizado com sucesso').should('be.visible');

    }

    produto() {
        cy.contains('Produtos').should('be.visible')
        cy.get(':nth-child(1) > .card-body').click() 
    }
  }
  
  export default new CadastroPage();