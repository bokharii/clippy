import { useState, useEffect } from "react";
import type { Link } from "./types";
import "./App.css";

function App() {
  const MAX_LINKS = 5;
  const [isCopied, setIsCopied] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
  });
  const [links, setLinks] = useState<Link[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isLimitReached, setIsLimitReached] = useState(false);

  useEffect(() => {
    async function getLinksFromLocalStorage() {
      const result = await browser.storage.local.get("links");
      setLinks((result.links as Link[] | undefined) ?? []);
      setLoaded(true);
    }
    getLinksFromLocalStorage();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    browser.storage.local.set({ links });
  }, [links, loaded]);

  function handleClick() {
    setFormVisible((prev) => !prev);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // check if the user has more than 5 links - if they do, then we want to tell them that they are at capacity
    if (links.length >= MAX_LINKS) {
      setIsLimitReached(true);
      setTimeout(() => {
        setIsLimitReached(false);
      }, 1500);
      return;
    }
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
    setFormVisible(false);
  }

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleDelete(linkId: string) {
    const updatedLinks = links.filter((link) => link.id !== linkId);
    setLinks(updatedLinks);
  }

  async function handleCopy(linkUrl: string) {
    try {
      await navigator.clipboard.writeText(linkUrl);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } catch (error) {
      console.log("Error copying link", error);
    }
  }

  return (
    <div className="clipboard">
      <header className="clipboard-header">
        <h1>Clippy</h1>
        <p className="clip-count">
          {links.length}/{MAX_LINKS} clips
        </p>
      </header>

      {isCopied && <p className="toast toast-success">Copied!</p>}
      {isLimitReached && (
        <p className="toast toast-error">
          You can only have 5 active clips at a time.
        </p>
      )}

      <button
        className="btn btn-primary"
        onClick={handleClick}
        disabled={links.length >= MAX_LINKS}
      >
        Add New Clip
      </button>

      {isFormVisible && (
        <form className="clip-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Clip Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            required
            onChange={handleFormChange}
          />
          <label htmlFor="url">Clip URL</label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            required
            onChange={handleFormChange}
            placeholder="https://"
          />
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      )}

      {links.length === 0 ? (
        <p className="empty-state">No clips yet. Add your first link above.</p>
      ) : (
        <ul className="link-list">
          {links.map((link) => (
            <li key={link.id} className="link-row">
              <div className="link-info">
                <span className="link-name">{link.name}</span>
                <span className="link-url">{link.url}</span>
              </div>
              <div className="link-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => handleCopy(link.url)}
                >
                  Copy
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(link.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
