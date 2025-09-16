import React, { useState, useMemo } from "react";
import type { ReactNode } from "react";
import { ControlContext } from "./ControlContext";
import type { ControlState } from "./ControlContext";

interface ControlProviderProps {
	children: ReactNode;
}

const ControlProvider: React.FC<ControlProviderProps> = ({ children }) => {
	const [sidebarVisible, setSidebarVisible] = useState(false);
	const [rotationEnabled, setRotationEnabled] = useState(true);
	const [scalingEnabled, setScalingEnabled] = useState(true);
	const [timerEnabled, setTimerEnabled] = useState(true);

	const value: ControlState = useMemo(() => ({
		sidebarVisible,
		setSidebarVisible,
		rotationEnabled,
		setRotationEnabled,
		scalingEnabled,
		setScalingEnabled,
		timerEnabled,
		setTimerEnabled,
	}), [
		sidebarVisible,
		rotationEnabled,
		scalingEnabled,
		timerEnabled,
	]);

	return (
		<ControlContext.Provider value={value}>
			{children}
		</ControlContext.Provider>
	);
};

export default ControlProvider;

