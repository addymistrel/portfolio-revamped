import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import ReactMarkdown from "react-markdown";

const Markdown = ({ windowKey }) => {
  const { windows } = useWindowStore();
  const data = windows.mdfile?.data;

  if (!data) return null;

  const { name, content } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls windowKey={windowKey} showMinMax={false} />
        <h2>{name || "Untitled.md"}</h2>
      </div>

      <div className="md-content">
        <ReactMarkdown>{content || ""}</ReactMarkdown>
      </div>
    </>
  );
};

const MarkdownWindow = WindowWrapper(Markdown, "mdfile");

export default MarkdownWindow;
