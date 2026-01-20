import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

const Text = ({ windowKey }) => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  if (!data) return null;

  const { name, image, subtitle, description } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls windowKey={windowKey} showMinMax={false} />
        <h2>{name || "Untitled"}</h2>
      </div>

      <div className="txt-content">
        {image && (
          <div className="txt-image">
            <img src={image} alt={name} />
          </div>
        )}

        {subtitle && <h3 className="txt-subtitle">{subtitle}</h3>}

        {description && description.length > 0 && (
          <div className="txt-description">
            {description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
