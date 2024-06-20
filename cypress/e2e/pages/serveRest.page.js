class CadastroPage {
    realizarCadastro(user, email, password) {
        cy.get('[data-testid="nome"]').type(user);
        cy.get('[data-testid="email"]').type(email);
        cy.get('[data-testid="password"]').type(password);
        cy.get('[data-testid="cadastrar"]').click()
        cy.contains('Cadastro realizado com sucesso').should('be.visible');

    }

    adicionarProduto() {
        cy.contains('Produtos').should('be.visible')
        cy.get(':nth-child(1) > .card-body > div > [href="/minhaListaDeProdutos"] > [data-testid="adicionarNaLista"]').click() 
    }

    adicionarProdutoNoCarrinho() {
        cy.contains('Lista de Compras').should('be.visible')
        cy.get('[data-testid="adicionar carrinho"]').click()
    }

    validarMensagem() {
        cy.contains('Em construção aguarde').click()
    }
  }
  
  export default new CadastroPage();