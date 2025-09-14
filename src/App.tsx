import reactLogo from "./assets/react.svg";
import "./App.css";
import { useRotation } from "./hooks/useRotation";
import { useRef } from "react";

function App() {
	const imgRef = useRef<HTMLImageElement>(null);
	const { elementRef, toggleDirection } = useRotation({
		speed: 60,
		initialDirection: 1,
		elementRef: imgRef
	});

	return (
		<main className="app">
			<img
				ref={elementRef}
				src={reactLogo}
				className="logo react"
				alt="React logo"
				onClick={toggleDirection}
			/>
		</main>
	);
}

export default App;
