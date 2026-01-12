import { useState } from 'react'
import MainForm from './components/mainForm'

function App() {
  const [countdown, setCountdown] = useState<number>(3)

  const [text, setText] = useState<string>('')
  const [splittedText, setSplittedText] = useState<string[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0)

  const [state, setState] = useState<
    'form' | 'countdown' | 'reading' | 'finished'
  >('form')

  const SubmitForm = () => {
    //setFormVisibility(false)
    StartCountdown()
    setSplittedText(text.split(' '))
  }

  const startReading = () => {
    setState('reading')
    console.log(splittedText)
    console.log(text)
    setInterval(() => {
      setCurrentWordIndex(currentWordIndex + 1)
    }, 600)
  }

  const StartCountdown = () => {
    setState('countdown')

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(interval)
          startReading()

          return 0
        }
        return prev - 1
      })
    }, 250)
  }

  const endReading = () => {
    setState('finished')
  }

  return (
    <>
      <div className="text-white absolute top-0 left-0 p-4">state: {state}</div>

      {state === 'form' && (
        <MainForm submitForm={SubmitForm} getText={text => setText(text)} />
      )}

      {state === 'countdown' && (
        <div className="flex w-screen h-screen items-center justify-center select-none">
          <h1 className="text-emerald-500 text-9xl">{countdown}</h1>
        </div>
      )}

      {state === 'reading' && (
        <div className="flex w-screen h-screen items-center justify-center select-none">
          <h1 className="text-emerald-500 text-6xl">
            {splittedText[currentWordIndex]}
          </h1>
        </div>
      )}
    </>
  )
}

export default App
