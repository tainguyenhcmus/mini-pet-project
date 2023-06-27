export interface IProductDetail {
  brand: string,
  category: string,
  description: string,
  discountPercentage: number,
  id: number,
  images: any
  price: number,
  rating: number,
  stock: number,
  thumbnail: string,
  title: string,
}

export interface ProductsContextState {
  products: IProductDetail[],
  limit: number,
  skip: number,
  total: number,
  page: number,
  loading: boolean,
  search: string,
}

export interface IProductsContext {
  productsContextState: ProductsContextState,
  isLoading: boolean,
  updateProductsContextState: (
    updatedObj: Partial<ProductsContextState>
  ) => void
}
