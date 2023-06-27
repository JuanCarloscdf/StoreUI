import { ProductsRender } from '../components/ProductsRender/ProductsRender'
import axios from 'axios'

import { useEffect, useState } from 'react'
const getData = async () => {
  const apiRes = await axios('http://localhost:3200/product')
  /* console.log('dasdasdas', apiRes.data) */
  return apiRes.data
}

export const Home = () => {
  const addToCart = async (product) => {
    console.log(product)
    try {
      window.localStorage.setItem('Product', JSON.stringify(product))
      const user = JSON.parse(window.localStorage.getItem('User'))
      const newCartProduct = {
        user_id: user.user_id,
        quantity: 1,
        product: product.product_id
      }
      await axios.put('http://localhost:3200/cart', newCartProduct)
    } catch (error) {

    }
  }
  const [data, setData] = useState([])
  useEffect(() => {
    const getNewData = async () => {
      const newData = await getData()
      /* console.log(newData) */
      setData(newData)
    }
    getNewData()
  }, [])
  return (
        <main className= 'main_home'>
          <ProductsRender data={data} user={true} addToCart={addToCart}></ProductsRender>
        </main>
  )
}
