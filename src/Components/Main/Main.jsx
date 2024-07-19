import React, { useContext, useRef } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'
import { prompts_tour_box, prompts_idea_box, prompts_college_box, prompts_coding_box } from './helper'

const Main = () => {

    const { input, setInput, recentPrompt, showResult, loading, resultData, onSent, isDarkMode, setIsDarkMode, newChat } = useContext(Context);
    const inputRef = useRef(null);

    const onDivClick = (array) => {
        const index = Math.floor(Math.random() * array.length);
        const string = array[index];
        setInput(string);
        inputRef.current.focus();
    };

    const handleKeyDown = async (e) => {
        if(e.key === "Enter"){
            onSent();
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
    };

  return (
    <>
        <div className={`${isDarkMode ? 'main dark-mode' : 'main'}`}>
            <div className="nav">
                <img className='mobile' src={isDarkMode ? assets.setting_icon_dark : assets.setting_icon} alt="theme" onClick={toggleDarkMode}/>
                <p onClick={newChat}>Gemini - Clone</p>
                <img src={assets.user_icon} alt="user" />
            </div>

            <div className="main-container">
                {!showResult 
                ?
                <>
                    <div className="greet">
                        <p> <span>Hello, Tanmay.</span> </p>
                        <p>How can I help you today?</p>
                    </div>

                    <div className="cards">
                        <div className="card" onClick={() => onDivClick(prompts_tour_box)}>
                            <p>Surprise me - Tours and Tourists</p>
                            <img src={isDarkMode ? assets.compass_icon_dark : assets.compass_icon} alt="travel" />
                        </div>

                        <div className="card" onClick={() => onDivClick(prompts_idea_box)}>
                            <p>Surprise me - Innovation and Ideas</p>
                            <img src={isDarkMode ? assets.bulb_icon_dark : assets.bulb_icon} alt="travel" />
                        </div>

                        <div className="card" onClick={() =>onDivClick(prompts_college_box)}>
                            <p>Surprise Me - College and Netowrking</p>
                            <img src={isDarkMode ? assets.message_icon_dark : assets.message_icon} alt="travel" />
                        </div>

                        <div className="card" onClick={() => onDivClick(prompts_coding_box)}>
                            <p>Surprise Me - Programming</p>
                            <img src={isDarkMode ? assets.code_icon_dark : assets.code_icon} alt="travel" />
                        </div>
                    </div>
                </>
                :
                <div className='result'>
                    <div className="result-title">
                        <img src={assets.user_icon} alt="user" />
                        <p>{recentPrompt}</p>
                    </div>

                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="user" />

                        {loading 
                        ? 
                        <div className="loader">
                            <hr />
                            <hr />
                            <hr />
                        </div>
                        : 
                        <p dangerouslySetInnerHTML={{__html: resultData}}></p>
                        }
                    </div>
                </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input 
                            onChange={(e) => setInput(e.target.value)} 
                            value={input} 
                            type="text" 
                            placeholder='Enter a prompt here'
                            onKeyDown={handleKeyDown}
                            ref = {inputRef}
                        />

                        <div>
                            {input && <img src={isDarkMode ? assets.send_icon_dark : assets.send_icon} alt="send" onClick={() => onSent()} />}
                        </div>
                    </div>

                    <p className="bottom-info">
                        Gemini-Clone may display inaccurate info, including about people, so double-check its responses.
                    </p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Main