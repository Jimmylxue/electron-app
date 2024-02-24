import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './index.css'

import './demos/ipc'
import { config } from './service/react-query'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { DwgConversion } from './page/dwgConversion'
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

const Root = () => {
	const { queryClient, QueryClientProvider } = config()

	return (
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<Router>
					<Routes>
						<Route path="*" element={<App />} />
					</Routes>
				</Router>
			</QueryClientProvider>
		</React.StrictMode>
	)
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Root />
)

postMessage({ payload: 'removeLoading' }, '*')
