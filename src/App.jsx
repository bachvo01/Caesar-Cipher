import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import { caesarCipher } from './function/CaesarCipher'
import { shift } from './function/Shift'
import Highlighter from './function/Highlighter'
import { GiTortoise } from "react-icons/gi"
import { GiRabbit } from "react-icons/gi";
import Typewriter from './function/Typewriter'
function App() {
  const alphabet = ["A", "B", "C" ,"D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  const [mapped, setMapped] = useState([])
  const [input, setInput] = useState("")
  const [step, setStep] = useState(0)
  const [output, setOutput] = useState("")
  const [isClicked, setIsClicked] = useState(false)
  const [alphaOne, setAlphaOne] = useState({
    index : 0,
    char : ""
  })

  const [alphaTwo, setAlphaTwo] = useState({
    index : 0,
    char : ""
  })

  const [selectedOption, setSelectedOption] = useState(350)

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value)
  }

  const updateInput = (idx, c) => {
    setAlphaOne({
      index : idx,
      char : c
    })
  }

  const updateOutput = (idx, c) => {
    setAlphaTwo({
      index : idx,
      char : c
    })
  }
  const updateClicked = (value) => {
    setIsClicked(value)
  }

  const handleReset = () => {
    setMapped([])
    setInput("")
    setOutput("")
    setIsClicked(false)
    setSelectedOption(350)
    setStep(0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setMapped(shift(alphabet, step))
    setOutput(caesarCipher(input, step))
    setIsClicked(true)
  }

  return (
    <div className='main-container'>
      <div className='main-inner'>
        <div className='cipher-container'>
          <div className='fact-container'>
            <h1 className='name'>Caesar Cipher</h1>
            <p className='para'>The Caesar Cipher, named after Julius Caesar who reputedly used it, is one of the simplest and earliest known encryption techniques. It operates by shifting each letter of the plaintext a fixed number of positions down or up the alphabet. For instance, with a shift of 3, "A" becomes "D", "B" becomes "E", and so on.<br></br><br></br>Despite its elementary nature, the Caesar Cipher provides a basic level of secrecy, suitable for casual communication or educational purposes. However, due to its predictable nature and vulnerability to brute-force attacks, it is not considered secure for modern cryptographic needs.</p>
          </div>
          <div className='computing-container'>
            <div className='alphabet-container'>
              {
                alphabet.map((letter, index) => {
                  if(letter === alphaOne.char.toUpperCase()){
                    return(
                      <h1 key={index} className='letter highlighted'>{letter}</h1>
                    )
                  }
                  else{
                    return(
                      <h1 key={index} className='letter'>{letter}</h1>
                    )
                  }
                  
                })
              }
            </div>
            <div className='mapped-container'>
              {
                mapped.length > 0 && mapped.map((letter, index) => {
                  if(letter === alphaTwo.char.toUpperCase()){
                    return(
                      <h1 key={index} className='letter highlighted'>{letter}</h1>
                    )
                  }
                  return(
                    <h1 key={index} className='letter'>{letter}</h1>
                  )
                })
              }
              
              
            </div>
            <form onSubmit={handleSubmit} className='form-container'>
              <div className='input-container'>
                <div className='row one'>
                  <label htmlFor = 'text-input'>Input text:</label>
                  {
                    isClicked === false && <textarea id = 'text-input' type='textarea' rows={5} onChange={(e) => {setInput(e.target.value)}} value={input}></textarea>
                  }                    
                  {
                    isClicked && <Highlighter string = {input} speed ={selectedOption} updateClicked = {updateClicked} updateComparison = {updateInput}></Highlighter>
                  }
     
                </div>
                <div className='row two'>
                  <label htmlFor='text-area'>Output text:</label>
                  {
                    isClicked === false && <textarea id='text-area' name='textarea' rows={5} value={output} onChange={e => setOutput(e.target.value)}>{output}</textarea>
                  }
                  {/* {
                    output && <Typewriter text={output} speed={selectedOption}></Typewriter>
                  } */}
                  {
                    output && <Highlighter string = {output} speed ={selectedOption} updateClicked = {updateClicked} updateComparison = {updateOutput}></Highlighter>
                  }
                </div>
              </div>
              <div className='output-container'>
                  <div className='column two'>
                    <label>Encryption speed:</label>
                    <div className='option-container'>
                      <div className='turtle'>
                        <GiTortoise className='icon'></GiTortoise>
                      </div>
                      <div className='option-list'>
                        <label className='option'>
                          <input type='radio' name='speed' value={1000} id='level-one' onChange={handleOptionChange}></input>
                          <span className="checkmark"></span>
                        </label>
                        <label className='option'>
                        <input type='radio' name='speed' value={500} id='level-two' onChange={handleOptionChange}></input>
                          <span className="checkmark"></span>
                        </label>
                        <label className='option'>
                          <input type='radio' name='speed' value={200} id='level-three'  onChange={handleOptionChange}></input>
                          <span className="checkmark"></span>
                        </label>
                        <label className='option'>
                          <input type='radio' name='speed' value={100} id='level-four'  onChange={handleOptionChange}></input>
                          <span className="checkmark"></span>
                        </label>
                        <label className='option'>
                          <input type='radio' name='speed' value={10}  id='level-five'  onChange={handleOptionChange}></input>
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className='bunny'>
                        <GiRabbit className='icon'></GiRabbit>
                      </div>
                    </div>
                  </div>
                  <div className='column one'>
                    <label htmlFor = 'shift'>Shift step:</label>
                    <input type='number' min="0" max="26" id='shift' onChange={(e) => {setStep(e.target.value)}} value={step}></input>
                  </div>
              </div>
              
              <div className='button-wrapper'>
                <button type='submit'>Encrypt</button>
                <button type='reset' className='reset-button' onClick={handleReset}>Reset</button>
              </div>
              
            </form>
            {/* <p>Selected option : {selectedOption}</p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
