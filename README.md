# GPTCodePreview

<p align="center">
  <img src="./GptPreview-landingPage/public/gptPreview.png" alt="GPTCodePreview Architecture" width="250" />
</p>

A Chrome extension + preview website that adds **Quick Preview** and **Full Preview** buttons to code blocks on AI chat platforms, allowing users to safely preview **HTML, CSS, and JavaScript** output in a sandboxed environment.

---

## 🚩 Problem

AI chat platforms generate frontend code frequently, but they **do not provide a reliable way to preview it**:

* No live rendering of HTML/CSS/JS
* Copy–paste required to test code
* Running JavaScript directly on AI pages is unsafe

This project solves that by providing **one‑click previews** without compromising security.

---

## ✅ What This Project Does

* Detects code blocks (`<pre><code>`) on AI chat websites
* Injects two buttons near each code block:

  * **Quick Preview** → lightweight inline preview
  * **Full Preview** → full sandboxed execution
* Safely executes code in an **isolated iframe**
* Uses a temporary backend to avoid long URLs
* Automatically deletes old previews to prevent storage growth

---

## 🧠 How It Works (High Level Flow)

1. **Content Script** scans the page for code blocks
2. Preview buttons are injected into the UI
3. On **Full Preview**:

   * Code is sent to the background service worker
   * Stored temporarily in Supabase
   * A preview website is opened with a short ID
4. The **Preview Website**:

   * Fetches the code using the ID
   * Renders it inside a sandboxed iframe
5. A cron job automatically deletes expired previews

---

**Main Components:**

* **Chrome Extension (MV3)**

  * `content.js` → UI injection + code extraction
  * `background.js` → Supabase communication

* **Supabase**

  * Temporary code storage
  * Auto‑cleanup using database cron jobs

* **Preview Website (React + Vite)**

  * Fetches code using preview ID
  * Executes code safely inside a sandboxed iframe

---

## 🔐 Security Design

Security is a core design goal:

* ❌ User JavaScript never runs inside the AI page
* ❌ User JavaScript never runs inside the extension context
* ✅ Code executes only inside a **sandboxed iframe**
* ✅ No persistent storage of user data
* ✅ Automatic cleanup of preview data

Iframe configuration:

```html
sandbox="allow-scripts"
```

---

## 📁 Project Structure

```
GPTCODEPREVIEW/
├── GptPreview-extension/
│   ├── extension/
│   │   ├── background.js
│   │   ├── content.js
│   │   ├── manifest.json
│   │   └── icons/
│   │       └── img.png
│   └── ext-bundle/
│
├── GptPreview-landingPage/
│   ├── public/
│   │   └── img.png   # architecture image
│   ├── src/
│   │   ├── App.jsx
│   │   ├── home.jsx
│   │   ├── preview.jsx
│   │   └── supabase.js
│   └── index.html
│
└── README.md
```

---

## ⚙️ Technologies Used

* Chrome Extensions (Manifest V3)
* JavaScript (ES Modules)
* Supabase (PostgreSQL + cron jobs)
* React + Vite
* Sandboxed iframes

---

## 🧹 Auto Cleanup Strategy

To prevent unlimited database growth:

* Each preview includes a `created_at` timestamp
* A Supabase cron job deletes previews older than a fixed duration
* Cleanup runs automatically without user interaction

---

## 🔒 Privacy

* No personal data is collected
* Preview code is stored temporarily only
* Data is automatically deleted after expiration
* No analytics or user tracking

---

## 🧪 Development Usage

### Load the Chrome extension locally

1. Open `chrome://extensions`
2. Enable **Developer Mode**
3. Click **Load unpacked**
4. Select the `GptPreview-extension/extension` folder

### Run the preview website locally

```bash
npm install
npm run dev
```

---

## 🚀 Deployment

* Preview website can be deployed on platforms like **Vercel**
* Extension redirects users to the deployed preview URL
* Supabase allowed origins include the deployed domain

---

## 📌 Limitations (By Design)

* This is a preview tool, not a full IDE

* No persistent preview history

* No authentication system

* Code must be provided as a **single HTML file** (inline CSS/JS), not multiple files or imports

These decisions keep the project **simple, fast, and secure**.

---

## 📜 License

MIT License
