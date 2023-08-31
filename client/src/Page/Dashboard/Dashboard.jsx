import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import {useFetch} from '../../hooks/fetch.hook'
import  { Toaster } from 'react-hot-toast'
import DashboardNavbar from '../../Components/DashboardNavbar/DashboardNavbar'
import { dashboardtext } from '../../data/dashboardtext'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Link } from 'react-router-dom'
import StoryAiPopup from '../../Components/Helpers/StoryAiPopup/StoryAiPopup'
import UpgradeToPro from '../../Components/Helpers/UpgradeToPro/UpgradeToPro'
import CreateStory from '../../Components/Helpers/CreateStory/CreateStory'


function Dashboard() {
  const [greeting, setGreeting] = useState('')
  const [selectedCard, setSelectedCard] = useState(null)

  const { apiData, isLoading, serverError } = useFetch()
  const userEmailAddres = apiData?.email


    //for geting time
    useEffect(() => {
      const today = new Date();
      const currentHour = today.getHours();
      //console.log('time', currentHour)
    
      let newGreeting = '';
      if (currentHour >= 5 && currentHour < 12) {
        newGreeting = 'Good Morning 🌻';
      } else if (currentHour >= 12 && currentHour < 18) {
        newGreeting = 'Good Afternoon 🌞';
      } else {
        newGreeting = 'Good Evening 🌅';
      }
    
      setGreeting(newGreeting);
    }, []);




    const renderPopupComponent = () => {
      switch (selectedCard) {
        case 'storyai':
          return (
            <div>
              <StoryAiPopup onClickCreateStory={() => setSelectedCard('createStory')} />
            </div>
          );
        case 'upgradeToPro':
          return (
            <div>
              <UpgradeToPro />
            </div>
          );
        case 'createStory':
          return (
            <div>
              <CreateStory />
            </div>
          );
      
        default:
          return null;
      }
    };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains('popup-overlay')) {
        setSelectedCard(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const closePopup = () => {
    setSelectedCard(null);
  };

  if(isLoading) return <h1>isLoading</h1>
  if(serverError) return <h1>{serverError.message}</h1>

  return (
    <div className='dashboard'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>

      {selectedCard && (
        <>
          <div className='popup-overlay' onClick={closePopup}></div>
          <div className={`popup active`}>
              <span className='popup-close' onClick={closePopup}>
                Close
              </span>
            <div className='popup-content'>
                {renderPopupComponent()}
            </div>
          </div>
        </>
      )}

      <DashboardNavbar 
        onClickStoryAi={() => setSelectedCard('storyai')}
        onClickUpgradeToPro={() => setSelectedCard('upgradeToPro')}
      />
      
      <div className="content">
      <h2>{greeting},<span> {apiData.username}</span></h2>

      <div className="container">
        <AutoFixHighIcon className='wand'/>
        <h2>Create Beautiful Stories With AI</h2>
        
        {
          dashboardtext.map((text, idx) => (
            <p key={idx}><b>{text.title}</b> {text.text}</p>
          ))
        }

        <Link className='link outer button' onClick={() => setSelectedCard('storyai')}>
          <button>Create Your Ai Story</button>
          <span></span>
          <span></span>
        </Link>
      </div>

      </div>
    </div>
  )
}

export default Dashboard