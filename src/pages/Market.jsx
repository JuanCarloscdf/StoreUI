import axios from 'axios'
import './market.css'
import { ProductsRender } from '../components/ProductsRender/ProductsRender'
import { useState, useEffect } from 'react'
const productValues = [
  { value: 'name', type: 'text', placeholder: 'PlayStation 5' },
  { value: 'price', type: 'number', placeholder: ' $' },
  { value: 'discount', type: 'number', placeholder: ' %' },
  { value: 'stock', type: 'number', placeholder: '2555' },
  { value: 'brand', type: 'text', placeholder: 'playstation corp' },
  { value: 'category', type: 'text', placeholder: 'gaming console' },
  { value: 'images', type: 'text', placeholder: 'http://images....' }
]

const getData = async () => {
  const apiRes = await axios('http://localhost:3200/product')
  /* console.log('dasdasdas', apiRes.data) */
  return apiRes.data
}

export const Market = () => {
  const [data, setData] = useState([])
  const [action, setAction] = useState({ value: true, id: 0 })
  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      const formData = Object.fromEntries(new window.FormData(event.target))
      const userData = JSON.parse(window.localStorage.getItem('User'))
      formData.sold = 0
      formData.user_id = userData.user_id
      if (action.value) {
        await axios.post('http://localhost:3200/product', formData)
      } else {
        /* console.log(formData)
        console.log(action.id) */
        await axios.put(`http://localhost:3200/product/${action.id}`, formData)
        setAction({ value: true, id: 0 })
      }
      const updateData = await getData()
      setData(updateData)
      event.target.reset()
    } catch (error) {

    }
  }
  const updateItem = async (product) => {
    console.log('product :>> ', product)
    document.getElementById('name').value = product.name
    document.getElementById('price').value = product.price
    document.getElementById('brand').value = product.brand
    document.getElementById('category').value = product.categories
    document.getElementById('description').value = product.description
    document.getElementById('discount').value = product.discount
    document.getElementById('stock').value = product.stock
    document.getElementById('images').value = product.urls
    setAction({ value: false, id: product.product_id })
  }
  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3200/product/${id}`)
      const updatedItems = await getData()
      setData(updatedItems)
    } catch (error) {

    }
  }
  useEffect(() => {
    const getNewData = async () => {
      const newData = await getData()
      /*  console.log(newData) */
      setData(newData)
    }
    getNewData()
  }, [])
  return (
        <main className="market_container" onSubmit={handleSubmit}>
            <h2>Create Product</h2>
            <form className="market_product" id='market_from'>
              <div className='market_item_container'>
              {
                productValues.map((item) => {
                  return (
                    <div className="market_input_container" key={item.value}>
                      <label className="market_label" htmlFor={item.value}>{item.value}</label>
                      <input className="market_input" type={item.type} id={item.value} name={item.value} placeholder={item.placeholder} required/>
                    </div>
                  )
                })
              }
              </div>
              <div className='market_input_container market_textarea'>
                <label className='market_label' htmlFor="description">description</label>
                <textarea className='merket_text_area'name="description" id="description" cols="30" rows="10"></textarea>
              </div>
              <button className="market_submit">{action.value ? ' Create Product' : 'Update product'}</button>
            </form>
            <ProductsRender data={data} user={false} updateItem={updateItem} deleteItem={deleteItem}></ProductsRender>
        </main>
  )
}

/*
{
    "name" : "source gold 80 plus",
    "price" : 120,
    "discount" : 2,
    "description" : "source 800w real power to high gamma pcs",
    "stock" : 450,
    "sold" : 0,
    "brand" : "Asrock",
    "user_id" : 2,
    "category" : "source,computer part,gold",
    "images" : "http://image34,http://image36,http://image33"
}
*/
