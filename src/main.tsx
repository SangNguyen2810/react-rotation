import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ControlContextProvider from "@/contexts/ControlContext";

import "./index.css";
import App from "@/App";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ControlContextProvider>
			<App />
		</ControlContextProvider>
	</StrictMode>
);
