import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import { caesarCipher } from './function/CaesarCipher'
import { shift } from './function/Shift'

function App() {
  const alphabet = ["A", "B", "C" ,"D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  const [mapped, setMapped] = useState([])
  const [input, setInput] = useState("")
  const [step, setStep] = useState(0)
  const [output, setOutput] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(input)
    console.log(caesarCipher(input, step))
    console.log(shift(alphabet, step))
    setMapped(shift(alphabet, step))
    setOutput(caesarCipher(input, step))
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
                  return(
                    <h1 key={index} className='letter'>{letter}</h1>
                  )
                })
              }
            </div>
            <div className='mapped-container'>
              {
                mapped.length > 0 && mapped.map((letter, index) => {
                  return(
                    <h1 key={index} className='letter'>{letter}</h1>
                  )
                })
              }
            </div>
            <form onSubmit={handleSubmit} className='form-container'>
              <div className='input-container'>
                <div className='row'>
                  <label htmlFor = 'input'>Input text:</label>
                  <input type='text' id='input' onChange={(e) => {setInput(e.target.value)}} value={input}></input>
                </div>
                <div className='row'>
                  <label htmlFor = 'shift'>Shift step:</label>
                  <input type='number' min="0" max="26" id='shift' onChange={(e) => {setStep(e.target.value)}} value={step}></input>
                </div>
              </div>
              <div className='output-container'>
                <label>Output text:</label>
                <textarea id='text-area' name='textarea' value={output} onChange={e => setOutput(e.target.value)}>{output}</textarea>
              </div>
              
              <button type='submit'>Encrypt</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
