import { useEffect, useState } from 'react'
import { DiceFiveIcon, GearIcon } from '@phosphor-icons/react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from '@headlessui/react'
import texts from '../stories.json'

interface Props {
  submitForm: () => void
  getText: (text: string) => void
  setWpm: (wpm: number) => void
}

function MainForm(props: Props) {
  const [text, setText] = useState<string>('')

  const randomText = () => {
    const randomIndex = Math.floor(Math.random() * texts.length)
    setText(texts[randomIndex])
    props.getText(texts[randomIndex])
  }

  function onWpmChange(newWpm: number) {
    props.setWpm(newWpm)
  }

  return (
    <div className="flex w-screen h-screen items-center justify-center select-none">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="text-emerald-500 text-6xl">RSVP Reader</h1>
        <textarea
          id="input"
          name="input"
          rows={15}
          cols={70}
          className="bg-emerald-200 focus:ring-2 ring-emerald-100 outline-none px-4 py-4 text-2xl rounded-md resize-none transition"
          value={text}
          onChange={e => {
            props.getText(e.target.value)
            setText(e.target.value)
          }}
        />

        <div className="flex gap-4 w-full">
          <button
            onClick={randomText}
            className="bg-emerald-500 text-white p-4 rounded-md cursor-pointer flex justify-center items-center transition hover:bg-emerald-600 outline-none border-none focus:ring-2 ring-emerald-200 "
          >
            <DiceFiveIcon size={32} color="white" />
          </button>
          <button
            onClick={() => {
              props.getText(text)
              props.submitForm()
            }}
            className="bg-emerald-500 text-white p-4 rounded-md cursor-pointer flex justify-center items-center w-full transition hover:bg-emerald-600 outline-none focus:ring-2 ring-emerald-200 text-2xl"
          >
            Start
          </button>

          <Modal setWpm={wpm => onWpmChange(wpm)} />
        </div>
      </div>
    </div>
  )
}

type ModalProps = {
  setWpm: (amount: number) => void
}

function Modal(props: ModalProps) {
  const [open, setOpen] = useState(false)

  const [wpm, setWpm] = useState(200)

  useEffect(() => {
    const storedWpm = localStorage.getItem('wpm')
    if (storedWpm) {
      setWpm(Number(storedWpm))
      props.setWpm(Number(storedWpm))
    }
  }, [])

  function onWpmChange(newWpm: string) {
    if (isNaN(Number(newWpm))) return

    setWpm(Math.min(Number(newWpm), 9999))
  }

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="bg-emerald-500 text-white p-4 rounded-md cursor-pointer flex justify-center items-center transition hover:bg-emerald-600 outline-none border-none focus:ring-2 ring-emerald-200"
      >
        <GearIcon size={32} color="white" />
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-white"
                    >
                      Settings
                    </DialogTitle>
                    <div className="mt-2 flex gap-4 items-center">
                      <input
                        type="text"
                        value={wpm}
                        onChange={e => onWpmChange(e.target.value)}
                        name="wpm"
                        id="wpm"
                        max={9999}
                        className="bg-gray-500 w-20 text-gray-200 px-4 py-2 outline-none rounded-md"
                      />
                      <label htmlFor="wpm" className="text-xl text-gray-200">
                        Words per minute
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => {
                    props.setWpm(wpm)
                    localStorage.setItem('wpm', wpm.toString())
                    setOpen(false)
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-gray-100 hover:bg-emerald-600 cursor-pointer sm:ml-3 sm:w-auto"
                >
                  Save
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default MainForm
