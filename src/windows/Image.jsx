import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

const Image = ({ windowKey }) => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;

  if (!data) return null;

  const { name, imageUrl, subtitle } = data;
  // Support both 'imageUrl' (from existing data) and 'src' (from new data)
  const imageSrc = imageUrl || data.src;

  return (
    <>
      <div id="window-header">
        <WindowControls windowKey={windowKey} showMinMax={false} />
        <p>{name || "Image"}</p>
        {subtitle && <span className="img-subtitle">{subtitle}</span>}
      </div>

      <div className="preview">
        {imageSrc && <img src={imageSrc} alt={name || "Image preview"} />}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, "imgfile");

export default ImageWindow;
