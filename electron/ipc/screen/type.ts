enum ESCREEN_SIZE {
	默认输入框 = 'NORMAL',
	输入框输入中 = 'INPUTTING',
	系统设置页 = 'SYSTEM_SETTING',
	翻译设置页 = 'FANYI_SETTING',
}

export type T_SCREEN_SIZE_TYPE = `${ESCREEN_SIZE}`

export type T_SCREEN_VALUE = {
	width: number
	height: number
}
