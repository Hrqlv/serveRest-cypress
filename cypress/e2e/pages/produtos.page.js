class ProdutosPage {
    constructor() {
      this.url = 'https://serverest.dev';
      this.authToken = '';
    }
      
    getProdutos() {
        return cy.request({
        method: 'GET',
        url: `${this.url}/produtos`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.authToken}`
          }
    });
    }

    postProdutos(name, preco, descricao, quantidade) {
        return cy.request({
            method: 'POST',
            url: `${this.url}/produtos`,
            body: {
              nome: name,
              preco: preco,
              descricao: descricao,
              quantidade: quantidade
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authToken}`
              }
          });
    }

    getProdutosID(produtosID) {
   
    }
  
    deleteProdutosID(produtosID) {
  
    }
  
    putProdutosID(produtosID, name, email, password, adm) {
   
    }
  }
  
  export default new ProdutosPage();
  