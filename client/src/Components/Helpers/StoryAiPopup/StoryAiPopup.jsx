import { Link } from 'react-router-dom'
import './StoryAiPopup.css'
import Stroy1Img from '../../../assest/story1.jpg'
import Stroy2Img from '../../../assest/story2.jpg'


function StoryAiPopup({ onClickCreateStory }) {
  return (
    <div className='storyAiPopup'>
        <div className="left" onClick={onClickCreateStory}>
            <div className="img-container">
                <img src={Stroy1Img} alt='create story with ai'/>
            </div>
            <span>
                <h2>Write Short Narrative</h2>
                <p>
                Begin your narrative voyage with a simple tap. Whether delving into fiction, exploring non-fiction, or sharing educational revelations, pick your style and allow our cutting-edge Story Genuis AI to illuminate your storytelling path. Immerse yourself and witness the magic as your concise tales spring to life!
                </p>
            </span>

            <Link className='linkai btnai'>Create your AI Story</Link>

        </div>

        <div className="right">
        <div className="img-container">
                <img src={Stroy2Img} alt='create story with ai'/>
            </div>
            <span>
                <h2>Upgrade to PRO</h2>
                <p>
                Begin your narrative voyage with a simple tap. Whether delving into fiction, exploring non-fiction, or sharing educational revelations, pick your style and allow our cutting-edge Story Genuis AI to illuminate your storytelling path. Immerse yourself and witness the magic as your concise tales spring to life!
                </p>
            </span>

            <Link className='linkai btnai pro'>Upgrade to PRO</Link>
        </div>
    </div>
  )
}

export default StoryAiPopup