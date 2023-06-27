import { useState } from 'react'
import axios from 'axios'
import './product.css'
const example = {
  brand: 'realtek',
  categories: 'pc piece',
  description: 'keyboar confiable hecho del mejor plastico hecho en idonesia por niños desnutridos',
  discount: '0.00',
  name: 'example',
  price: '25.00',
  product_id: 8,
  sold: 0,
  stock: 125,
  urls: 'https://m.media-amazon.com/images/I/61pUul1oDlL._AC_UL320_.jpg',
  user_id: 70
}
export const Product = () => {
  const handleClick = async () => {
    try {
      const quantity = Number(document.getElementById('quantity').value)
      const user = JSON.parse(window.localStorage.getItem('User'))
      console.log('quantity :>> ', quantity)

      const newCartPro = {
        user_id: user.user_id,
        quantity,
        product: item.product_id
      }
      await axios.put('http://localhost:3200/cart', newCartPro)
    } catch (error) {

    }
  }
  const [item] = useState(() => {
    const product = JSON.parse(window.localStorage.getItem('Product'))
    return product || example
  })
  return (
        <main>
           <article className='item_container'>
            <h1 className='item_title'>{item.name}</h1>
            <div className='item_data'>
              <img className='item_image' src={item.urls} alt="" />
              <div className='item_info'>
                <h2 className='item_text'>💎PRICE: {item.price} 😉 DISCOUNT: {item.discount} 💰</h2>
                <h2 className='item_text'>STOCK {item.stock}</h2>
                <p className='item_text'>{item.description}</p>
              </div>
            </div>
            <div className='item_action'>
              <label htmlFor="quantity">Quantity</label>
              <input className='item_input' type="number" min="1" required id='quantity' name='quantity' placeholder='quantity'/>
              <button className='item_button' onClick={handleClick}>Add to Cart</button>
            </div>
           </article>
        </main>
  )
}
