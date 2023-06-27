import { useCallback, useEffect, useRef, useState } from 'react';
import { useProductsContext } from '../context/ProductsContext';
import { Loader2 } from 'lucide-react';
import _ from 'lodash';
// import { List } from 'react-virtualized';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProductsProps {
}

export function Products(props: ProductsProps) {
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const {
    isLoading,
    productsContextState: { products, skip, total },
    updateProductsContextState,
  } = useProductsContext()

  const isLoadMore = skip + 20 < total

  const loadMoreData = () => {
    updateProductsContextState({ page })
  }

  useEffect(() => {
    loadMoreData()
  }, [page])

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        console.log(skip, total, isLoadMore)
        if (scrollTop + clientHeight >= scrollHeight - 5 && isLoadMore) {
          setPage(prev => prev + 1)
        }
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isLoadMore]);

  // Debounce the search API call
  const debouncedSearch = useCallback(_.debounce((term) => {
    if (term) {
      updateProductsContextState({
        search: term,
        products: []
      })
    } else {
      updateProductsContextState({
        search: '',
        products: []
      })
    }
  }, 2000), []);

  const searchForm = () => {
    return <div
      className="absolute sticky top-40 container mx-auto pb-8 z-40">
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className=" text-gray-500 dark:text-gray-400 w-6 h-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <input
          type="string"
          id="searchProduct"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          required
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
            debouncedSearch(e.target.value);
          }}
        />
        {/* <button
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          SEARCH
        </button> */}
      </div>
    </div>
  }



  const renderListProducts = () => {
    return products && <><ul>
      {products?.map((t, i) => (
        <li
          className='hover:scale-y-115 transition ease-in-out delay-150 hover:-translate-y-2 my-8 bg-indigo-500 shadow-indigo-500/50 shadow-2xl cursor-pointer grid grid-cols-2 px-5 py-4 hover:text-white rounded-lg cursor-pointer'
          key={t.id}
        >
          <img className="object-cover h-48 w-96" src={t.images[0]}></img>
          <span>Product: {t.id}, {t.description}</span>
        </li>
      ))}
    </ul>
    </>
  }

  return (
    <>
      {searchForm()}
      <div
        ref={scrollContainerRef}
        className='relative container mx-auto overflow-auto h-4/6'>
        <h2>Products</h2>
        <div
          className='flex flex-col space-y-1 pb-28 overscroll-auto h-screen'>
          {products && products.length ?
            renderListProducts() : <span className='mx-auto h-32 w-32 animate-bounce text-white'>No data</span>
          }
        </div>
      </div>
      {isLoading && <Loader2 className='mx-auto h-32 w-32 animate-spin text-white' />}
    </>
  );
}

export default Products;