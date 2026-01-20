import useWindowStore from "#store/window";
import { X, Minus, Maximize, Minimize, Circle } from "lucide-react";

const WindowControls = ({ windowKey }) => {
  const {
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    currentWindowVal,
  } = useWindowStore();

  const { isMaximized } = currentWindowVal(windowKey);

  return (
    <div id="window-controls" className="group">
      <div className="close" onClick={() => closeWindow(windowKey)}>
        <X className="control-icon" size={15} strokeWidth={2.5} />
      </div>
      <div className="minimize" onClick={() => minimizeWindow(windowKey)}>
        <Minus className="control-icon" size={15} strokeWidth={2.5} />
      </div>
      <div className="maximize" onClick={() => toggleMaximizeWindow(windowKey)}>
        {isMaximized ? (
          <Minimize className="control-icon" size={15} strokeWidth={2.5} />
        ) : (
          <Maximize className="control-icon" size={15} strokeWidth={2.5} />
        )}
      </div>
    </div>
  );
};

export default WindowControls;
