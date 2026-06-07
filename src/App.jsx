import { useState } from 'react'
import Landing from './pages/Landing.jsx'
import FormPage from './pages/FormPage.jsx'
import LoadingPage from './pages/LoadingPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import { generateMockData } from './utils/generateMockData.js'

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [startupData, setStartupData] = useState(null)
  const [pitchData, setPitchData] = useState(null)

  const handleGenerate = (formData) => {
    setStartupData(formData)
    setScreen('loading')
    setTimeout(() => {
      setPitchData(generateMockData(formData))
      setScreen('results')
    }, 5000)
  }

  return (
    <>
      {screen === 'landing' && <Landing onStart={() => setScreen('form')} />}
      {screen === 'form'    && <FormPage onBack={() => setScreen('landing')} onSubmit={handleGenerate} />}
      {screen === 'loading' && <LoadingPage />}
      {screen === 'results' && <ResultsPage data={pitchData} startup={startupData} onReset={() => { setPitchData(null); setScreen('landing') }} />}
    </>
  )
}