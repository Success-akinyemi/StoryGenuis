import { Link } from 'react-router-dom'
import './Name.css'

function Name({ size }) {
  return (
    <div className='name'>
        <Link className='link' to='/'>
        <h1 style={{fontSize: size ? `${size}px` : '16'}}>Story<span className='gradient-text'>Genuis</span></h1>
        </Link>
    </div>
  )
}

export default Name