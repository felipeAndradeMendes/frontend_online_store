export async function getCategories() {
  const apiMarket = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = await apiMarket.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const apiMarket = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const response = await apiMarket.json();
  return response;
}

export async function getProductsFromCategory(categoryId) {
  const apiMarket = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
  const response = await apiMarket.json();
  return response;
}

export async function getProductById() {
  const apiMarket = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const response = await apiMarket.json();
  return response;
}
