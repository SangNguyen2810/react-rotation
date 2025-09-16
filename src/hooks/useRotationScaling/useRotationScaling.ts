import { useRef, useEffect, useCallback, useState } from "react";
import {
	DEFAULT_SPEED,
	DEFAULT_INITIAL_DIRECTION,
	MIN_SCALE,
	MAX_SCALE,
} from "@/constants/react-icon-rotation";
import {
	calculateMaxDistance,
	calculateDistance,
	calculateScale,
	normalizeAngle,
	calculateRotationDelta,
} from "@/utils";
import { useControlContext } from "@/contexts/ControlContext/useControlContext";

export interface UseRotationScalingOptions<T> {
	speed?: number;
	initialDirection?: RotationDirection;
	elementRef: React.RefObject<T | null>;
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
		minScale: initialMinScale = MIN_SCALE,
		maxScale: initialMaxScale = MAX_SCALE,
	} = options;

	const { rotationEnabled, scalingEnabled } = useControlContext();

	const [rotationDirection, setRotationDirection] =
		useState<RotationDirection>(initialDirection);
	const [scale, setScale] = useState(1);

	const lastTimeRef = useRef(performance.now());
	const maxDistanceRef = useRef(calculateMaxDistance());
	const animationRef = useRef<number | null>(null);
	const currentRotationRef = useRef(0);
	
	const calculateScaleForDistance = useCallback(
		(distance: number, maxDistance: number) => {
			return calculateScale(
				distance,
				maxDistance,
				initialMinScale,
				initialMaxScale
			);
		},
		[initialMinScale, initialMaxScale]
	);

	const applyTransform = useCallback(() => {
		if (!elementRef.current) return;

		const element = elementRef.current;
		const rotation = currentRotationRef.current;

		element.style.transform = `rotate(${rotation}deg) scale(${scale})`;
	}, [elementRef, scale]);

	const animate = useCallback(() => {
		const now = performance.now();
		const deltaTime = now - lastTimeRef.current;
		lastTimeRef.current = now;

		if (rotationEnabled) {
			const degreesThisFrame = calculateRotationDelta(
				speed,
				rotationDirection,
				deltaTime
			);
			currentRotationRef.current += degreesThisFrame;
			currentRotationRef.current = normalizeAngle(currentRotationRef.current);
		}

		applyTransform();

		animationRef.current = requestAnimationFrame(animate);
	}, [speed, rotationDirection, applyTransform, rotationEnabled]);

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

	const toggleDirection = useCallback(() => {
		if (rotationEnabled) {
			setRotationDirection((prev) => -prev as RotationDirection);
		}
	}, [rotationEnabled]);

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

	return {
		elementRef,
		toggleDirection,
	};
};
