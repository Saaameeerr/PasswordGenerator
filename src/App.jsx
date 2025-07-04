import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [length, setLength ] = useState(8);
  const [password, setPassword] = useState("");
  const [charAllow, setCharAllow] = useState(false);
  const [numAllow, setNumAllow] = useState(false);

  const passwordRef = useRef(null)

  const passwordGenerator = () =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    for (let i = 0; i < length; i++){
      const charIndex = Math.floor(Math.random() * str.length)
      pass += str.charAt(charIndex)
    }
    setPassword(pass)
  }
  const copyPasswordToClipboard = () =>{
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0,999)
      window.navigator.clipboard.writeText(password)
    }
  }
  useEffect(() =>{
    passwordGenerator()
  },[length,numAllow,charAllow])
  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4
    py-4 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>
        Password Generator
      </h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" value={password} 
        className="outline-none w-full py-1 px-3"
        placeholder='Password'
        readOnly
        ref={passwordRef}
  />
        <button 
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3
        py-0.5 shrink-0'>
          Copy
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className=' flex items-center gap-x-1'>
          <input type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=> setLength(Number(e.target.value))} />
          <label >Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          checked={numAllow}
          id='numInp'
          onChange={()=> setNumAllow(prev => !prev)} />
          <label htmlFor="numInp">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          checked={charAllow}
          id='charInp'
          onChange={()=> setCharAllow(prev => !prev)} />
          <label htmlFor="charInp">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
