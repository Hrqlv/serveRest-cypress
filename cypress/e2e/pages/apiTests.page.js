class ServicesAPI {
  
  constructor() {
    this.authToken = null;
    this.urlBase = 'https://serverest.dev';
  }

  // API de Login
  postLogin(email, password) {
    return cy.request({
      method: 'POST',
      url: `${this.urlBase}/login`,
      body: {
        email: email,
        password: password
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status, `Request (/login) failed\nStatus: ${response.status} ${response.statusText}`).to.eq(200);
      this.authToken = response.body.authorization;
      return response;
    });
  }

  // API's de Usuario
  getUsuarios() {
    return cy.request({
      method: 'GET',
      url: `${this.urlBase}/usuarios`,
      headers: {
        'Authorization': this.authToken
      }
    });
  }

  postUsuarios(nome, email, senha, adm) {
    return cy.request({
      method: 'POST',
      url: `${this.urlBase}/usuarios`,
      body: {
        nome: nome,
        email: email,
        password: senha,
        administrador: adm
      },
      headers: {
        'Authorization': `Bearer ${this.authToken}`,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status, `Request (/usuarios) failed\nStatus: ${response.status} ${response.statusText}`).to.eq(201);
      return response;
    });
  }

  getUsuariosID(userID) {
    return cy.request({
      method: 'GET',
      url: `${this.urlBase}/usuarios/${userID}`,
      headers: {
        'Authorization': this.authToken
      }
    }).then((response) => {
      expect(response.status, `Request (/usuarios/${userID}) failed\nStatus: ${response.status} ${response.statusText}`).to.eq(200);
      return response;
    });
  }

  deleteUsuarioID(userID) {
    return cy.request({
      method: 'DELETE',
      url: `${this.urlBase}/usuarios/${userID}`,
      headers: {
        'Authorization': this.authToken
      }
    }).then((response) => {
      expect(response.status, `Request (/usuarios/${userID}) failed\nStatus: ${response.status} ${response.statusText}`).to.eq(200);
      return response;
    });
  }

  putUsuarios(userID, nome, email, senha, adm) {
    return cy.request({
      method: 'PUT',
      url: `${this.urlBase}/usuarios/${userID}`,
      body: {
        nome: nome,
        email: email,
        password: senha,
        administrador: adm
      },
      headers: {
        'Authorization': this.authToken,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status, `Request (/usuarios/${userID}) failed\nStatus: ${response.status} ${response.statusText}`).to.eq(200);
      return response;
    });
  }

  // API's de Produto
  getProdutos() {
    return cy.request({
      method: 'GET',
      url: `${this.urlBase}/produtos`,
      headers: {
        'Authorization': this.authToken
      }
    });
  }

  postProdutos(nome, preco, descricao, quantidade) {
    return cy.request({
      method: 'POST',
      url: `${this.urlBase}/produtos`,
      body: {
        nome: nome,
        preco: preco,
        descricao: descricao,
        quantidade: quantidade
      },
      headers: {
        'Authorization': this.authToken,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status, `Request (/produtos) failed\nStatus: ${response.status} ${response.statusText}`).to.eq(201);
      return response;
    });
  }

  getProdutosID(produtoID) {
    return cy.request({
      method: 'GET',
      url: `${this.urlBase}/produtos/${produtoID}`,
      headers: {
        'Authorization': this.authToken
      }
    }).then((response) => {
      expect(response.status, `Request (/produtos/${produtoID}) failed\nStatus: ${response.status} ${response.statusText}`).to.eq(200);
      return response;
    });
  }

  deleteProduto(produtoID) {
    return cy.request({
      method: 'DELETE',
      url: `${this.urlBase}/produtos/${produtoID}`,
      headers: {
        'Authorization': this.authToken
      }
    }).then((response) => {
      expect(response.status, `Request (/produtos/${produtoID}) failed\nStatus: ${response.status} ${response.statusText}`).to.eq(200);
      return response;
    });
  }

  putProdutosID(produtoID, nome, preco, descricao, quantidade) {
    return cy.request({
      method: 'PUT',
      url: `${this.urlBase}/produtos/${produtoID}`,
      body: {
        nome: nome,
        preco: preco,
        descricao: descricao,
        quantidade: quantidade
      },
      headers: {
        'Authorization': this.authToken,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status, `Request (/produtos/${produtoID}) failed\nStatus: ${response.status} ${response.statusText}`).to.eq(200);
      return response;
    });
  }

  // API's de Carrinho
  getCarrinho() {
    return cy.request({
      method: 'GET',
      url: `${this.urlBase}/carrinhos`,
      headers: {
        'Authorization': this.authToken
      }
    });
  }

  postCarrinho(produtoID, quantidade) {
    return cy.request({
      method: 'POST',
      url: `${this.urlBase}/carrinhos`,
      body: {
        produtos: [
          {
            idProduto: produtoID,
            quantidade: quantidade
          }
        ]
      },
      headers: {
        'Authorization': this.authToken,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status, `Request (/carrinhos) failed\nStatus: ${response.status} ${response.statusText}`).to.eq(201);
      return response;
    });
  }

  getCarrinhoID(carrinhoID) {
    return cy.request({
      method: 'GET',
      url: `${this.urlBase}/carrinhos/${carrinhoID}`,
      headers: {
        'Authorization': this.authToken
      }
    });
  }

  concluirCompra(carrinhoID) {
    return cy.request({
      method: 'DELETE',
      url: `${this.urlBase}/carrinhos/concluir-compra`,
      body: { id: carrinhoID },
      headers: {
        'Authorization': this.authToken
      }
    }).then((response) => {
      expect(response.status, `Request (/carrinhos/concluir-compra) failed\nStatus: ${response.status} ${response.statusText}`).to.eq(200);
      return response;
    });
  }

  cancelarCompra(carrinhoID) {
    return cy.request({
      method: 'DELETE',
      url: `${this.urlBase}/carrinhos/cancelar-compra`,
      body: { id: carrinhoID },
      headers: {
        'Authorization': this.authToken
      }
    }).then((response) => {
      expect(response.status, `Request (/carrinhos/cancelar-compra) failed\nStatus: ${response.status} ${response.statusText}`).to.eq(200);
      return response;
    });
  }

}

export default new ServicesAPI();
