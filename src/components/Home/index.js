import Card from '../Card'
import Navbar from '../Navbar'
import RestaurantContext from '../../context'

const Home = () => (
  <RestaurantContext.Consumer>
    {value => {
      const {menuList, activeValue, changeValue} = value

      const changeTab = num => {
        changeValue(num)
      }

      return (
        <>
          <Navbar />

          <div className='button-container'>
            {menuList.map(eachValue => (
              <button
                type='submit'
                key={eachValue.menu_category_id}
                className={`${
                  eachValue.menu_category_id === activeValue
                    ? 'selected'
                    : 'custom-btn'
                } `}
                onClick={() => changeTab(eachValue.menu_category_id)}
              >
                {eachValue.menu_category}
              </button>
            ))}
          </div>

          <Card />
        </>
      )
    }}
  </RestaurantContext.Consumer>
)

export default Home
