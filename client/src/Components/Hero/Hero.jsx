import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  const [animationStep, setAnimationStep] = useState(0);
  const animationSteps = [" Interactive ", " Powerful ", " Engrossing ", " Dynamic ", " Immersive "];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prevStep) => (prevStep + 1) % animationSteps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='hero'>
        <div className="container hero-container">
            <div className="content">
              <h2>Create <span data-content={animationSteps[animationStep]} className="changecontent">{animationSteps[animationStep]}</span> Stories Powered by AI</h2>
              <p>Utilize AI Magic Power to Shape Customized Content, Immerse Yourself in Character Interaction, and Breathe Life into your Stories!</p>
              <span className="btn">
                  <Link to='/signup' className='link getBtn'><span>Get Started</span><i></i></Link>
              </span>
            </div>
            <div className="overlay"></div>
        </div>
    </div>
  )
}

export default Hero