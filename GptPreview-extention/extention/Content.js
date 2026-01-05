console.log("✅ Demo Extension is working!");

// ------------------------------
// Shadow DOM container
// ------------------------------
const shadowHost = document.createElement("div");
shadowHost.id = "shadow-extension-preview";
document.documentElement.appendChild(shadowHost);

const shadowRoot = shadowHost.attachShadow({ mode: "open" });

// ------------------------------
// Shadow UI (POLISHED)
// ------------------------------
shadowRoot.innerHTML = `
  <style>
    #previewDiv {
      display: none;
      flex-direction: column;
      position: fixed;
      top: 4vh;
      right: 4vw;
      width: 92vw;
      height: 92vh;
      max-width: 1100px;
      max-height: 720px;
      background: #0f1115;
      z-index: 999999;
      box-shadow: 0 30px 80px rgba(0,0,0,0.7);
      border-radius: 14px;
      padding: 10px;
      gap: 10px;
      overflow: auto;
    }

    #topBar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px 6px;
    }

    #viewToggles {
      display: flex;
      gap: 6px;
    }

    .iconBtn {
      width: 32px;
      height: 32px;
      background: #1c1f26;
      border: 1px solid #2a2f3a;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .iconBtn svg {
      width: 16px;
      height: 16px;
      stroke: #cfd3da;
    }

    .iconBtn.active {
      background: #4caf50;
      border-color: #4caf50;
    }

    .iconBtn.active svg {
      stroke: #000;
    }

    .iconBtn:hover {
      background: #262b36;
    }

    #closeBtn {
      background: #1c1f26;
      border: 1px solid #2a2f3a;
    }

    #closeBtn:hover {
      background: #2b303b;
    }

    #iframeWrapper {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #0f1115;
      border-radius: 12px;
      padding: 0.5px;
      border: 1px solid #242836;
    }

    iframe {
      border: none;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.55);
      transition: width 0.25s ease, height 0.25s ease;
    }
  </style>

  <div id="previewDiv">
    <div id="topBar">
      <div id="viewToggles">
        <button class="iconBtn active" id="desktopBtn" title="Desktop">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2">
            <rect x="3" y="4" width="18" height="12" rx="2"/>
            <path d="M8 20h8M12 16v4"/>
          </svg>
        </button>
        <button class="iconBtn" id="mobileBtn" title="Mobile">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2">
            <rect x="7" y="2" width="10" height="20" rx="2"/>
            <circle cx="12" cy="18" r="1"/>
          </svg>
        </button>
      </div>

      <button class="iconBtn" id="closeBtn" title="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <div id="iframeWrapper">
      <iframe sandbox="allow-scripts"></iframe>
    </div>
  </div>
`;

// ------------------------------
// Refs
// ------------------------------
const previewDiv = shadowRoot.querySelector("#previewDiv");
const iframe = shadowRoot.querySelector("iframe");
const closeBtn = shadowRoot.querySelector("#closeBtn");
const desktopBtn = shadowRoot.querySelector("#desktopBtn");
const mobileBtn = shadowRoot.querySelector("#mobileBtn");

// ------------------------------
// View toggle logic
// ------------------------------
const setDesktopView = () => {
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  desktopBtn.classList.add("active");
  mobileBtn.classList.remove("active");
};

const setMobileView = () => {
  iframe.style.width = "375px";
  iframe.style.height = "667px";
  mobileBtn.classList.add("active");
  desktopBtn.classList.remove("active");
};

desktopBtn.onclick = setDesktopView;
mobileBtn.onclick = setMobileView;

closeBtn.onclick = () => {
  previewDiv.style.display = "none";
  iframe.srcdoc = "";
  setDesktopView();
};

// ------------------------------
// Green icon buttons (outside)
// ------------------------------
const styleIconButton = (btn) => {
  btn.style.cssText = `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
    margin-right: 6px;
    width: 28px;
    height: 28px;
    background: #4caf50;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  `;
};

const eyeIcon = `
<svg width="16" height="16" viewBox="0 0 24 24" fill="none"
 stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
 <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
 <circle cx="12" cy="12" r="3"/>
</svg>
`;

const openIcon = `
<svg width="16" height="16" viewBox="0 0 24 24" fill="none"
 stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
 <path d="M14 3h7v7"/>
 <path d="M10 14L21 3"/>
</svg>
`;

// ------------------------------
// Attach preview buttons (HTML detect)
// ------------------------------
const attachPreviewButtons = () => {
  document.querySelectorAll("pre code").forEach((code) => {
    const parent = code.parentElement;
    if (parent.dataset.previewAdded) return;

    const text = code.textContent.trim();

    const looksLikeHTML =
      text.startsWith("<") &&
      /<\/?[a-z][\s\S]*>/i.test(text);

    if (!looksLikeHTML) return;

    parent.dataset.previewAdded = "true";

    const quickBtn = document.createElement("button");
    quickBtn.innerHTML = eyeIcon;
    styleIconButton(quickBtn);
    quickBtn.onclick = () => {
      iframe.srcdoc = text;
      previewDiv.style.display = "flex";
      setDesktopView();
    };

    const fullBtn = document.createElement("button");
    fullBtn.innerHTML = openIcon;
    styleIconButton(fullBtn);
    fullBtn.onclick = () => {
      chrome.runtime.sendMessage(
        { type: "SAVE_CODE", payload: { code: text } },
        (res) => {
          if (!res || res.error) return;
          window.open(
            `https://gptpreview.vercel.app?id=${res.previewID}`
          );
        }
      );
    };

    parent.appendChild(quickBtn);
    parent.appendChild(fullBtn);
  });
};

// ------------------------------
const observer = new MutationObserver(attachPreviewButtons);
observer.observe(document.body, { childList: true, subtree: true });
attachPreviewButtons();
