// Fonction pour redimensionner l'iframe en fonction de la hauteur du contenu
function resizeIFrame(event) {
    var iframes = document.querySelectorAll('iframe');
    for (var i = 0; i < iframes.length; i++) {
      if (event.source == iframes[i].contentWindow) {
        var contentHeight = event.data.height;
        
        iframes[i].style.height = contentHeight + 'px';
        if (i==0){
          navdiv = document.getElementById('navdiv');
          navdiv.style.margin = 0
          navdiv.style.height = contentHeight + 'px';
        }
      } 
    }
  }

// Avoir un scroll qui marche parceque jsnjhd hsjù
function scrollToElement(elementId) {
  console.log(elementId)
  var element = document.getElementById(elementId);
  console.log(element)
  if (element) {
    element.scrollIntoView();
    setTimeout(function() {
      window.scrollBy(0, -50);
    }, 700);
  }
}

// Ajouter un écouteur d'événement pour écouter les messages provenant des iframes
window.addEventListener('message', resizeIFrame, false);

// Envoie du lien la page active vers le iframe "navbar"
window.onload = function(){
    var iframe = document.getElementById('navbar'); 
    iframe.contentWindow.postMessage(window.location.href, '*');    
}

// Permet de faire le menu latérale et de cacher les elements lorsqu'on clique sur le h2 
var h2 = document.querySelectorAll("h2");
var sidebar = document.getElementById("sidebar")
for(i=0; i<h2.length; i++){
  var Id = i + 1
  h2[i].id = Id
  var a = document.createElement("a")
  a.innerText = Id
  // var idhref = '#' + Id
  a.setAttribute('onclick', "scrollToElement('"+Id+"')")
  sidebar.appendChild(a)
  h2[i].onclick = function(){
    parentElem = this.parentNode.children
    // console.log(parentElem)
    for (i=1; i<parentElem.length; i++){
      if (parentElem[i].classList.contains("cacher")){
        parentElem[i].classList.remove("cacher");
      }
      else{
        parentElem[i].classList.add("cacher");
      }
    }
  }
}