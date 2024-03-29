import { useEffect, useState, useRef } from 'react'
import './App.scss'
import { caesarCipher } from './function/CaesarCipher'
import { shift } from './function/Shift'
import Highlighter from './function/Highlighter'
import {motion, AnimatePresence, FlatTree} from "framer-motion"
import Tag from './components/Tag'
import Footer from './components/Footer'
import { HiMenuAlt1 } from "react-icons/hi";
import { CgMenuGridO } from "react-icons/cg";
import { GiTortoise } from "react-icons/gi"
import { GiRabbit } from "react-icons/gi";
import { FaGithub } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";
import { BsAlphabetUppercase } from "react-icons/bs";
import { GrCircleInformation } from "react-icons/gr";
import { BiBug } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { BsHouse } from "react-icons/bs";
import { TbAlphabetLatin } from "react-icons/tb";
import { TbAlphabetGreek } from "react-icons/tb";
import { optionVariant } from './variables/_variables'
import { style } from './variables/_variables'
import Typewriter from './function/Typewriter'


function App() {
  const latin = ["A", "B", "C" ,"D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  // const latin = ["a", "b", "c" ,"d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
  const greek = ['Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω']

  
  // const greek = ["α", "β","γ", "δ", "ε", "ζ", "η", "θ", "ϑ", "ι", "κ", "λ", "μ", "ν" ,"ξ" ,"ο", "π","ϖ", "ρ", "ς", "σ", "τ", "υ", "φ", "χ", "ψ", "ω"]
  const [alphabet, setAlphabet] = useState({
    type : latin,
    name : "latin"
  })

  const [screen, setScreen] = useState(window.innerWidth)
  const [isReseted, setIsReseted] = useState(false)
  const [selected, setSelected] = useState(false)
  const [done, setDone] = useState(false)
  const [mapped, setMapped] = useState([])
  const [input, setInput] = useState("")
  const [isClicked, setIsClicked] = useState(false)
  const [extended, setExtended] = useState(isClicked === false ? alphabet : [])
  const [step, setStep] = useState(0)
  const [output, setOutput] = useState("")
  const [selectedOption, setSelectedOption] = useState(350)
  const [prevInput, setPrevInput] = useState("")
  const [hovered, setHovered] = useState({
    status : false,
    item : ""
  })
  const [alphaOne, setAlphaOne] = useState({
    index : 0,
    char : ""
  })
  const [alphaTwo, setAlphaTwo] = useState({
    index : 0,
    char : ""
  })

  const [isToggled, setIsToggled] = useState(false)

  // Handles the option input values
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value)
  }

  //Update Done status
  const updateDone = (value) => {
    setDone(value)
  }

  //Update Reset status
  const updateReset = (value) => {
    setReset(value)
  }

  // Update the current letter in input 
  const updateInput = (idx, c) => {
    setAlphaOne({
      index : idx,
      char : c
    })
  }

  // Update the current letter in output
  const updateOutput = (idx, c) => {
    setAlphaTwo({
      index : idx,
      char : c
    })
  }

  // Handles click event
  const updateClicked = (value) => {
    setIsClicked(value)
  }

  // Resets the input fields
  const handleReset = () => {
    setMapped([])
    setInput("")
    setOutput("")
    setIsClicked(false)
    setExtended(alphabet)
    setDone(false)
    setStep(0)
  }

  // Handles the submit event
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsClicked(true)
    setMapped(shift(alphabet.type, step))
    setOutput(caesarCipher(input, step, alphabet.name))
    setPrevInput(input)
    setDone(false)
  }

  // Handles the hover in event
  const handleHoverIn = (e) => {
    console.log(e.target)
    setHovered({
      status : true,
      item : e.target.getAttribute('id')
    })
  }

  // Handles the hover out event
  const handleHoverOut = (e) => {
    setHovered(false)
  }

  // Calculates the shifting step
  const stepCalculator = (step) => {
    const result = Math.round(step * (1 / alphabet.type.length * 50) * 1000) / 1000
    return result
  }

  // Handles letters' onClick event
  const [entered, setEntered] = useState(false)

  const handleClickLetter = (e) => {
    let letter = document.getElementById(e.target.id)
    console.log(letter.textContent)
    setInput(prevInput => prevInput + letter.textContent)
    letter.setAttribute("class", "letter clicked")
    setEntered(true)
    // setInput()
    setTimeout(() => {
      setEntered(false)
      letter.classList.remove("clicked")
    }, 300)
  }  



  useEffect(() => {
    setExtended(alphabet)

  }, [alphabet])

  const toggleRef = useRef(null)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if(toggleRef.current && !toggleRef.current.contains(e.target)){
        setSelected(false)
      }
    } 
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      document.addEventListener('mousedown', handleClickOutside)
    }
  }, [])


  useEffect(() => {
    if(input !== prevInput && done){
      setIsClicked(false)
    }
  }, [input, prevInput, done])

  // useEffect(() => {
  //   setScreen(window.innerWidth)
  // }, [screen])

  
  return (
    <div className='main-container'>
      {
        screen < 480 ? 
        <div className={isToggled ? 'sidebar-mobile-container toggled' : 'sidebar-mobile-container'}>
          <button type='button' className='toggler' onClick={() => setIsToggled(!isToggled)}>
            <HiMenuAlt1 className='icon'></HiMenuAlt1>
          </button>
          <div className='sidebar-container'>
            <div className='sidebar-upper'>
              <div className='sidebar-elements selected' onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut}>
                <BsHouse className='icon'></BsHouse>
              </div>
              <div className='sidebar-elements' id = 'alphabets' onClick={() => setSelected(!selected)}>
                {
                  alphabet.name === 'latin' 
                  ? <TbAlphabetLatin className='icon alphabet'></TbAlphabetLatin>
                  : <TbAlphabetGreek className='icon alphabet'></TbAlphabetGreek>
                }
                {
                  selected &&
                  <motion.div key ='option' variants={optionVariant} initial="initial" animate='visible' exit='exit' className='alphabet-options' ref={toggleRef}>
                    <div className={alphabet.name === 'latin' ? 'option selected' : 'option'} onClick={() => setAlphabet({type : latin, name : 'latin'})}>
                      <TbAlphabetLatin className='option-icon'></TbAlphabetLatin>
                      <h1>Latin</h1>
                    </div>
                    <div className={alphabet.name === 'greek' ? 'option selected' : 'option'} onClick={() => setAlphabet({type : greek, name : 'greek'})}>
                      <TbAlphabetGreek className='option-icon'></TbAlphabetGreek>
                      <h1>Ancient Greek</h1>
                    </div>
                  </motion.div>
                }
              </div>
          </div>
            
          <div className='sidebar-lower'>
            <a href='https://github.com/bachvo01/Caesar-Cipher/issues' target='_blank' rel="noreferrer noopener" className='sidebar-elements' onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut}>
              <BiBug className='icon'></BiBug>
            </a>
            <a href='https://github.com/bachvo01/Caesar-Cipher' target='_blank' rel="noreferrer noopener" className='sidebar-elements' onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut}>
              <FaGithub className='icon'></FaGithub>
            </a>
          </div>
        </div>
        </div>
        :
        <div className='sidebar-container'>
          <div className='sidebar-upper'>
            <div className='sidebar-elements selected' onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut}>
              <BsHouse className='icon'></BsHouse>
            </div>
            <div className='sidebar-elements' id = 'alphabets' onClick={() => setSelected(!selected)}>
              {
                alphabet.name === 'latin' 
                ? <TbAlphabetLatin className='icon alphabet'></TbAlphabetLatin>
                : <TbAlphabetGreek className='icon alphabet'></TbAlphabetGreek>
              }
              {
                selected &&
                <motion.div key ='option' variants={optionVariant} initial="initial" animate='visible' exit='exit' className='alphabet-options' ref={toggleRef}>
                  <div className={alphabet.name === 'latin' ? 'option selected' : 'option'} onClick={() => setAlphabet({type : latin, name : 'latin'})}>
                    <TbAlphabetLatin className='option-icon'></TbAlphabetLatin>
                    <h1>Latin</h1>
                  </div>
                  <div className={alphabet.name === 'greek' ? 'option selected' : 'option'} onClick={() => setAlphabet({type : greek, name : 'greek'})}>
                    <TbAlphabetGreek className='option-icon'></TbAlphabetGreek>
                    <h1>Ancient Greek</h1>
                  </div>
                </motion.div>
              }
            </div>
        </div>
          
        <div className='sidebar-lower'>
          <a href='https://github.com/bachvo01/Caesar-Cipher/issues' target='_blank' rel="noreferrer noopener" className='sidebar-elements' onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut}>
            <BiBug className='icon'></BiBug>
          </a>
          <a href='https://github.com/bachvo01/Caesar-Cipher' target='_blank' rel="noreferrer noopener" className='sidebar-elements' onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut}>
            <FaGithub className='icon'></FaGithub>
          </a>
        </div>
      </div>
      }
      
      <div className='main-inner'>
        <div className='cipher-container'>
          <div className='fact-container'>
            <h1 className='name'>Caesar Cipher</h1>
            <p className='para'>The Caesar Cipher, named after Julius Caesar who reputedly used it, is one of the simplest and earliest known encryption techniques. It operates by shifting each letter of the plaintext a fixed number of positions down or up the alphabet. For instance, with a shift of 3, "A" becomes "D", "B" becomes "E", and so on.<br></br><br></br>Despite its elementary nature, the Caesar Cipher provides a basic level of secrecy, suitable for casual communication or educational purposes. However, due to its predictable nature and vulnerability to brute-force attacks, it is not considered secure for modern cryptographic needs.</p>
          </div>
          <div className='computing-container'>
            <div className='alphabet-container' id='alphabet'>
              <div className='row'>
              {
                alphabet.type.map((letter, index) => {
                  if(letter === alphaOne.char.toUpperCase()){
                    return(
                      <span key={index} className='letter highlighted'>{letter}</span>
                    )
                  }
                  else{
                    return(
                      <span key={index} id ={"letter-" + index} className='letter' onClick={handleClickLetter}>{letter}</span>
                    )
                  }
                  
                })
              }
              </div>
              
            </div>
            <AnimatePresence>
            <div className='mapped-outer'>
                <div className='mapped-container' style={isClicked ? {width : '100%'} : {width : '200%'}}>
                {
                    isClicked === false ?
                    <motion.div key='shift'
                    className='mapped-inner'
                    initial = {{opacity : 0}} exit= {{opacity : 0}} 
                    // style={{width : `calc(100% + ${calculator(step)}%)`, gridTemplateColumns : `repeat(${parseInt(length) + parseInt(step)}, 1fr)`}}
                    animate={ done === false ?
                      {opacity : 1, transform : `translateX(-${stepCalculator(step)}%) translateX(${0}px)`} :
                      {opacity : 1}
                    }
                    transition={{duration: 0.35, type : "just", stiffness : 150}}>
                      {
                          extended.type.map((letter, index) => {
                            if(letter === alphaOne.char.toUpperCase()){
                              return(
                                <span key={index} className='letter highlighted'>{letter}</span>
                              )
                            }
                            else{
                              return(
                                <span key={index} className='letter'>{letter}</span>
                              )
                            }
                          })
                        }
                      {
                          extended.type.map((letter, index) => {
                            if(letter === alphaOne.char.toUpperCase()){
                              return(
                                <span key={index} className='letter highlighted'>{letter}</span>
                              )
                            }
                            else{
                              return(
                                <span key={index} className='letter'>{letter}</span>
                              )
                            }
                          })
                      }
                  </motion.div>
                  :
                  <motion.div key="encrypt" initial = {{opacity : 0}} animate = {{opacity : 1}} transition={{duration: 0.35}} exit= {{opacity : 0}}
                  className='mapped-inner encrypted'>
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
                  </motion.div>
                }
              </div>
            </div>
            
            </AnimatePresence>
              
            
            <form onSubmit={handleSubmit} className='form-container'>
              <div className='input-container'>
                <div className='row one'>
                  <label htmlFor = 'text-input'>Plaintext:</label>
                  {
                    isClicked === false || done ? <textarea id = 'text-input' type='textarea' style={done ? {color : "#cbcbcb"} : null} onChange={(e) => {setInput(e.target.value)}} value={input}></textarea> 
                    : <Highlighter string = {input} speed ={selectedOption} updateClicked = {updateClicked} updateComparison = {updateInput} updateDone = {updateDone}></Highlighter>
                  }                    
     
                </div>
                <div className='row two'>
                  <label htmlFor='text-area'>Ciphertext:</label>
                  {
                    isClicked === false && <textarea id='text-area' name='textarea' disabled value={output} onChange={e => setOutput(e.target.value)}>{output}</textarea>
                  }
                  {
                    output && isClicked && <Highlighter string = {output} speed ={selectedOption} updateClicked = {updateClicked} updateComparison = {updateOutput} updateDone = {updateDone}></Highlighter>
                  }
                </div>
              </div>
              <div className='output-container'>
                  <div className={input.length === 0 ? 'column two disabled' : 'column two'}>
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
                          <input type='radio' name='speed' value={200} id='level-three' defaultChecked onChange={handleOptionChange}></input>
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
                  <div className={input.length === 0 ? 'column one disabled' : 'column one'}>
                    <label htmlFor = 'shift'>Shift step:</label>
                    <input type='number' min="0" max={alphabet.type.length} disabled = {isClicked ? true : false} id='shift' onChange={(e) => {setStep(e.target.value)}} value={step}></input>
                  </div>
              </div>
              {
                done && screen <= 480 && <Typewriter text="Want to try again? Hit reset!" speed={80}></Typewriter>
              }
              <div className='button-wrapper'>
                <button type='submit' className={input.length === 0 ? 'submit-button disabled' : 'submit-button'} disabled = {input === prevInput ? true : false}>Encrypt</button>
                <button type='reset' className='reset-button' onClick={handleReset}>Reset</button>
                {
                  done && screen > 480 && <Typewriter text="Want to try again? Hit reset!" speed={80}></Typewriter>
                }
              </div>       
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App
