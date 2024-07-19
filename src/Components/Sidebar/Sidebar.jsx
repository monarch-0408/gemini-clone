import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context';

const Sidebar = () => {

    const { onSent, previousPrompts, setRecentPrompt, newChat, isDarkMode, setIsDarkMode, extended, setExtended } = useContext(Context);

    const loadPrompt = async (prompt) => {
        await onSent(prompt);
    }

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
    }

  return (
    <div className={`${isDarkMode ? 'sidebar dark-mode' : 'sidebar'}`}>
        <div className="top">
            <img className="menu" src={isDarkMode ? assets.menu_icon_dark : assets.menu_icon} alt="menu" onClick={() => setExtended(prev => !prev)} />

            <div onClick={() => newChat()} className="new-chat">
                <img src={assets.plus_icon} alt="new chat" />
                { extended && <p>New Chat</p> }
            </div>

            {extended &&
            <div className="recent">
                <p className="recent-title">Recent</p>
                {previousPrompts.map(
                    (item, index) => {
                        return(
                            <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                                <img src={isDarkMode ? assets.message_icon_dark : assets.message_icon} alt="chat" />
                                <p>{item.slice(0, 18)}...</p>
                            </div>
                        )
                    }
                )}
            </div> 
            }
        </div>

        <div className="bottom">
            <div className="bottom-item dark-button" onClick={toggleDarkMode}>
                <img src={isDarkMode ? assets.setting_icon_dark : assets.setting_icon} alt="theme" />
                {extended && <p>{isDarkMode ? 'Dark' : 'Light'} Mode</p>}
            </div>
        </div>
    </div>
  )
}

export default Sidebar