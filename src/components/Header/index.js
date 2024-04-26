import {Link} from 'react-router-dom'

import {WebsiteLogo} from './styledComponents'

const Header = () => (
  <Link to="/">
    <WebsiteLogo
      src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
      alt="website logo"
    />
  </Link>
)

export default Header
