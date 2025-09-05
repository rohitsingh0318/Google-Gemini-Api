import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
      <div className="App">
       <h1 class="gradient-text">Google Gemini Pro </h1>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
