import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import FormPage from './pages/FormPage.jsx'
import LoadingPage from './pages/LoadingPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import { generateMockData } from './utils/generateMockData.js'

function AppRoutes() {
  const [startupData, setStartupData] = useState(null)
  const [pitchData, setPitchData] = useState(null)
  const navigate = useNavigate()

  const handleGenerate = (formData) => {
    setStartupData(formData)
    navigate('/loading')
    setTimeout(() => {
      setPitchData(generateMockData(formData))
      navigate('/results')
    }, 2000)
  }

  const handleReset = () => {
    setPitchData(null)
    setStartupData(null)
    navigate('/')
  }

  return (
    <Routes>
      <Route path="/"        element={<Landing onStart={() => navigate('/form')} />} />
      <Route path="/form"    element={<FormPage onBack={() => navigate('/')} onSubmit={handleGenerate} />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/results" element={<ResultsPage data={pitchData} startup={startupData} onReset={handleReset} />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}