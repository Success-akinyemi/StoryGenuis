import { Link } from 'react-router-dom'
import './Navbar.css'
import Name from '../Name/Name'

function Navbar() {
  return (
    <div className='navbar'>
        <div className="container nav">
            <div className="logo">
                <Name />
            </div>

            <div className="menu">
                <Link className='link'>Pricing</Link>
                <Link to='/login' className='link'>Sign in</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar