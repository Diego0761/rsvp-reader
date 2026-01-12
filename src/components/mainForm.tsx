import { useState } from 'react'

interface Props {
  submitForm: () => void
  getText: (text: string) => void
}

function MainForm(props: Props) {
  const [text, setText] = useState<string>('')

  return (
    <div className="flex w-screen h-screen items-center justify-center select-none">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="text-emerald-500 text-6xl">RSVP Reader</h1>
        <textarea
          id="input"
          name="input"
          rows={15}
          cols={70}
          className="bg-emerald-200 outline-none px-4 py-2 text-2xl rounded-md resize-none"
          value={text}
          onChange={e => {
            props.getText(e.target.value)
            setText(e.target.value)
          }}
        />

        <button
          onClick={() => {
            props.getText(text)
            props.submitForm()
          }}
          className="bg-emerald-500 text-white p-4 rounded-md cursor-pointer flex justify-center items-center w-full transition hover:bg-emerald-600"
        >
          Start
        </button>
      </div>
    </div>
  )
}

export default MainForm
