import { listenScreen, sendWindowSizeEvent } from '@/hooks/ipc/window'
import { useEffect, useState, ChangeEvent } from 'react'
import { observer } from 'mobx-react-lite'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command'
import { BookType, Search, Settings, Smile } from 'lucide-react'
import { Loading } from '@/components/common/Loading'
import { keyMap } from '../../core/command/map'
import { inputFocus } from '@/lib/utils'
import { SystemSetting } from '@/pages/setting'

const inputId = 'baseCommandInput'

export const CommandBar = observer(() => {
	const [inputText, setInputText] = useState<string>('')
	const [chooseCommand, setChooseCommand] = useState<string>('')

	const [systemSettingShow, setSystemSettingShow] = useState<boolean>(false)

	const [currentUseCommand, setCurrentUseCommand] = useState<string>('')

	useEffect(() => {
		sendWindowSizeEvent(inputText ? 'INPUTTING' : 'NORMAL')
	}, [inputText])

	useEffect(() => {
		return listenScreen()
	}, [])

	useEffect(() => {
		const id = setTimeout(() => {
			inputFocus(inputId)
		}, 50)
		return () => clearTimeout(id)
	}, [])

	const goalCommand = keyMap[currentUseCommand]

	return (
		<>
			{!currentUseCommand ? (
				<Command
					onKeyDown={e => {
						if (e.key === 'Enter' && chooseCommand) {
							console.log('enter', chooseCommand)
							setCurrentUseCommand(chooseCommand.split(' ')[0])
						}
						// console.log('keydown', e)
					}}
					onValueChange={val => {
						/**
						 * 选中项 的值
						 */
						setChooseCommand(val)
					}}
					value={chooseCommand}
					className="rounded-lg border shadow-md md:min-w-[450px]"
				>
					<CommandInput
						icon={<Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />}
						style={{ height: 60 }}
						placeholder="Type a command or search..."
						value={inputText}
						inputId={inputId}
						onInput={(e: ChangeEvent<HTMLInputElement>) => {
							setInputText(e.target.value)
						}}
						rightIcon={
							<Settings
								className="shrink-0 opacity-50"
								onClick={() => {
									setSystemSettingShow(true)
									sendWindowSizeEvent('SYSTEM_SETTING')
								}}
							/>
						}
					/>
					{inputText && (
						<CommandList>
							<CommandEmpty>
								<div className=" mt-4 w-full h-full flex flex-col justify-center items-center">
									<Loading />
									<div className="mt-4">No results found.</div>
								</div>
							</CommandEmpty>
							<CommandGroup heading="Git">
								<CommandItem>
									<Smile />
									<span>Git-Moji</span>
								</CommandItem>
							</CommandGroup>
							<CommandGroup heading="tools">
								<CommandItem>
									<BookType />
									<span>fanyi 翻译</span>
								</CommandItem>
							</CommandGroup>
							<CommandSeparator />
						</CommandList>
					)}
				</Command>
			) : (
				<goalCommand.content
					destructCommand={() => {
						setCurrentUseCommand('')
						setTimeout(() => {
							inputFocus(inputId)
						}, 100)
					}}
				/>
			)}
			<SystemSetting
				show={systemSettingShow}
				onClose={() => {
					setSystemSettingShow(false)
					sendWindowSizeEvent(inputText ? 'INPUTTING' : 'NORMAL')
				}}
			/>
		</>
	)
})
