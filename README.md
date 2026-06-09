# Clippy

A Chrome extension for saving and copying links you use all the time.

I've been applying to a lot of roles recently, and many applications ask for the same links — LinkedIn, GitHub, portfolio, and so on. Clippy keeps those clips in one place so you can copy any of them in a click, without digging through bookmarks or old messages.

<img width="379" height="491" alt="Screenshot 2026-06-09 at 3 57 55 PM" src="https://github.com/user-attachments/assets/51cd84a2-704c-40dc-94fa-26ec965b41e5" />

## Features

- **Save up to 5 clips** — each with a name and URL
- **One-click copy** — copy any clip to your clipboard from the popup
- **Persistent storage** — clips survive closing the popup, restarting Chrome, and rebooting your machine
- **Delete clips** — remove ones you no longer need
- **Clip counter** — see how many slots you're using at a glance (`3/5 clips`)

## Getting Started

### Prerequisites

- Node.js 22+ (recommended)
- Google Chrome

### Install dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Then load the extension in Chrome:

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `.output/chrome-mv3-dev` folder in this project

> For me the `.output` folder was hidden by default. In the file picker, press **Cmd + Shift + G** and paste the full path to `chrome-mv3-dev`.

Keep `npm run dev` running while you work. After code changes, reload the extension from `chrome://extensions`.

## Usage

1. Click the Clippy icon in your Chrome toolbar
2. Hit **Add New Clip** and enter a name and URL
3. Click **Copy** next to any clip when you need it
4. Click **Delete** to remove a clip

Clips are stored locally in your browser profile — they don't sync across devices or Chrome accounts.
