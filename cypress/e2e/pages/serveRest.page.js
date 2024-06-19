class CadastroPage {
    cadastro(user, email, password) {
        cy.get('[data-testid="nome"]').type(user);
        cy.get('[data-testid="email"]').type(email);
        cy.get('[data-testid="password"]').type(password);
        cy.get('[data-testid="cadastrar"]').click()
        cy.contains('Cadastro realizado com sucesso').should('be.visible');

    }
  }
  
  export default new CadastroPage();