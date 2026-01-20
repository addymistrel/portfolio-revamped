import { WindowControls } from "#components";
import { photosLinks, gallery } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const Photos = ({ windowKey }) => {
  const { openWindow } = useWindowStore();
  const [activeFilter, setActiveFilter] = useState(null);

  const filteredGallery = activeFilter
    ? gallery.filter((item) => item.category === activeFilter)
    : gallery;

  const handleImageClick = (item) => {
    openWindow("imgfile", {
      name: item.title,
      imageUrl: item.img,
    });
  };

  return (
    <>
      <div id="window-header">
        <WindowControls windowKey={windowKey} />

        <div className="flex items-center gap-1 ml-5">
          <ChevronLeft className="icon" />
          <ChevronRight className="icon" />
        </div>

        <h2>Gallery</h2>

        <div className="flex items-center gap-3">
          <Search className="icon" />
        </div>
      </div>

      <div className="bg-white flex h-full">
        <aside className="sidebar">
          <h2>Library</h2>
          <ul>
            <li
              className={clsx(!activeFilter && "active")}
              onClick={() => setActiveFilter(null)}
            >
              <img src="/icons/gicon1.svg" alt="All" />
              <p>All</p>
            </li>
            {photosLinks.map(({ id, icon, title, filter }) => (
              <li
                key={id}
                className={clsx(activeFilter === filter && "active")}
                onClick={() => setActiveFilter(filter)}
              >
                <img src={icon} alt={title} />
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </aside>

        <div className="gallery">
          <ul>
            {filteredGallery.map((item) => (
              <li key={item.id} onClick={() => handleImageClick(item)}>
                <img src={item.img} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const PhotosWindow = WindowWrapper(Photos, "photos");

export default PhotosWindow;
