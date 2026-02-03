import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { ElliePiperBalloons } from './pages/ellie-piper/Balloons'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ellie-piper/balloons" element={<ElliePiperBalloons />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
