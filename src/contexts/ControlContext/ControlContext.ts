import { createContext } from "react";


export interface ControlState {
	sidebarVisible: boolean;
	setSidebarVisible: (visible: boolean) => void;
	rotationEnabled: boolean;
	setRotationEnabled: (enabled: boolean) => void;
	scalingEnabled: boolean;
	setScalingEnabled: (enabled: boolean) => void;
	timerEnabled: boolean;
	setTimerEnabled: (enabled: boolean) => void;
}

export const ControlContext = createContext<ControlState>({
	sidebarVisible: false,
	setSidebarVisible: () => {},
	rotationEnabled: true,
	setRotationEnabled: () => {},
	scalingEnabled: true,
	setScalingEnabled: () => {},
	timerEnabled: true,
	setTimerEnabled: () => {},
});
