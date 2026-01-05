console.log("✅ Demo Extension is working!");

// ------------------------------
// Shadow DOM container (for preview panel only)
// ------------------------------
const shadowHost = document.createElement("div");
shadowHost.id = "shadow-extension-preview";
document.body.appendChild(shadowHost);

const shadowRoot = shadowHost.attachShadow({ mode: "open" });

// Shadow DOM UI + styles
shadowRoot.innerHTML = `
  <style>
    #previewDiv {
      display: none;
      flex-direction: column;
      align-items: flex-end;
      position: fixed;
      top: 20px;
      right: 20px;
      height: 550px;
      width: 850px;
      background: rgb(206, 89, 89);
      z-index: 9999;
      box-shadow: 0 0 10px rgba(0,0,0,0.3);
      border-radius: 6px;
      padding: 6px;
      overflow: hidden;
    }

    #closeBtn {
      margin-bottom: 6px;
      padding: 6px 12px;
      background-color: #2964d1;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    #previewContent {
      background: white;
      width: 100%;
      height: 100%;
      padding: 10px;
      overflow: auto;
      border-radius: 5px;
    }
  </style>

  <div id="previewDiv">
    <button id="closeBtn">Close</button>
    <div id="previewContent"></div>
  </div>
`;

// Shadow DOM refs
const previewDiv = shadowRoot.querySelector("#previewDiv");
const previewContent = shadowRoot.querySelector("#previewContent");
const closeBtn = shadowRoot.querySelector("#closeBtn");

closeBtn.addEventListener("click", () => {
  previewDiv.style.display = "none";
});

// ------------------------------
// Helper: style buttons INLINE
// ------------------------------
const styleButton = (btn) => {
  btn.style.cssText = `
    display: block;
    margin-top: 10px;
    padding: 6px 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
  `;
};

// ------------------------------
// Main logic
// ------------------------------
const preview = () => {
  const codeBlocks = document.querySelectorAll("pre code");

  codeBlocks.forEach((code) => {
    if (code.parentElement.querySelector(".preview-btn")) return;

    // ---- Quick Preview Button
    const quickBtn = document.createElement("button");
    quickBtn.textContent = "Quick Preview";
    quickBtn.className = "preview-btn";
    styleButton(quickBtn);
    code.parentElement.appendChild(quickBtn);

    quickBtn.addEventListener("click", () => {
      previewContent.innerHTML = code.innerText;
      previewDiv.style.display = "flex";
    });

    // ---- Full Preview Button
    const fullBtn = document.createElement("button");
    fullBtn.textContent = "Full Preview";
    fullBtn.className = "preview-btn";
    styleButton(fullBtn);
    code.parentElement.appendChild(fullBtn);

    fullBtn.addEventListener("click", () => {
      chrome.runtime.sendMessage(
        {
          type: "SAVE_CODE",
          payload: { code: code.innerText }
        },
        (response) => {
          if (response?.error) {
            console.error("❌ Error:", response.error);
            return;
          }

          const previewUrl = `http://localhost:5173?id=${response.previewID}`;
          window.open(previewUrl, "_blank");
        }
      );
    });
  });
};

// Run once + keep watching for dynamic content
preview();
setInterval(preview, 2000);
