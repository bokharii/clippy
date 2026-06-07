import { useState } from "react";
import type { Link } from "./types";
import "./App.css";

function App() {
  const [isFormVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
  });
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
  function handleClick() {
    setFormVisible((prev) => !prev);
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newLink = {
      id: crypto.randomUUID(),
      name: formData.name,
      url: formData.url,
    };
    setLinks([...links, newLink]);
    setFormData({
      name: "",
      url: "",
    });
    setFormVisible(false)
  }
  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <>
      <h1>Clippy</h1>
      <button onClick={handleClick}>Add New Clip</button>
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Clip Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            required
            onChange={handleFormChange}
          />
          <label htmlFor="url">Clip Content</label>
          <input
            type="text"
            id="url"
            name="url"
            value={formData.url}
            required
            onChange={handleFormChange}
          />
          <button>Create</button>
        </form>
      )}
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
