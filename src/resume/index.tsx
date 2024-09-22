import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

function main() {
	const el = document.getElementById("root")
	const app = createRoot(el as HTMLElement)
	app.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	)
}

main()