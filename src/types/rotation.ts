
export type RotationDirection = 1 | -1;

export interface UseRotationOptions<T> {
  speed?: number;
  initialDirection?: RotationDirection;
  elementRef: React.RefObject<T | null>;
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

export interface AnimationConfig {
  speed: number;
  direction: RotationDirection;
  isActive: boolean;
}

export type RotationEventHandler = (config: AnimationConfig) => void;
