window.addEventListener('message', function(event){
    var location = event.data
    var locationPath = new URL(location).pathname;

    var navItems = document.querySelectorAll('a'); 
    for(var i = 0; i<navItems.length; i++){
        if (((location.includes(navItems[i].pathname.split(".")[0])) || (locationPath == "/"))){
            navItems[i].classList.add("active"); 
            break;
        }
    }
}); 
