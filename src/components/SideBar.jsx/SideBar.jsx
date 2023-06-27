import { useEffect, useState } from 'react'
import axios from 'axios'
import animal from '../../assets/img/animal.svg'
const getCartData = async () => {
  const user = JSON.parse(window.localStorage.getItem('User'))
  const apiRes = await axios.get(`http://localhost:3200/cart/${user.user_id}`)
  return apiRes.data
}
export const SideBar = () => {
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    const effectIniti = async (params) => {
      const newCartData = await getCartData()
      setCartData(newCartData)
      console.log('cartData :>> ', cartData)
    }
    effectIniti()
  }, [])
  return (
        <aside className='aside_container'>
           <img src={animal} alt="" />
           <hr />
           <h3>navbar</h3>
           <h4>Offer products</h4>
           <div>
           {
            cartData.map((item) => {
              return (
                <div key={item.product_id}>
                    <h2>{item.name}</h2>
                    <p>{item.user_id}</p>
                </div>

              )
            })
           }
           </div>
        </aside>
  )
}
