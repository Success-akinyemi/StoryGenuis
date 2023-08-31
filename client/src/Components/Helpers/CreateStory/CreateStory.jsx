import { Link } from 'react-router-dom'
import './CreateStory.css'
import { useEffect, useState } from 'react'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { EducationGenre, EducationalPlaceHolder, FictionGenre, FictionPlaceHolder, Languages, NonFictionGenre, NonFictionPlaceHolder, readerAge, writingStyle } from '../../../data/createStory';
import { generateStory } from '../../../helpers/helper';
import WaveLoader from '../WaveLoader/WaveLoader';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useFetch } from '../../../hooks/fetch.hook';

function CreateStory() {
    const [chapters, setchapters] = useState('')
    const [credit, setCredit] = useState(20)
    const [selectedCard, setSelectedCard] = useState('Fiction')
    const [plot, setPlot] = useState('')
    const [language, setLanguage] = useState(Languages[0].text)
    const [readersAge, setReadersAge] = useState(readerAge[0].text)
    const [genre, setGenre] = useState('')
    const [writingPattern, setWritingPattern] = useState(writingStyle[0].text)
    const [isLoadingApi, setIsLoadingApi] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [story, setStory] = useState('')
    const { FictionText } = FictionPlaceHolder
    const { NonFictionText } = NonFictionPlaceHolder
    const { EducationText } = EducationalPlaceHolder

    const { apiData, isLoading, serverError } = useFetch()
    const userEmail = apiData?.email

    useEffect(() => {
        if (selectedCard === 'Fiction') {
            setGenre(FictionGenre[0].text);
        } else if (selectedCard === 'Non-Fiction') {
            setGenre(NonFictionGenre[0].text);
        } else if (selectedCard === 'Educational') {
            setGenre(EducationGenre[0].text);
        }
    }, [selectedCard]);

    const neededCredit = (numChapters) => {
        const creditPerChapter = 20
        const totalCredit = numChapters * creditPerChapter
        setCredit(totalCredit)
    }

    useEffect(() => {
        const inputChapters = chapters === '' ? 1 : parseInt(chapters)
        neededCredit(inputChapters)
    }, [chapters])

    useEffect(() => {
        const areFieldsEmpty = plot === '' || language === '' || readersAge === '' || genre === '' || writingPattern === ''
        setIsButtonDisabled(areFieldsEmpty)
    }, [plot, language, readersAge, genre, writingPattern])

    const handleGenerateStory = async (e) => {
        e.preventDefault()

        try {
            //console.log(selectedCard, plot, language, readersAge, genre, writingPattern, chapters)
            setIsLoadingApi(true)
            const generatedStory = await generateStory({selectedCard, plot, language, readersAge, genre, writingPattern, chapters, userEmail})
            setStory(generatedStory)
        } catch (error) {
            console.log(error)
        } finally{
            setIsLoadingApi(false)
        }
    }

  return (
    <div className='createStory'>
        <h2>Create Your AI Story</h2>
        <span className='balance'>
            <p>your credit balance: 100</p>
            <Link className='link'>Top Up</Link>
        </span>

        <div className="cards">
            <div 
                className={`card ${selectedCard === 'Fiction' ? `selected` : ''}`}
                onClick={() => setSelectedCard('Fiction')}
            >
                Fiction
            </div>
            <div 
                className={`card ${selectedCard === 'Non-Fiction' ? `selected` :  ''}`}
                onClick={() => setSelectedCard('Non-Fiction')}
            >
                Non-Fiction
            </div>
            <div 
                className={`card ${selectedCard === 'Educational' ? `selected` : ''}`}
                onClick={() => setSelectedCard('Educational')}
            >
                Educational
            </div>
        </div>

        <textarea
            placeholder={selectedCard === 'Fiction' ? `${FictionText}` : selectedCard === 'Non-Fiction' ? `${NonFictionText}` : `${EducationText}`}
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
        >

        </textarea>

        <div className="selectOpt">
            <div className="select">
                <span>Language:</span>
                <select value={language} onChange={(e => setLanguage(e.target.value))}>
                        {Languages.map((item, idx) => 
                        <option key={idx} value={item.text}>
                            {item.text}
                        </option>
                        )}
                </select>
            </div>

            <div className="select">
                <span>Genre:</span>
                <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                    {
                        selectedCard === 'Fiction' && 
                            FictionGenre.map((item, idx) => (
                                <option key={idx} value={item.text}>{item.text}</option>
                            ))
                    }

                    {
                        selectedCard === 'Non-Fiction' && 
                            NonFictionGenre.map((item, idx) => (
                                <option key={idx} value={item.text}>{item.text}</option>
                            ))
                    }

                    {
                        selectedCard === 'Educational' && 
                            EducationGenre.map((item, idx) => (
                                <option key={idx} value={item.text}>{item.text}</option>
                            ))
                    }
                </select>
            </div>
        </div>

        <div className="selectOpt">
            <div className="select">
                <span>Readers Age:</span>
                <select value={readersAge} onChange={(e) => {setReadersAge(e.target.value)}}>
                    {
                        readerAge.map((item, idx) => 
                            <option value={item.text} key={item.text}>{item.text}</option>
                        )
                    }
                </select>
            </div>

            <div className="select">
                <span>Writing Style:</span>
                <select value={writingPattern} onChange={(e) => setWritingPattern(e.target.value)}>
                    {
                        writingStyle.map((item, idx) => 
                            <option key={idx} value={item.text}>{item.text}</option>
                        )
                    }
                </select>
            </div>
        </div>

        <div className="more">
            <span>Advanced AI Story Wizard <button type="checkbox"></button></span>
        </div>

        <div className="chapters">
            <p>Number of Chapters</p>
            <input 
                type="number" 
                placeholder='Number of chapters E.g: 2' 
                value={chapters}
                onChange={(e) => setchapters(e.target.value)
                }
            />
        </div>

        <div className="required-credit">
            Number of Connect Required: {credit}
        </div>
        
        <div className="btn">
            {
                isLoadingApi ? (
                    <WaveLoader />
                )
                : story ? (
                    <div className='storyDiv'><span className='storyBtn'><Link className='link' to='/stories'>Your Story is Ready Click to view <span className='innerSpan'><ArrowForwardIcon className='icon' /></span></Link></span></div>
                ) :
                (
                <button 
                    onClick={handleGenerateStory} 
                    disabled={isButtonDisabled}
                    style={{background: isButtonDisabled ? 'rgb(149, 77, 149)' : 'rgb(225, 5, 225)'}}
                >
                    <AutoAwesomeIcon  />
                    <span>Generate Story</span>
                </button>
                )
            }

        </div>


    </div>
  )
}

export default CreateStory