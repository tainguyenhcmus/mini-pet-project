import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect
} from 'react'
import { useSWRContext } from './SWRContext';

import { IProductsContext, ProductsContextState } from '../types';

const SKIP_PRODUCT = 20
const defaultProductsContextState: ProductsContextState = {
  products: [],
  limit: SKIP_PRODUCT,
  skip: 0,
  total: 0,
  page: 0,
  loading: true,
  search: '',
}

export const ProductsContext = createContext<IProductsContext>({
  productsContextState: defaultProductsContextState,
  isLoading: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateProductsContextState: () => { }
})

export const useProductsContext = () => useContext(ProductsContext)

const ProductsContextProvider = ({ children }: { children: ReactNode }) => {
  const { useSWR } = useSWRContext();
  const [productsContextState, setProductsContextState] = useState(
    defaultProductsContextState
  )

  const urlApi = productsContextState.search ?
    `https://dummyjson.com/products/search?q=${productsContextState.search}` :
    `https://dummyjson.com/products?limit=20&skip=${productsContextState.page * SKIP_PRODUCT}`

  // Fetch data using SWR
  const { data: productsData, isLoading } = useSWR(
    urlApi
  );

  const updateProductsContextState = (
    updatedObj: Partial<ProductsContextState>
  ) => {
    setProductsContextState(previousProductsContextState => ({
      ...previousProductsContextState,
      ...updatedObj
    }))
  }

  useEffect(() => {
    if (productsData) {
      const updatedProducts = productsData?.products;
      updateProductsContextState({
        ...productsData,
        products: [...productsContextState.products, ...updatedProducts],
        // loading: isLoading
      })
    }
  }, [productsData])

  const ProductsContextProviderData = {
    productsContextState,
    updateProductsContextState,
    isLoading,
  }

  return (
    <ProductsContext.Provider value={ProductsContextProviderData}>
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsContextProvider