import { createBrowserRouter, RouterProvider, useNavigate, NavigateOptions, To } from 'react-router-dom'

export const cRRouter = createBrowserRouter
export const RProvider = RouterProvider

export function useNavigateTo() {

	const navigate = useNavigate()

	function navigateTo(to: To, options?: NavigateOptions) {
		navigate(to, options)
	}

	return {
		navigateTo
	}
}