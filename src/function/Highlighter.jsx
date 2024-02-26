import React from 'react'
import { useState, useEffect } from 'react'

function Highlighter(props) {
    const input = props.string
    const speed = props.speed
    const updateClicked = props.updateClicked
    const updateComparison = props.updateComparison
    // console.log(string)

    // Highlighted index
    const [highlighted, setHighlighted] = useState(0)
    
    // Previous Index
    const [prevIdx, setPrevIdx] = useState(-1)

    // Current Index
    const [currentIdx, setCurrentIdx] = useState(-1)

    const [char, setChar] = useState("")

    const [done, setDone] = useState(false)
    useEffect(() => {
      const timer = setInterval(() => {
        setPrevIdx(currentIdx)
        setCurrentIdx(prevIndex => {
          updateComparison(prevIndex + 1, input.charAt(prevIndex + 1))
          if(prevIndex === input.length){
            return
          }
          return prevIndex < input.length - 1 ? prevIndex + 1 : prevIndex
        })
      }, speed)

      return () => {
        
        clearInterval(timer)
      }
    }, [input, speed, currentIdx])
    
    // console.log(highlighted)
    
    return (
      <div className='input-highlight-container'>
        <p className='para'>
          {
            input.split("").map((char, index) => {
              return(
                <span key={index} className={index === currentIdx ? "highlight" : ""} style={index === prevIdx ? { backgroundColor: "transparent" } : null}>{char}</span>
              )
              
            })
          }
        </p>
      </div>
      
      
      // <div>{highlighted}</div>
    )
}

export default Highlighter