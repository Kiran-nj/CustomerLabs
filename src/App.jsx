import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import SaveSegmentPopup from './components/SaveSegmentPopup'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <SaveSegmentPopup/>
      </div>
    </>
  )
}

export default App
