import React, { useState, useEffect } from 'react'

function Typewriter({ text, speed }) {
    const [current, setCurrent] = useState("")
    const [currentIdx, setCurrentIdx] = useState(0)
    const [prevIdx, setPrevIdx] = useState(0)


    useEffect(() => {
        if (currentIdx < text.length) {
          const timeout = setInterval(() => {
            setPrevIdx(currentIdx)
            setCurrent(prevText => prevText + text[currentIdx]);
            setCurrentIdx(prevIndex => 
                {
                    if(prevIndex === text.length){
                        return
                      }
                      return prevIndex < text.length ? prevIndex + 1 : prevIndex
                }
                );
          }, speed - 5 );
      
          return () => clearInterval(timeout);
        }
      }, [currentIdx, text]);

  return (
    <div className='message-container'>
        <p className='para'>
          {
            current.split("").map((char, index) => {
              return(
                <span key={index} className={index === currentIdx ? "highlight" : ""} style={index === prevIdx ? { backgroundColor: "transparent" } : null}>{char}</span>
              )
              
            })
          }
        </p>
    </div>
  )
}

export default Typewriter