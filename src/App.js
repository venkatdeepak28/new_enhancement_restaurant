import {Component} from 'react'
import { AiOutlineShoppingCart } from "react-icons/ai";
import Card from './components/Card'
import './App.css';

class App extends Component {
  state = {resName: "", menuList: [], activeValue: "11", cart: 0}
  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const url = "https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details"
    const response = await fetch(url)
    const data = await response.json()

    this.setState({resName: data[0].restaurant_name, menuList: data[0].table_menu_list})
  }

  changeValue = value => {
    this.setState({activeValue: value})
  }

  removeonCart = () => {
    this.setState(prevState => ({cart: prevState.cart - 1}))
  }

  addonCart = () => {
    this.setState(prevState => ({cart: prevState.cart + 1}))
  }


  render() {

  const {resName, menuList, activeValue, cart} = this.state

    return (
      <>
        <div className='nav-container'>
          <p className='res-name'>{resName}</p>

          <div className='order-container'>
            <p className='order-para'>My Orders</p>
            <div className='cart-container'>
              <AiOutlineShoppingCart className='nav-logo' size={50} />
              <span className='value-span'>{cart}</span>
            </div>
          </div>
        </div>
        
          <div className='button-container'>
            {menuList.map(eachValue => (
              <button type="submit" key={eachValue.menu_category_id} className={`${eachValue.menu_category_id === activeValue ? "selected": "custom-btn"} `} onClick={() => this.changeValue(eachValue.menu_category_id)}>
                {eachValue.menu_category}
              </button>
            ))}
          </div>
            
          <Card menuList={menuList} activeValue={activeValue} addonCart={this.addonCart} removeonCart={this.removeonCart} />
      </>
    )
  }
}

export default App;
