import { useRef } from "react";
import { useRotation } from "../../hooks/useRotation";
import reactIcon from "../../assets/react.svg";

const ReactIconRotation = () => {
	const imgRef = useRef<HTMLImageElement>(null);
	const { elementRef, toggleDirection } = useRotation({
		speed: 60,
		initialDirection: 1,
		elementRef: imgRef,
	});

	return (
		<main className="app">
			<img
				ref={elementRef}
				src={reactIcon}
				className="logo react"
				alt="React logo"
				onClick={toggleDirection}
				data-testid="react-icon-rotation"
			/>
		</main>
	);
};

export default ReactIconRotation;
