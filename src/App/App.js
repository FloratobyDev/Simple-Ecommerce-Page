import { createContext, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Product from '../components/product/Product';
import './App.scss';

export const GroceryContext = createContext("Grocery");

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
