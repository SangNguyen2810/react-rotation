import { useRef, useEffect, useCallback, useState } from "react";
import {
	DEFAULT_SPEED,
	DEFAULT_INITIAL_DIRECTION,
	MIN_SCALE,
	MAX_SCALE,
} from "../../constants/react-icon-rotation";
import {
	calculateMaxDistance,
	calculateDistance,
	calculateScale,
	normalizeAngle,
	calculateRotationDelta,
} from "../../utils";

export interface UseRotationScalingOptions<T> {
	speed?: number;
	initialDirection?: RotationDirection;
	elementRef: React.RefObject<T | null>;
	enableScaling?: boolean;
	minScale?: number;
	maxScale?: number;
}

export interface UseRotationScalingReturn<T> {
	elementRef: React.RefObject<T | null>;
	toggleDirection: () => void;
}

export interface UseRotationReturn<T> {
	elementRef: React.RefObject<T | null>;
	rotationDirection: RotationDirection;
	toggleDirection: () => void;
	setDirection: (direction: RotationDirection) => void;
	isAnimating: boolean;
	startAnimation: () => void;
	stopAnimation: () => void;
	currentRotation: number;
}

export type RotationDirection = 1 | -1;

export interface AnimationConfig {
	speed: number;
	direction: RotationDirection;
	isActive: boolean;
}

export type RotationEventHandler = (config: AnimationConfig) => void;

export const useRotationScaling = <T extends HTMLElement>(
	options: UseRotationScalingOptions<T>
): UseRotationScalingReturn<T> => {
	const {
		speed = DEFAULT_SPEED,
		initialDirection = DEFAULT_INITIAL_DIRECTION,
		elementRef,
		enableScaling: scalingEnabled = true,
		minScale = MIN_SCALE,
		maxScale = MAX_SCALE,
	} = options;

	const animationRef = useRef<number | null>(null);
	const currentRotationRef = useRef(0);
	const [rotationDirection, setRotationDirection] =
		useState<RotationDirection>(initialDirection);

	const [scale, setScale] = useState(1);
	const lastTimeRef = useRef(performance.now());
	const maxDistanceRef = useRef(calculateMaxDistance());

	const calculateScaleForDistance = useCallback(
		(distance: number, maxDistance: number) => {
			return calculateScale(distance, maxDistance, minScale, maxScale);
		},
		[minScale, maxScale]
	);

	const applyTransform = useCallback(() => {
		if (!elementRef.current) return;

		const element = elementRef.current;
		const rotation = currentRotationRef.current;
		const currentScale = scale;

		element.style.transform = `rotate(${rotation}deg) scale(${currentScale})`;
	}, [elementRef, scale]);

	const animate = useCallback(() => {
		const now = performance.now();
		const deltaTime = now - lastTimeRef.current;
		lastTimeRef.current = now;

		const degreesThisFrame = calculateRotationDelta(
			speed,
			rotationDirection,
			deltaTime
		);
		currentRotationRef.current += degreesThisFrame;
		currentRotationRef.current = normalizeAngle(currentRotationRef.current);

		applyTransform();

		animationRef.current = requestAnimationFrame(animate);
	}, [speed, rotationDirection, applyTransform]);

	const handleMouseMove = useCallback(
		(event: MouseEvent) => {
			if (!scalingEnabled) return;

			const mouseX = event.clientX;
			const mouseY = event.clientY;

			const distance = calculateDistance(mouseX, mouseY);
			const maxDistance = maxDistanceRef.current;
			const newScale = calculateScaleForDistance(distance, maxDistance);

			setScale(newScale);
		},
		[scalingEnabled, calculateScaleForDistance]
	);

	const handleResize = useCallback(() => {
		maxDistanceRef.current = calculateMaxDistance();
	}, []);

	useEffect(() => {
		animationRef.current = requestAnimationFrame(animate);

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
				animationRef.current = null;
			}
		};
	}, [animate]);

	useEffect(() => {
		if (scalingEnabled) {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("resize", handleResize);
		}

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("resize", handleResize);
		};
	}, [scalingEnabled, handleMouseMove, handleResize]);

	const toggleDirection = useCallback(() => {
		setRotationDirection((prev) => -prev as RotationDirection);
	}, []);

	return {
		elementRef,
		toggleDirection: toggleDirection,
	};
};
