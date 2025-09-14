import { useRef, useEffect, useCallback, useState } from 'react';
import type { 
  RotationDirection, 
  UseRotationOptions, 
  UseRotationReturn 
} from '../types/rotation';

export const useRotation = <T extends HTMLElement>(
  options: UseRotationOptions<T>
): UseRotationReturn<T> => {
  const {
    speed = 120,
    initialDirection = 1,
    elementRef
  } = options;

  const animationRef = useRef<number | null>(null);
  const currentRotationRef = useRef(0);
  const [rotationDirection, setRotationDirection] = useState<RotationDirection>(initialDirection);
  const [isAnimating, setIsAnimating] = useState(true);

  const animate = useCallback(() => {
    if (!isAnimating) return;

    const degreesPerFrame = (speed * rotationDirection) / 60;
    currentRotationRef.current += degreesPerFrame;
    
    currentRotationRef.current = currentRotationRef.current % 360;

    if (elementRef.current) {
      elementRef.current.style.transform = `rotate(${currentRotationRef.current}deg)`;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [rotationDirection, speed, isAnimating, elementRef]);

  const toggleDirection = useCallback(() => {
    setRotationDirection(prev => -prev as RotationDirection);
  }, []);

  const setDirection = useCallback((direction: RotationDirection) => {
    setRotationDirection(direction);
  }, []);

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
  }, []);

  const stopAnimation = useCallback(() => {
    setIsAnimating(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isAnimating) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, isAnimating]);

  return {
    elementRef,
    rotationDirection,
    toggleDirection,
    setDirection,
    isAnimating,
    startAnimation,
    stopAnimation,
    currentRotation: currentRotationRef.current
  };
};
