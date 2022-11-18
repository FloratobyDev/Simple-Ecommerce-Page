import { createContext, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Product from '../components/product/Product';
import './App.scss';

export const GroceryContext = createContext("Grocery");
// img_path, product name, product price, qty about to buy, total price.
function App() {
  const [groceryList, setGroceryList] = useState([])

  return (
    <div className="App">
      <GroceryContext.Provider value={{ groceryList, setGroceryList }}>
        <Navbar />
        <Product />
      </GroceryContext.Provider>
    </div>
  );
}

export default App;
