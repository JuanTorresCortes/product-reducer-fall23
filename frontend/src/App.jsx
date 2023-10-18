import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import './App.css'

import { getProducts, addProduct, deleteProduct, editProduct, addAPIProducts} from "./features/products/productsSlice"

import ProductCard from './components/ProductCard';

function App() {

  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const baseURL = 'http://localhost:4000/api'

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch(baseURL + '/products/get-all-products')
      const data = await response.json()
      console.log(data)  
      dispatch(getProducts(data));
    }
    loadData()
  }, [dispatch])
  
  const handleEditProduct = (editedProduct) => {
    dispatch(editProduct(editedProduct));
};

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
};
  
  const getAPIdata = async () => {
    const response = await fetch(baseURL + '/store/list-products')
    const data = await response.json()
    dispatch(addAPIProducts(data));
  }

  return (
    <div>
      <h1>Product Redux</h1>

      <button onClick={() => dispatch(addProduct())}>Add Product</button>
      <button onClick={getAPIdata}>Add Store/API Products</button>

      {products.map(product => (
                <ProductCard 
                    key={product.id} 
                    {...product} 
                    deleteProduct={handleDeleteProduct}
                    editProduct={handleEditProduct} 
                />
            ))}
    </div>
  )
}

export default App
