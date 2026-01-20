import { Navbar, Welcome, Dock, Home } from "#components";
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
      <Home />
    </main>
  );
};

export default App;
