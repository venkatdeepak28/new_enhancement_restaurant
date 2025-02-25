import {useState} from 'react'
import RestaurantContext from '../../context'
import './index.css'

const Card = () => {
  const [cart, addCart] = useState([])

  return (
    <RestaurantContext.Consumer>
      {value => {
        const {activeValue, menuList, addCartItem} = value

        const newArr = menuList.filter(
          eachValue => eachValue.menu_category_id === activeValue,
        )

        const removeValue = value => {
          const indexValue = cart.lastIndexOf(value)

          if (indexValue >= 0) {
            const arr = cart.filter((el, index) => index !== indexValue)
            addCart(arr)
          }
        }

        const addonValue = value => {
          addCart(prevState => [...prevState, value])
        }

        const addItem = obj => {
          const arr = cart.filter(num => num === obj.dish_id).length
          addCartItem(obj, arr)
        }

        if (newArr.length !== 0) {
          return (
            <ul className='list-container'>
              {newArr[0].category_dishes.map(eachValue => (
                <li key={eachValue.dish_id} className='list-value'>
                  <div className='main-container'>
                    <div className='inner-container'>
                      <p className='dish-name'>{eachValue.dish_name}</p>
                      <p className='dish-price'>
                        {eachValue.dish_currency} {eachValue.dish_price}
                      </p>
                      <p className='description-para'>
                        {eachValue.dish_description}
                      </p>

                      {eachValue.dish_Availability ? (
                        <div className='add-remove-container'>
                          <button
                            type='submit'
                            className='add-remove-button remove-button'
                            onClick={() => removeValue(eachValue.dish_id)}
                          >
                            -
                          </button>
                          <p className='span-button'>
                            {cart.filter(id => id === eachValue.dish_id).length}
                          </p>
                          <button
                            type='submit'
                            className='add-remove-button add-button'
                            onClick={() => addonValue(eachValue.dish_id)}
                          >
                            +
                          </button>
                        </div>
                      ) : null}

                      {cart.filter(num => num === eachValue.dish_id).length >
                      0 ? (
                        <button type='submit' className='add-cart-button' onClick={() => addItem(eachValue)}>
                          Add on Cart
                        </button>
                      ) : null}

                      <p className='available-para'>
                        {eachValue.dish_Availability === false
                          ? 'Not Available'
                          : ''}
                      </p>
                      <p className='custom-para'>
                        {eachValue.addonCat.length !== 0
                          ? 'Customizations available'
                          : ''}
                      </p>
                    </div>
                    <div>
                      <p className='calories-para'>
                        {eachValue.dish_calories} calories
                      </p>
                    </div>
                    <div>
                      <img
                        src={eachValue.dish_image}
                        alt={eachValue.dish_name}
                        className='img-el'
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )
        }

        return null
      }}
    </RestaurantContext.Consumer>
  )
}

export default Card
