
export const calculateMaxDistance = (
	width?: number,
	height?: number
): number => {
	const viewportWidth = width ?? window.innerWidth;
	const viewportHeight = height ?? window.innerHeight;
	return Math.sqrt(
		viewportWidth * viewportWidth + viewportHeight * viewportHeight
	);
};

export const calculateDistance = (x: number, y: number): number => {
	return Math.sqrt(x * x + y * y);
};

export const calculateScale = (
	distance: number,
	maxDistance: number,
	minScale: number,
	maxScale: number
): number => {
	const ratio = distance / maxDistance;
	return minScale + ratio * (maxScale - minScale);
};

export const normalizeAngle = (angle: number): number => {
	return ((angle % 360) + 360) % 360;
};

export const calculateRotationDelta = (
	speed: number,
	direction: number,
	deltaTime: number
): number => {
	const deltaSeconds = deltaTime / 1000;
	return speed * direction * deltaSeconds;
};

export const formatTime = (
	timeInMs: number,
	format: "seconds" | "milliseconds" | "formatted" = "formatted"
): string => {
	switch (format) {
		case "seconds":
			return `${(timeInMs / 1000).toFixed(1)}s`;
		case "milliseconds":
			return `${Math.round(timeInMs)}ms`;
		case "formatted":
		default: {
			const totalSeconds = Math.floor(timeInMs / 1000);
			const minutes = Math.floor(totalSeconds / 60);
			const seconds = totalSeconds % 60;
			const milliseconds = Math.floor((timeInMs % 1000) / 100);

			if (minutes > 0) {
				return `${minutes}:${seconds
					.toString()
					.padStart(2, "0")}.${milliseconds}`;
			} else {
				return `${seconds}.${milliseconds}`;
			}
		}
	}
};
