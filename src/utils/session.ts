import { cookies } from 'next/headers'

export const setCookie = (key, value) => {
	const cookieStore = cookies()
	return cookieStore.set(key, value)
}

export const getCookie = (key) => {
	const cookieStore = cookies()
	return cookieStore.get(key)
}