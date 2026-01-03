console.log("✅ Demo Extension is working!");

// Create host container
const shadowHost = document.createElement('div');
shadowHost.id = 'shadow-extension-preview';
document.body.appendChild(shadowHost);

// Attach shadow DOM
const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

// Add initial styles and container
shadowRoot.innerHTML = `
  <style>
    .preview-btn {
      display: block;
      margin-top: 10px;
      padding: 5px 10px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    #previewDiv {
      display: none;
      flex-direction: column;
      align-items: end;
      position: fixed;
      top: 20px;
      right: 20px;
      height: 550px;
      width: 850px;
      background: rgb(206, 89, 89);
      z-index: 9999;
      box-shadow: 0 0 10px rgba(0,0,0,0.3);
      border-radius: 5px;
      padding: 5px;
      overflow: auto;
    }

    #closeBtn {
      display: block;
      margin: 5px;
      padding: 5px 10px;
      background-color: #2964d1d5;
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

const previewDiv = shadowRoot.querySelector('#previewDiv');
const previewContent = shadowRoot.querySelector('#previewContent');
const closeBtn = shadowRoot.querySelector('#closeBtn');

closeBtn.addEventListener('click', () => {
  previewDiv.style.display = 'none';
});

// --- preview function
const preview = () => {
  console.log("found one");

  const ButtonCode = document.querySelectorAll('pre code');

  ButtonCode.forEach((code) => {
    if (code.parentElement.querySelector('.preview-btn')) return;

    // Quick Preview Button
    const button = document.createElement('button');
    button.textContent = 'Quick Preview';
    button.className = 'preview-btn';
    code.parentElement.appendChild(button);

    button.addEventListener('click', () => {
      const HtmlCode = code.innerText;
      console.log(HtmlCode);

      previewContent.innerHTML = HtmlCode;
      previewDiv.style.display = 'flex';
    });

    // Full Preview Button
    const tabbutton = document.createElement('button');
    tabbutton.textContent = 'Full Preview';
    tabbutton.className = 'preview-btn';
    code.parentElement.appendChild(tabbutton);

    tabbutton.addEventListener('click', () => {
      const codeContent = code.innerText;
      const encodedCode = btoa(encodeURIComponent(codeContent));
      const previewUrl = `http://localhost:5500?code=${encodedCode}`;
      window.open(previewUrl, '_blank');
    });
  });
};

preview();
setInterval(preview, 2000);
