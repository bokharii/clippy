import { useState } from "react";
import type { Link } from "./types";
import "./App.css";

function App() {
  const [links, setLinks] = useState<Link[]>([
    {
      id: crypto.randomUUID(),
      name: "GitHub",
      url: "https://github.com/bokharii",
    },
    {
      id: crypto.randomUUID(),
      name: "LinkedIn",
      url: "https://github.com/bokharii",
    },
  ]);
  function handleClick() {}

  return (
    <>
      <h1>Clippy</h1>
      <button onClick={handleClick}>Add Link</button>
      {links.map((link) => (
        <div key={link.id} className="link-row">
          {link.name}: {link.url}
          <button>Copy</button>
          <button>Delete</button>
        </div>
      ))}
    </>
  );
}

export default App;
