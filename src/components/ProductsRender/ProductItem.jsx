import { Link } from 'react-router-dom'

export const ProductItem = ({ product, user, updateItem, deleteItem, addToCart }) => {
  return (
        <article className="product_item_container">
            <img className="product_item_img"src={product.urls} alt="" />
            <h3 className="product_item_text title" >{product.name}</h3>
            <h4 className="product_item_text">Price: {product.price} 💰 Discount: {product.discount} </h4>
            <h4 className="product_item_text">Stock: {product.stock}</h4>
            <p className="product_item_des">{product.description}</p>
            <div>
            {
             user
               ? (
                <Link className="product_item_link" to='/product' onClick={() => addToCart(product)}>add to cart </Link>)
               : (
                <div className="product_item_button_container" >
                  <button className="product_item_button" onClick={() => updateItem(product)}>update</button>
                  <button className="product_item_button" onClick={() => deleteItem(product.product_id)}>delete</button>
                </div>
                 )
            }
            </div>
        </article>
  )
}

/*
{
    product_id: 3,
    user_id: 70,
    name: 'mia 3',
    price: '150.00',
    discount: '4.00',
    description: 'El Xiaomi Mi A3 es un teléfono inteligente con una excelente relación calidad-precio, que cuenta con una pantalla AMOLED de 6.01 pulgadas, una triple.',
    stock: 2500,
    sold: 0,
    brand: 'xiaomy',
    urls: 'https://m.media-amazon.com/images/I/71DCZOdq92S._AC_UY218_.jpg',
    categories: 'lasser,tecnology'
  }, */
