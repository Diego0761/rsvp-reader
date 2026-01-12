import { useState } from 'react'
import { Gear, GearIcon, XIcon } from '@phosphor-icons/react'
import { Dialog } from 'radix-ui'

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

        <div className="flex gap-4 w-full">
          <button
            onClick={() => {
              props.getText(text)
              props.submitForm()
            }}
            className="bg-emerald-500 text-white p-4 rounded-md cursor-pointer flex justify-center items-center w-full transition hover:bg-emerald-600"
          >
            Start
          </button>

          <button className="bg-emerald-500 text-white p-4 rounded-md cursor-pointer flex justify-center items-center transition hover:bg-emerald-600">
            <GearIcon size={32} color="white" />
          </button>
        </div>
      </div>
    </div>
  )
}

// function Modal() {
//   return (
// 	<Dialog.Root>
// 		<Dialog.Trigger asChild>
// 			<button className="items-center justify-center rounded bg-emerald-500 py-2 px-4 outline-none outline-offset-1 hover:bg-emerald-600 focus-visible:outline-2 focus-visible:outline-emerald-700 cursor-pointer">
// 				<GearIcon size={32}  color='white' />
// 			</button>
// 		</Dialog.Trigger>
// 		<Dialog.Portal>
// 			<Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
// 			<Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray1 p-[25px] shadow-(--shadow-6) focus:outline-none data-[state=open]:animate-contentShow">
// 				<Dialog.Title className="m-0 text-[17px] font-medium text-mauve12">
// 					Edit profile
// 				</Dialog.Title>
// 				<Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
// 					Make changes to your profile here. Click save when you're done.
// 				</Dialog.Description>
// 				<fieldset className="mb-4 flex items-center gap-5">
// 					<label
// 						className="w-22 text-right text-xl text-violet11"
// 						htmlFor="name"
// 					>
// 						Name
// 					</label>
// 					<input
// 						className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
// 						id="name"
// 						defaultValue="Pedro Duarte"
// 					/>
// 				</fieldset>
// 				<fieldset className="mb-[15px] flex items-center gap-5">
// 					<label
// 						className="w-[90px] text-right text-[15px] text-violet11"
// 						htmlFor="username"
// 					>
// 						Username
// 					</label>
// 					<input
// 						className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
// 						id="username"
// 						defaultValue="@peduarte"
// 					/>
// 				</fieldset>
// 				<div className="mt-[25px] flex justify-end">
// 					<Dialog.Close asChild>
// 						<button className="inline-flex h-[35px] items-center justify-center rounded bg-green4 px-[15px] font-medium leading-none text-green11 outline-none outline-offset-1 hover:bg-green5 focus-visible:outline-2 focus-visible:outline-green6 select-none">
// 							Save changes
// 						</button>
// 					</Dialog.Close>
// 				</div>
// 				<Dialog.Close asChild>
// 					<button
// 						className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 bg-gray3 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
// 						aria-label="Close"
// 					>
// 						<XIcon size={32} />
// 					</button>
// 				</Dialog.Close>
// 			</Dialog.Content>
// 		</Dialog.Portal>
// 	</Dialog.Root>
//   )
// }

export default MainForm
