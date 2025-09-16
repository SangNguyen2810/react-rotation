import React from "react";
import { useControlContext } from "@/contexts/ControlContext/useControlContext";
import "./ControlSidebar.css";

const ControlSidebar: React.FC = () => {
	const {
		sidebarVisible,
		setSidebarVisible,
		rotationEnabled,
		setRotationEnabled,
		scalingEnabled,
		setScalingEnabled,
		timerEnabled,
		setTimerEnabled,
	} = useControlContext();
	return (
		<>
			<button
				className="sidebar-toggle"
				onClick={() => setSidebarVisible(!sidebarVisible)}
				aria-label="Toggle control panel"
			>
				⚙️
			</button>

			<aside className={`control-sidebar ${sidebarVisible ? "visible" : ""}`}>
				<section className="sidebar-header">
					<h3>Control Panel</h3>
					<button
						className="close-button"
						onClick={() => setSidebarVisible(false)}
						aria-label="Close control panel"
					>
						×
					</button>
				</section>

				<article className="sidebar-content">
					<section className="control-section">
						<div className="control-header">
							<label className="control-label">
								<input
									type="checkbox"
									checked={rotationEnabled}
									onChange={() => setRotationEnabled(!rotationEnabled)}
								/>
								<span>Rotation</span>
							</label>
						</div>
					</section>

					<section className="control-section">
						<div className="control-header">
							<label className="control-label">
								<input
									type="checkbox"
									checked={scalingEnabled}
									onChange={() => setScalingEnabled(!scalingEnabled)}
								/>
								<span>Size Scaling</span>
							</label>
						</div>
					</section>

					<section className="control-section">
						<div className="control-header">
							<label className="control-label">
								<input
									type="checkbox"
									checked={timerEnabled}
									onChange={() => setTimerEnabled(!timerEnabled)}
								/>
								<span>Idle Timer</span>
							</label>
						</div>
					</section>
				</article>
			</aside>
		</>
	);
};

export default ControlSidebar;
