import { useEffect, useState } from 'react'
import MainForm from './components/mainForm'
import commonWords from './wordprocessing/highfrequency.json'

type State = 'form' | 'countdown' | 'reading' | 'finished'

function App() {
  const [countdown, setCountdown] = useState<number>(3)

  const [text, setText] = useState<string>('')
  const [splittedText, setSplittedText] = useState<string[]>([])
  const [timedText, setTimedText] = useState<{ word: string; time: number }[]>(
    []
  )
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0)
  const [wpm, setWpm] = useState<number>(200)

  const [state, setState] = useState<State>('form')

  function onStateChange(newState: State) {
    if (newState === 'finished') {
      setCountdown(3)
      setCurrentWordIndex(0)
      setSplittedText([])
      setTimedText([])
      setText('')
      setState('form')
    }
  }

  function processText(input: string[], desiredWPM: number) {
    const timedText: { word: string; time: number }[] = []

    const basetime = 60
    const timeperchar = basetime / 6
    const commonpunish = -20
    const pontuationbonus = 50

    let totalTime = 0

    input.forEach(word => {
      let time = word.length * timeperchar + basetime

      totalTime += time

      if (commonWords.includes(word.toLowerCase())) {
        time += commonpunish
        totalTime += commonpunish
      }

      if (word.endsWith(',') || word.endsWith(';')) {
        time += pontuationbonus
        totalTime += pontuationbonus
      } else if (
        word.endsWith('.') ||
        word.endsWith('!') ||
        word.endsWith('?')
      ) {
        time += pontuationbonus * 2
        totalTime += pontuationbonus * 2
      }

      timedText.push({ word, time })
    })

    const trueWPM = (input.length * 60000) / totalTime
    const scaledWPM = trueWPM / desiredWPM

    timedText.forEach(item => {
      item.time = item.time * scaledWPM
    })

    return {
      timedText,
      totalTime: totalTime * scaledWPM,
      wordCount: input.length
    }
  }

  useEffect(() => {
    onStateChange(state)
  }, [state])

  useEffect(() => {
    if (state != 'reading' || timedText.length === 0) return

    let currentIndex = 0
    let timeoutId: number

    const showNextWord = () => {
      if (currentIndex >= timedText.length - 1) {
        endReading()
        return
      }

      currentIndex++
      setCurrentWordIndex(currentIndex)
      timeoutId = setTimeout(showNextWord, timedText[currentIndex].time)
    }

    // Start with the first word's timing
    timeoutId = setTimeout(showNextWord, timedText[0].time)

    return () => clearTimeout(timeoutId)
  }, [state, timedText])

  const SubmitForm = () => {
    StartCountdown()
    const words = text.split(' ')
    setSplittedText(words)
    const processed = processText(words, wpm)
    setTimedText(processed.timedText)
    console.log(processed)
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
