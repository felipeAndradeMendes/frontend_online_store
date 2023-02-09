import React, { Component } from 'react';
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
    return (
      <div>
        <p>Categorias</p>
        { categories.map(({ name }) => (
          <button
            data-testid="category"
            htmlFor=""
            key={ name }
          >
            {name}
          </button>
        ))}
      </div>
    );
  }
}

export default Categories;
