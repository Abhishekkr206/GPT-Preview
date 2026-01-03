console.log('working..')

document.addEventListener('DOMContentLoaded', ()=>{

  const urlParams = new URLSearchParams(window.location.search)
  const codeParam = urlParams.get('code')

  if(codeParam){
    showPreview(codeParam)
  }
  else{
    showlandingpage()
  }
})

function showPreview(encodedCode){
  // Show preview container and hide landing page
  document.getElementById('preview-container').style.display = 'block'
  document.getElementById('landing-page').style.display = 'none'

   // Decompress the code using LZ-String (CHANGED from atob to LZ-String)
   const decodedCode = decodeURIComponent(atob(encodedCode));

  const iframe = document.createElement('iframe')
  document.getElementById('preview-output').appendChild(iframe);

  iframe.srcdoc = decodedCode
}

function showlandingpage(){
  window.open(`http://localhost:5500`, '_self')
}