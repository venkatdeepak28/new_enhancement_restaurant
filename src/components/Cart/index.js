import {FaRegTrashAlt} from 'react-icons/fa'
import Navbar from '../Navbar'
import RestaurantContext from '../../context'

import './index.css'

const Cart = () => (
  <RestaurantContext.Consumer>
    {value => {
      const {
        cartList,
        removeAllCartItems,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value

      const addQuantity = id => {
        incrementCartItemQuantity(id)
      }

      const removeQuantity = id => {
        decrementCartItemQuantity(id)
      }

      if (cartList.length === 0) {
        return (
          <>
            <Navbar />

            <div className='cart-heading-container'>
              <h1>Cart Details</h1>
              <button type='submit' className='add-cart-button'>
                Remove All
              </button>
            </div>

            <div className='no-cart-container'>
              <img
                src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png'
                alt='empty view'
              />
              <p className='empty-para'>Your cart is Empty.</p>
            </div>
          </>
        )
      }

      return (
        <>
          <Navbar />

          <div className='cart-heading-container'>
            <h1>Cart Details</h1>
            <button
              type='submit'
              className='add-cart-button'
              onClick={() => removeAllCartItems()}
            >
              Remove All
            </button>
          </div>

          <div className='no-cart-container'>
            <ul className='cart-list-container'>
              {cartList.map(eachValue => (
                <li className='cart-list-element' key={eachValue.dish_id}>
                  <img
                    src={eachValue.dish_image}
                    alt={eachValue.dish_name}
                    className='img-el'
                  />
                  <div>
                    <p>{eachValue.dish_name}</p>
                    <p>
                      {eachValue.dish_currency}{' '}
                      {eachValue.quantity * eachValue.dish_price}
                    </p>
                  </div>

                  <div className='add-remove-container'>
                    <button
                      type='submit'
                      className='add-remove-button remove-button'
                      onClick={() => removeQuantity(eachValue.dish_id)}
                    >
                      -
                    </button>
                    <p className='span-button'>{eachValue.quantity}</p>
                    <button
                      type='submit'
                      className='add-remove-button add-button'
                      onClick={() => addQuantity(eachValue.dish_id)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type='submit'
                    className='remove-btn'
                    onClick={() => removeCartItem(eachValue.dish_id)}
                  >
                    <FaRegTrashAlt />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )
    }}
  </RestaurantContext.Consumer>
)

export default Cart
