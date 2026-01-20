import { Navbar, Welcome, Dock } from "#components";
import {
  Terminal,
  Safari,
  Resume,
  Finder,
  Text,
  Markdown,
  Image,
  Contact,
} from "#windows";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Markdown />
      <Image />
      <Contact />
    </main>
  );
};

export default App;
