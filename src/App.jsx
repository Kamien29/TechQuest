import { useState } from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"

function App() {
  const [xp] = useState(0)

  function handleStart() {
    // ETAP 2: przejście do listy misji
  }

  return (
    <div className="app">
      <Navbar xp={xp} />
      <main className="main">
        <Home onStart={handleStart} />
      </main>
    </div>
  )
}

export default App
