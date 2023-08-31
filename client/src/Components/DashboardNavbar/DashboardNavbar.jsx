import { Link, useNavigate } from 'react-router-dom';
import './DashboardNavbar.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Name from '../Name/Name';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function DashboardNavbar({ onClickStoryAi, onClickUpgradeToPro }) {
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false);

    const handleSignOut = () => {
        localStorage.removeItem('token')
        navigate('/')
    }
  return (
    <div className='dashboardNavbar'>
        <div className="container dashNav">
            <div className="logo">
                <Name size={25} />
                <Link className='link' to='/stories'>Your Stories</Link>
            </div>

            <div className={`menu ${menuOpen ? 'menu-open' : ''}`}>
            <CloseIcon className='closeBtn' onClick={() => setMenuOpen((prev)=>!prev)} />
                <Link className='link outer button' onClick={onClickStoryAi}>
                    <button>Create Your Ai Story</button>
                    <span></span>
                    <span></span>
                </Link>
                <Link className='link outer2 button2' onClick={onClickUpgradeToPro}>
                    <button>Upgrade to Pro</button>
                    <span></span>
                    <span></span>
                </Link>
                <Link to='/login' className='link signout' onClick={handleSignOut}>
                    <span><h4 href="#"></h4></span>
                </Link>
                <Link to='/profile' className='link'><AccountCircleIcon /></Link>
            </div>
            <div className='menuBtn' onClick={() => setMenuOpen((prev)=>!prev)}>
                <MenuIcon className='menuIcon' />
          </div>
        </div>
    </div>
  )
}

export default DashboardNavbar