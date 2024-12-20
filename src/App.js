import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Cart from './components/Cart'
import RestaurantContext from './context'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

class App extends Component {
  state = {
    resName: '',
    menuList: [],
    activeValue: '11',
    cartList: [],
  }
  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(url)
    const data = await response.json()

    this.setState({
      resName: data[0].restaurant_name,
      menuList: data[0].table_menu_list,
    })
  }

  changeValue = value => {
    this.setState({activeValue: value})
  }

  removeonCart = () => {
    this.setState(prevState => ({cart: prevState.cart - 1}))
  }

  addCartItem = (obj, len) => {
    const {cartList} = this.state

    const arr = cartList.filter(eachValue => eachValue.dish_id === obj.dish_id)

    if (arr.length === 0) {
      obj['quantity'] = len
      this.setState(prevState => ({cartList: [...prevState.cartList, obj]}))
    } else {
      obj['quantity'] = arr[0].quantity + len
      const newArr = cartList.filter(
        eachValue => eachValue.dish_id !== obj.dish_id,
      )

      this.setState({cartList: [...newArr, obj]})
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const arr = cartList.filter(eachValue => eachValue.dish_id !== id)
    this.setState({cartList: arr})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const arr = cartList.filter(eachValue => eachValue.dish_id === id)

    arr[0].quantity += 1

    const remainingArr = cartList.filter(eachValue => eachValue.dish_id !== id)

    console.log(...remainingArr, arr)

    this.setState({cartList: [...remainingArr, arr[0]]})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const arr = cartList.filter(eachValue => eachValue.dish_id === id)

    arr[0].quantity -= 1

    if (arr[0].quantity === 0) {
      this.removeCartItem(id)
    } else {
      const remainingArr = cartList.filter(
        eachValue => eachValue.dish_id !== id,
      )

      console.log(...remainingArr, arr)

      this.setState({cartList: [...remainingArr, arr[0]]})
    }
  }

  render() {
    const {resName, menuList, activeValue, cartList} = this.state

    return (
      <RestaurantContext.Provider
        value={{
          resName,
          menuList,
          activeValue,
          cartList,
          addCartItem: this.addCartItem,
          changeValue: this.changeValue,
          removeAllCartItems: this.removeAllCartItems,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path='/login' component={Login} />
          <ProtectedRoute exact path='/' component={Home} />
          <ProtectedRoute exact path='/cart' component={Cart} />
        </Switch>
      </RestaurantContext.Provider>
    )
  }
}

export default App
