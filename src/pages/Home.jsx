import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Products from '../components/Products';

class Home extends Component {
  state = {
    productsList: [],
    querySearch: '',
    categoryIdSearch: '',
    results: {},
  };

  handleSearchText = ({ target }) => {
    this.setState({ querySearch: target.value });
  };

  handleSearch = async () => {
    const { querySearch, categoryIdSearch } = this.state;
    const productData = await getProductsFromCategoryAndQuery(
      categoryIdSearch,
      querySearch,
    );
    this.setState({ results: productData.results });
  };

  render() {
    const { productsList, results } = this.state;
    return (
      <div>
        <input
          data-testid="query-input"
          type="text"
          id="query-input"
          name="querySearch"
          onChange={ this.handleSearchText }
        />
        <button data-testid="query-button" onClick={ this.handleSearch }>
          Pesquisar
        </button>
        {results.length > 0
          ? (results.map(({ price, title, thumbnail }) => (
            <div key={ title }>
              <Products
                title={ title }
                price={ price }
                thumbnail={ thumbnail }
              />
            </div>))
          ) : <h2>Nenhum produto foi encontrado</h2>}
        <div>
          {productsList.length === 0 ? (
            <h1
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h1>) : undefined}
        </div>

        <Link to="/cart" data-testid="shopping-cart-button">
          <button>Ver Carrinho</button>
        </Link>
      </div>
    );
  }
}

export default Home;
