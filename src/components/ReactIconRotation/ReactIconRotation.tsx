import { useRef } from "react";
import { useRotation } from "../../hooks/useRotation";
import reactIcon from "../../assets/react.svg";
import { INITIAL_DIRECTION, SPEED } from "../../constants/react-icon-rotation";

const ReactIconRotation = () => {
	const imgRef = useRef<HTMLImageElement>(null);
	const { elementRef, toggleDirection } = useRotation({
		speed: SPEED,
		initialDirection: INITIAL_DIRECTION,
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
