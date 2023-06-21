// Envoyer la hauteur du contenu à la page parent
function sendHeightToParent() {
    var contentHeight = document.body.scrollHeight;
    
    // Envoyer la hauteur du contenu à la page parent
    parent.postMessage({ height: contentHeight }, '*');
  }
  
  // Appeler la fonction sendHeightToParent lorsque le contenu de l'iframe est chargé
  window.addEventListener('load', sendHeightToParent);
  