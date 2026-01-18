import useWindowStore from "#store/window";
import { X, Minus, Plus } from "lucide-react";

const WindowControls = ({ windowKey }) => {
  const { closeWindow, minimizeWindow, toggleMaximizeWindow } =
    useWindowStore();

  return (
    <div id="window-controls" className="group">
      <div className="close" onClick={() => closeWindow(windowKey)}>
        <X className="control-icon" size={10} strokeWidth={2.5} />
      </div>
      <div className="minimize" onClick={() => minimizeWindow(windowKey)}>
        <Minus className="control-icon" size={10} strokeWidth={2.5} />
      </div>
      <div className="maximize" onClick={() => toggleMaximizeWindow(windowKey)}>
        <Plus className="control-icon" size={10} strokeWidth={2.5} />
      </div>
    </div>
  );
};

export default WindowControls;
