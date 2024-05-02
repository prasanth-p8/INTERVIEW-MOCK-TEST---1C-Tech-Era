import {Link} from 'react-router-dom'

const Header = () => (
  <Link to="/">
    <img
      className="website-logo"
      src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
      alt="website logo"
    />
  </Link>
)

export default Header
