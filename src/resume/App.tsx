import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import "./App.css"
import Layout from './Layout'

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Layout />
		</LocalizationProvider>
	)
}

export default App
