import { createContext, useState } from "react";
import run from "../config/gemini";
import { marked } from 'marked';

export const Context = createContext();

const ContextProvider = (props) => {

    const [isDarkMode, setIsDarkMode] = useState(true);
    const [extended, setExtended] = useState(true);
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompts, setPreviousPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (words) => {
        words.forEach((word, index) => {
            setTimeout(() => {
                setResultData(prev => prev + word + ' ');
            }, index * 30);
        });
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) => {
        setResultData("");
        setShowResult(true);
        setLoading(true);

        let markdownResponse;
        if(prompt !== undefined){
            markdownResponse = await run(prompt);
            setRecentPrompt(prompt);
            setInput("");
        }
        else{
            setPreviousPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            markdownResponse = await run(input);
            setInput("");
        }
        let preliminaryResponse = marked(markdownResponse);

        let words = preliminaryResponse.split(/\s+/);
        delayPara(words);

        setLoading(false);
    }

    const contextValue = {
        extended, 
        setExtended,
        isDarkMode,
        setIsDarkMode,
        input, 
        setInput, 
        recentPrompt,
        setRecentPrompt, 
        previousPrompts,
        setPreviousPrompts, 
        showResult, 
        setShowResult,
        loading, 
        setLoading,
        resultData, 
        setResultData,
        onSent,
        newChat,
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider