class ProdutosPage {
  constructor() {
    this.url = 'https://serverest.dev';
    this.authToken = null;
  }

  postarProdutos(name, preco, descricao, quantidade) {
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

  pegarDadosProdutosID(produtoID) {
    return cy.request({
      method: 'GET',
      url: `${this.url}/produtos/${produtoID}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authToken}`
      }
    });
  }

  obterDadosProdutos() {
    return cy.request({
      method: 'GET',
      url: `${this.url}/produtos`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authToken}`
      }
    });
  }
}

export default new ProdutosPage();
