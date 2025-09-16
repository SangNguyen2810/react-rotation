import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useControlContext } from '../useControlContext'
import { ControlContext } from "../ControlContext";

describe("useControlContext", () => {
	it("should return context value when used within provider", () => {
		const mockContextValue = {
			sidebarVisible: true,
			setSidebarVisible: vi.fn(),
			rotationEnabled: false,
			setRotationEnabled: vi.fn(),
			scalingEnabled: true,
			setScalingEnabled: vi.fn(),
			timerEnabled: false,
			setTimerEnabled: vi.fn(),
		};

		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<ControlContext.Provider value={mockContextValue}>
				{children}
			</ControlContext.Provider>
		);

		const { result } = renderHook(() => useControlContext(), { wrapper });

		expect(result.current).toEqual(mockContextValue);
	});
  
	it("should return all required properties", () => {
		const mockContextValue = {
			sidebarVisible: false,
			setSidebarVisible: vi.fn(),
			rotationEnabled: true,
			setRotationEnabled: vi.fn(),
			scalingEnabled: true,
			setScalingEnabled: vi.fn(),
			timerEnabled: true,
			setTimerEnabled: vi.fn(),
		};

		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<ControlContext.Provider value={mockContextValue}>
				{children}
			</ControlContext.Provider>
		);

		const { result } = renderHook(() => useControlContext(), { wrapper });

		expect(result.current).toHaveProperty("sidebarVisible");
		expect(result.current).toHaveProperty("setSidebarVisible");
		expect(result.current).toHaveProperty("rotationEnabled");
		expect(result.current).toHaveProperty("setRotationEnabled");
		expect(result.current).toHaveProperty("scalingEnabled");
		expect(result.current).toHaveProperty("setScalingEnabled");
		expect(result.current).toHaveProperty("timerEnabled");
		expect(result.current).toHaveProperty("setTimerEnabled");
	});
});
