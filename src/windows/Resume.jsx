import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";

const Resume = ({ windowKey }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentWindowVal } = useWindowStore();
  const { isMaximized } = currentWindowVal(windowKey);

  // Different zoom levels for normal and maximized views
  const zoomLevel = isMaximized ? 100 : 75;

  return (
    <div className="flex flex-col h-full">
      <div id="window-header">
        <WindowControls windowKey="resume" />
        <h2>Resume.pdf</h2>

        <a
          href="files/resume.pdf"
          download
          className="cursor-pointer"
          title="Download Resume"
        >
          <Download className="icon cursor-pointer" />
        </a>
      </div>

      <div className="relative flex-1">
        {isLoading && (
          <div className="absolute inset-0 flex-center bg-white">
            <Loader2 className="size-8 animate-spin text-gray-400" />
          </div>
        )}
        <iframe
          src={`files/resume.pdf#zoom=${zoomLevel}`}
          title="Resume"
          className="w-full h-full border-none"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;
