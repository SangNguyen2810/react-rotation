import { useState, useEffect, useRef, useCallback } from "react";
import { formatTime } from "../../utils/calculations";

export interface UseIdleTimerOptions {
	format?: "seconds" | "milliseconds" | "formatted";
	updateInterval?: number;
}

export interface UseIdleTimerReturn {
	idleTime: number;
	formattedIdleTime: string;
}

export const useIdleTimer = (
	options: UseIdleTimerOptions = {}
): UseIdleTimerReturn => {
	const { format = "formatted", updateInterval = 100 } = options;

	const [idleTime, setIdleTime] = useState(0);
	
	const idleStartTimeRef = useRef<number | null>(null);
	const lastMousePositionRef = useRef<{ x: number; y: number } | null>(null);
	const updateIntervalRef = useRef<number | null>(null);
	const mouseMoveTimeoutRef = useRef<number | null>(null);

	const updateIdleTime = useCallback(() => {
		if (!idleStartTimeRef.current) return;

		const now = performance.now();
		const elapsed = now - idleStartTimeRef.current;
		setIdleTime(elapsed);
	}, []);

	const startIdleTimer = useCallback(() => {
		if (updateIntervalRef.current) {
			clearInterval(updateIntervalRef.current);
			updateIntervalRef.current = null;
		}

		idleStartTimeRef.current = performance.now();
		setIdleTime(0);

		updateIntervalRef.current = setInterval(
			updateIdleTime,
			updateInterval
		);
	}, [updateIdleTime, updateInterval]);

	const handleMouseMove = useCallback((event: MouseEvent) => {
		const currentPosition = { x: event.clientX, y: event.clientY };
		const lastPosition = lastMousePositionRef.current;
		if (
			lastPosition &&
			lastPosition.x === currentPosition.x &&
			lastPosition.y === currentPosition.y
		) {
			return;
		}

		lastMousePositionRef.current = currentPosition;

		if (mouseMoveTimeoutRef.current) {
			clearTimeout(mouseMoveTimeoutRef.current);
			mouseMoveTimeoutRef.current = null;
		}

		if (updateIntervalRef.current) {
			clearInterval(updateIntervalRef.current);
			updateIntervalRef.current = null;
		}

		idleStartTimeRef.current = performance.now();
		setIdleTime(0);

		updateIntervalRef.current = setInterval(updateIdleTime, updateInterval);
	}, [updateIdleTime, updateInterval]);

	const handleMouseLeave = useCallback(() => {
		if (mouseMoveTimeoutRef.current) {
			clearTimeout(mouseMoveTimeoutRef.current);
			mouseMoveTimeoutRef.current = null;
		}

		if (updateIntervalRef.current) {
			clearInterval(updateIntervalRef.current);
			updateIntervalRef.current = null;
		}
	}, []);

	const handleMouseEnter = useCallback(() => {
		if (idleStartTimeRef.current) {
			if (updateIntervalRef.current) {
				clearInterval(updateIntervalRef.current);
				updateIntervalRef.current = null;
			}

			updateIntervalRef.current = setInterval(
				updateIdleTime,
				updateInterval
			);
		}
	}, [updateIdleTime, updateInterval]);

	const handleVisibilityChange = useCallback(() => {
		if (document.hidden) {
			if (mouseMoveTimeoutRef.current) {
				clearTimeout(mouseMoveTimeoutRef.current);
				mouseMoveTimeoutRef.current = null;
			}

			if (updateIntervalRef.current) {
				clearInterval(updateIntervalRef.current);
				updateIntervalRef.current = null;
			}
		}
	}, []);

	useEffect(() => {
		startIdleTimer();
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseleave", handleMouseLeave);
		document.addEventListener("mouseenter", handleMouseEnter);
		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseleave", handleMouseLeave);
			document.removeEventListener("mouseenter", handleMouseEnter);
			document.removeEventListener("visibilitychange", handleVisibilityChange);

			if (mouseMoveTimeoutRef.current) {
				clearTimeout(mouseMoveTimeoutRef.current);
				mouseMoveTimeoutRef.current = null;
			}
			if (updateIntervalRef.current) {
				clearInterval(updateIntervalRef.current);
				updateIntervalRef.current = null;
			}
		};
	}, [
		startIdleTimer,
		handleMouseMove,
		handleMouseLeave,
		handleMouseEnter,
		handleVisibilityChange,
	]);

	return {
		idleTime,
		formattedIdleTime: formatTime(idleTime, format),
	};
};
