import { useEffect, useState } from 'react'
import MainForm from './components/mainForm'

type State = 'form' | 'countdown' | 'reading' | 'finished'

function App() {
  const [countdown, setCountdown] = useState<number>(3)

  const [text, setText] = useState<string>('')
  const [splittedText, setSplittedText] = useState<string[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0)
  const [wpm, setWpm] = useState<number>(200)

  const [state, setState] = useState<State>('form')

  function onStateChange(newState: State) {
    if (newState === 'finished') {
      setCountdown(3)
      setCurrentWordIndex(0)
      setSplittedText([])
      setText('')
      setState('form')
    }
  }

  useEffect(() => {
    onStateChange(state)
  }, [state])

  useEffect(() => {
    if (state != 'reading') return

    const interval = setInterval(() => {
      setCurrentWordIndex(prev => {
        if (prev + 1 >= splittedText.length) {
          endReading()
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 60000 / wpm)

    return () => clearInterval(interval)
  }, [state])

  const SubmitForm = () => {
    StartCountdown()
    setSplittedText(text.split(' '))
  }

  const startReading = () => {
    setState('reading')
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
      <div className="text-white absolute top-4 left-0 p-4">wpm: {wpm}</div>

      {state === 'form' && (
        <MainForm
          setWpm={e => setWpm(e)}
          submitForm={SubmitForm}
          getText={text => setText(text)}
        />
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
