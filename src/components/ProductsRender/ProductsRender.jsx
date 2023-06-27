import './productsRender.css'
import { ProductItem } from './ProductItem'

export const ProductsRender = ({ data, user, updateItem, deleteItem, addToCart }) => {
  /* console.log(data) */
  return (
        <div className="products_main">
          {
              data.map((product) => {
                return (
                  <ProductItem key={product.product_id} addToCart={addToCart} product={product} user={user} updateItem={updateItem} deleteItem={deleteItem}></ProductItem>
                )
              })

          }

        </div>
  )
}
