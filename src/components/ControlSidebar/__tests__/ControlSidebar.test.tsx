import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ControlSidebar from "../ControlSidebar";
import { ControlContext } from "@/contexts/ControlContext";

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

const renderWithProvider = (contextValue = mockContextValue) => {
	return render(
		<ControlContext.Provider value={contextValue}>
			<ControlSidebar />
		</ControlContext.Provider>
	);
};

describe("ControlSidebar", () => {
	it("should render toggle button", () => {
		renderWithProvider();
		const toggleButton = screen.getByRole("button", {
			name: "Toggle control panel",
		});
		expect(toggleButton).toBeDefined();
		expect(toggleButton.className).toContain("sidebar-toggle");
		expect(toggleButton.textContent).toBe("⚙️");
	});

	it("should render sidebar with correct structure", () => {
		renderWithProvider();
		const sidebar = screen.getByRole("complementary");
		expect(sidebar).toBeDefined();
		expect(sidebar.className).toContain("control-sidebar");
	});

	it("should render sidebar header with title and close button", () => {
		renderWithProvider();
		expect(screen.getByText("Control Panel")).toBeDefined();
		const closeButton = screen.getByRole("button", {
			name: "Close control panel",
		});
		expect(closeButton).toBeDefined();
		expect(closeButton.className).toContain("close-button");
		expect(closeButton.textContent).toBe("×");
	});

	it("should render all control sections", () => {
		renderWithProvider();
		expect(screen.getByText("Rotation")).toBeDefined();
		expect(screen.getByText("Size Scaling")).toBeDefined();
		expect(screen.getByText("Idle Timer")).toBeDefined();
	});

	it("should show sidebar as visible when sidebarVisible is true", () => {
		const contextWithVisibleSidebar = {
			...mockContextValue,
			sidebarVisible: true,
		};

		renderWithProvider(contextWithVisibleSidebar);

		const sidebar = screen.getByRole("complementary");
		expect(sidebar.className).toContain("visible");
	});

	it("should not show sidebar as visible when sidebarVisible is false", () => {
		renderWithProvider();

		const sidebar = screen.getByRole("complementary");
		expect(sidebar.className).not.toContain("visible");
	});

	it("should have proper accessibility attributes", () => {
		renderWithProvider();



		const toggleButton = screen.getByRole("button", {
			name: "Toggle control panel",
		});
		expect(toggleButton.getAttribute("aria-label")).toBe(
			"Toggle control panel"
		);



		const closeButton = screen.getByRole("button", {
			name: "Close control panel",
		});
		expect(closeButton.getAttribute("aria-label")).toBe("Close control panel");

		const sidebar = screen.getByRole("complementary");
		expect(sidebar).toBeDefined();
	});
});
