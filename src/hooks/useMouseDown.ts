'use client'

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

type TypeOut = {
	refMouse: any
	isShowMouse: boolean
	setIsShowMouse: Dispatch<SetStateAction<boolean>>
}

export const useMouseDown = (initialIsVisible: boolean): TypeOut => {
	const [isShowMouse, setIsShowMouse] = useState(initialIsVisible)
	const refMouse = useRef<HTMLElement>(null)

	const handleClickOutside = (event: any) => {
		if (refMouse.current && !refMouse.current.contains(event.target)) {
			setIsShowMouse(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)
		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	})
	return { refMouse, isShowMouse, setIsShowMouse }
}
