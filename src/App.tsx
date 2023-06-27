import { Routes, Route } from 'react-router-dom';
import { Products } from './products/products';
import ProductProvider from './context/ProductsContext';
import { SWRProvider } from './context/SWRContext';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className={'overflow-y-hidden h-screen bg-gradient-to-b from-purple-500 to-black p-0'}>
        <header className='top-0 mb-8 sticky h-1/6 z-50'>
          <div className='h-32 shadow-white shadow-2xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-b-lg py-1 pl-1 pr-2 text-white w-full text-5xl font-bold mb-4 justify-center'>
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-white from-slate-950">Producting App</span>
          </div>
        </header>
        <SWRProvider>
          <ProductProvider>
            <Routes>
              <Route path="/" element={<Products />} />
            </Routes>
          </ProductProvider>
        </SWRProvider>
      </div >
    </BrowserRouter>
  );
}

export default App
