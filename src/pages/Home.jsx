import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery,
  getProductsFromCategory } from '../services/api';
import Products from '../components/Products';
import Categories from '../components/Categories';

class Home extends React.Component {
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

  handleClick = async (target) => {
    const nameCategory = await getProductsFromCategory(target);
    this.setState({ productsList: nameCategory.results });
    console.log(await nameCategory);
  };

  render() {
    const { productsList, results } = this.state;
    return (
      <div>
        <Categories handleClick={ this.handleClick } />
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
            </h1>) : (
            productsList.map((category) => (
              <div key={ category.id }>
                <Link
                  data-testid="product-detail-link"
                  to={ `/product/${category.id}` }
                >
                  <li data-testid="product" key={ category.id }>
                    <h2>{ category.title }</h2>
                    <img src={ category.thumbnail } alt={ category.title } />
                    <p>
                      R$
                      {' '}
                      { category.price }
                    </p>
                  </li>
                </Link>
              </div>
            )))}
          ;
          {'}'}
          ;
        </div>

        <Link to="/cart" data-testid="shopping-cart-button">
          <button>Ver Carrinho</button>
        </Link>
      </div>
    );
  }
}

export default Home;
