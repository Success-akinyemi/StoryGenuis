import './App.css';
import Home from './Page/Home/Home';
import Profile from './Page/Profile/Profile'
import Login from './Components/Login/Login';
import Password from './Components/Password/Password';
import Signup from './Components/Signup/Signup';
import Otp from './Components/OTP/Otp';
import PasswordReset from './Components/PasswordReset/PasswordReset';
import Dashboard from './Page/Dashboard/Dashboard';
import { BrowserRouter, Routes, Route} from 'react-router-dom'

/**Auth middleware */
import { AuthorizeUser,ProtectRoute } from './middleware/auth'
import Stories from './Page/Stories/Stories';
import StoryPage from './Page/StoryPage/StoryPage';


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/passwordReset' element={<ProtectRoute><PasswordReset /></ProtectRoute>} />
          <Route path='/password' element={<ProtectRoute><Password /></ProtectRoute>}/>
          <Route path='/getOTP' element={<Otp />}/>
          <Route path='/dashboard' element={<AuthorizeUser><Dashboard /></AuthorizeUser>}/>
          <Route path='/stories' element={<AuthorizeUser><Stories /></AuthorizeUser>}/>
          <Route path='/readStory/:id' element={<AuthorizeUser><StoryPage /></AuthorizeUser>}/>
          <Route path='/profile' element={<AuthorizeUser><Profile /></AuthorizeUser>}/>
          <Route path='/' element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
