export enum ApiThemes {
  fetchThemes = '/themes',
  fetchThemeCategories = '/themes/categories',
  fetchThemeTags = '/themes/tags',
  fetchProducts = '/dashboard/products',
  createProducts = '/themes/creating',
  updateProduct = '/themes/updating',
  deleteProduct = '/themes/deleting',
  uploadTheme = '/themes/upload',
  theme = '/themes'
}

export enum ApiCollections {
  createCollection = '/themes/collections',
  updateCollection = '/themes/collections',
  deleteCollection = '/themes/collections',
  fetchCollections = '/themes/collections'
}

export enum ApiSales {
  fetchSales = '/dashboard/sales'
}

export enum ApiPayouts {
  fetchPayouts = '/dashboard/payout'
}
