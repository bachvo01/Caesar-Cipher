import React from 'react'
import { useState, useEffect, useRef } from 'react'

function Highlighter(props) {
    const input = props.string
    const speed = props.speed
    const updateComparison = props.updateComparison
    const updateDone = props.updateDone
    const updateClicked = props.updateClicked



    // Highlighted index
    const [highlighted, setHighlighted] = useState(0)
    
    // Previous Index
    const [prevIdx, setPrevIdx] = useState(-1)

    // Current Index
    const [currentIdx, setCurrentIdx] = useState(-1)

    const [status, setStatus] = useState(false)
    useEffect(() => {
      const timer = setInterval(() => {
        setPrevIdx(currentIdx)
        setCurrentIdx(prevIndex => {
          // console.log(prevIndex + " " + input.length)
          updateComparison(prevIndex + 1, input.charAt(prevIndex + 1))
          if(prevIndex === input.length - 1 && updateDone){
            updateDone(true)
            console.log(prevIdx)
            // updateClicked(false)
            // return
          }
          return prevIndex < input.length - 1 ? prevIndex + 1 : prevIndex
        })
      }, speed)

      return () => {
        clearInterval(timer)
      }
    }, [input, speed, currentIdx])
    
    
    return (
      <div className='input-highlight-container' >
        <p className='para' id='input'>
          {
            input.split("").map((char, index) => {
              if(prevIdx + 1 === input.length){
                return (
                  <span key={index} className={""}>{char}</span>
                )
              }
              return(
                <span key={index} className={index === currentIdx ? "highlight" : ""} style={index === prevIdx ? { backgroundColor: "transparent"} : null}>{char}</span>
              )
            })
          }
        </p>
      </div>
      
      
      // <div>{highlighted}</div>
    )
}

export default Highlighter