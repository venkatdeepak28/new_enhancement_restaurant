import {withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import RestaurantContext from '../../context'

const Navbar = props => (
  <RestaurantContext.Consumer>
    {value => {
      const {resName, cartList} = value
      const {history} = props

      const logout = () => {
        Cookie.remove('jwt_token')
        history.replace('/login')
        window.location.reload()
      }

      const changeCart = () => {
        history.push('/cart')
      }

      const changeHome = () => {
        history.push('/')
      }

      return (
        <div className='nav-container'>
          <button type='submit' className='res-name' onClick={changeHome}>
            <p>{resName}</p>
          </button>

          <div className='order-container'>
            <p className='order-para'>My Orders</p>
            <button className='cart-container' onClick={changeCart}>
              <AiOutlineShoppingCart className='nav-logo' size={50} />
              <span className='value-span'>{cartList.length}</span>
            </button>
            <button type='submit' onClick={logout} className='logout-button'>
              Logout
            </button>
          </div>
        </div>
      )
    }}
  </RestaurantContext.Consumer>
)

export default withRouter(Navbar)
