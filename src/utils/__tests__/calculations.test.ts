import { describe, it, expect, beforeEach } from 'vitest';
import {
  calculateMaxDistance,
  calculateDistance,
  calculateScale,
  normalizeAngle,
  calculateRotationDelta,
  formatTime,
} from '../calculations';

describe('Utility Functions', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1080,
    });
  });

  describe('calculateMaxDistance', () => {
    it('should calculate diagonal distance using provided dimensions', () => {
      const result = calculateMaxDistance(800, 600);
      const expected = Math.sqrt(800 * 800 + 600 * 600);
      expect(result).toBeCloseTo(expected, 5);
    });

    it('should use window dimensions when no params provided', () => {
      const result = calculateMaxDistance();
      const expected = Math.sqrt(1920 * 1920 + 1080 * 1080);
      expect(result).toBeCloseTo(expected, 5);
    });

    it('should handle zero dimensions', () => {
      expect(calculateMaxDistance(0, 0)).toBe(0);
    });
  });

  describe('calculateDistance', () => {
    it('should calculate distance from origin correctly', () => {
      expect(calculateDistance(3, 4)).toBe(5); // 3-4-5 triangle
      expect(calculateDistance(0, 0)).toBe(0);
    });

    it('should handle negative coordinates', () => {
      expect(calculateDistance(-3, -4)).toBe(5);
    });

    it('should handle decimal coordinates', () => {
      const result = calculateDistance(1.5, 2.5);
      const expected = Math.sqrt(1.5 * 1.5 + 2.5 * 2.5);
      expect(result).toBeCloseTo(expected, 5);
    });
  });

  describe('calculateScale', () => {
    it('should return minScale when distance is 0', () => {
      expect(calculateScale(0, 100, 0.5, 2.0)).toBe(0.5);
    });

    it('should return maxScale when distance equals maxDistance', () => {
      expect(calculateScale(100, 100, 0.5, 2.0)).toBe(2.0);
    });

    it('should return midpoint scale when distance is half of maxDistance', () => {
      expect(calculateScale(50, 100, 0.5, 2.0)).toBe(1.25);
    });
  });

  describe('normalizeAngle', () => {
    it('should return angle unchanged when between 0 and 360', () => {
      expect(normalizeAngle(180)).toBe(180);
    });

    it('should normalize positive angles greater than 360', () => {
      expect(normalizeAngle(450)).toBe(90);
    });

    it('should normalize negative angles', () => {
      expect(normalizeAngle(-90)).toBe(270);
    });
  });

  describe('calculateRotationDelta', () => {
    it('should calculate rotation delta correctly', () => {
      expect(calculateRotationDelta(60, 1, 1000)).toBe(60);
      expect(calculateRotationDelta(60, -1, 1000)).toBe(-60);
    });

    it('should handle zero speed', () => {
      expect(calculateRotationDelta(0, 1, 1000)).toBe(0);
    });

    it('should handle zero deltaTime', () => {
      expect(calculateRotationDelta(60, 1, 0)).toBe(0);
    });
  });

  describe('formatTime', () => {
    it('should format time in seconds', () => {
      expect(formatTime(1000, 'seconds')).toBe('1.0s');
      expect(formatTime(1500, 'seconds')).toBe('1.5s');
    });

    it('should format time in milliseconds', () => {
      expect(formatTime(1000, 'milliseconds')).toBe('1000ms');
      expect(formatTime(1500, 'milliseconds')).toBe('1500ms');
    });

    it('should format time in default format', () => {
      expect(formatTime(1000)).toBe('1.0');
      expect(formatTime(60000)).toBe('1:00.0');
    });
  });
});
