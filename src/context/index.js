import {createContext} from 'react'

const RestaurantContext = createContext({
  resName: '',
  menuList: [],
  activeValue: '11',
  cartList: [],
  changeValue: () => {},
  removeCartItem: () => {},
  addCartItem: () => {},
  removeAllCartItems: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default RestaurantContext
