import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Assessment from './pages/Assessment.jsx'
import Results from './pages/Results.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/assessment" element={<Assessment />} />
      <Route path="/results" element={<Results />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
