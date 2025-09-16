import { useContext } from "react";
import { ControlContext } from "./ControlContext";



export const useControlContext = () => {
	const context = useContext(ControlContext);
	if (context === undefined) {
		throw new Error("useControlContext must be used within a ControlProvider");
	}
	return context;
};
