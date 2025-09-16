import { useRef } from "react";
import { useRotationScaling } from "@/hooks/useRotationScaling";
import { useIdleTimer } from "@/hooks/useIdleTimer";
import reactIcon from "@/assets/react.svg";
import {
	INITIAL_DIRECTION,
	SPEED,
	MIN_SCALE,
	MAX_SCALE,
	IDLE_TIMER_UPDATE_INTERVAL,
	IDLE_TIMER_FORMAT,
} from "@/constants/react-icon-rotation";
import "./ReactIconRotation.css";

const ReactIconRotation = () => {
	const imgRef = useRef<HTMLImageElement>(null);

	const { elementRef, toggleDirection } = useRotationScaling({
		speed: SPEED,
		initialDirection: INITIAL_DIRECTION,
		elementRef: imgRef,
		minScale: MIN_SCALE,
		maxScale: MAX_SCALE,
	});

	const { formattedIdleTime } = useIdleTimer({
		format: IDLE_TIMER_FORMAT,
		updateInterval: IDLE_TIMER_UPDATE_INTERVAL,
	});


	return (
		<main className="react-icon-rotation">
			<img
				ref={elementRef}
				src={reactIcon}
				className="logo react"
				alt="React logo"
				onClick={toggleDirection}
				data-testid="react-icon-rotation"
			/>
			<article className="idle-timer">
				<p className="idle-time">Idle: {formattedIdleTime}</p>
			</article>
		</main>
	);
};

export default ReactIconRotation;
