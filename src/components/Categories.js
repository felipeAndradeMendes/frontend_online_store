import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Categories extends Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    const apiCategories = await getCategories();
    this.setState({ categories: apiCategories });
  }

  render() {
    const { categories } = this.state;
    const { handleClick } = this.props;
    return (
      <div>
        <p>Categorias</p>
        { categories.map(({ name, id }) => (
          <button
            data-testid="category"
            htmlFor=""
            key={ name }
            onClick={ () => handleClick(id) }
          >
            {name}
          </button>
        ))}
      </div>
    );
  }
}

Categories.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
export default Categories;
