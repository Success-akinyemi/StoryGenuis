import { useLocation } from 'react-router-dom'
import './StoryPage.css'
import { useFetchSpecificStory } from '../../hooks/fetch.hook'
import DashboardNavbar from '../../Components/DashboardNavbar/DashboardNavbar'

function StoryPage() {
    const location = useLocation()
    const id = location.pathname.split('/')[2]

    const { isLoadingStory, storyData, storyStatus, serverErrorStory} = useFetchSpecificStory(id)
  return (
    <div className='container storyPage'>
        <DashboardNavbar />
        <h2>Story Page</h2>

        <p>{storyData?.story}</p>
    </div>
  )
}

export default StoryPage