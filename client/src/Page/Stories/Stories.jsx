import { Link } from 'react-router-dom'
import { useFetchStories } from '../../hooks/fetch.hook'
import './Stories.css'
import DashboardNavbar from '../../Components/DashboardNavbar/DashboardNavbar'

function Stories() {

const { isLoadingStories, storiesData, storiesStatus, serverErrorStories } = useFetchStories()
  
if(isLoadingStories) return <h1>isLoading</h1>
if(serverErrorStories) return <h1>{serverErrorStories.message}</h1>
return (
    <div className='container stories'>
        <DashboardNavbar />
        <h2>Your Stories</h2>

        <div className="storyCards">
          {storiesData && storiesData.map((item, idx) => (
          <div className='card' key={item._id}>
            <Link to={`/readStory/${item._id}`} className='link'>
              <p>{item.story}</p>
            <span>Read More</span>
            </Link>
          </div>
        ))}
        </div>
    </div>
  )
}

export default Stories