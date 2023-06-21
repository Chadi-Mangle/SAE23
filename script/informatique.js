fetch('/assets/create_frequencytable.py')
  .then(response => response.text())
  .then(text => {
    pre = document.querySelector("pre");
    pre.textContent = text
  })
  .catch(error => {
    console.error('Erreur lors de la lecture du fichier:', error);
  });

function fauxTerm(config) {
  
    var term = config.el;
    var termBuffer = config.initialMessage || '';
    var lineBuffer = config.initialLine || '';
    var cwd = config.cwd;
    var tags = ['red', 'blue', 'white', 'bold'];
    var maxBufferLength = config.maxBufferLength || 8192;
    var fauxInput = document.createElement('textarea');
    fauxInput.className = "faux-input";
    document.body.appendChild(fauxInput);

    function getLeader() {
      return cwd + " ";
    }
  
    function renderTerm() {
      var bell = '<span class="bell"></span>';
      var ob = termBuffer + getLeader() + lineBuffer;
      term.innerHTML = ob;
      term.innerHTML += bell;
      term.scrollTop = term.scrollHeight;
    }
    
    function writeToBuffer(str) {
      termBuffer += str;
      
      if ( termBuffer.length > maxBufferLength ) {
        var diff = termBuffer.length - maxBufferLength;
        termBuffer = termBuffer.substr(diff);
      }
      
    }
    
    function renderStdOut(str) {
      var i = 0, max = tags.length;
      for ( i; i<max; i++ ) {
        var start = new RegExp('{' + tags[i] + '}', 'g');
        var end = new RegExp('{/' + tags[i] + '}', 'g');
        str = str.replace(start, '<span class="' + tags[i] + '">');
        str = str.replace(end, '</span>');
      }
      return str;
    }
    
    var isProcessing = false;   
    function processLine() {  

        if (isProcessing) {
            return;
        }
        var line = lineBuffer;   
        lineBuffer += "\n";

        if ( line !== "" ) {
            isProcessing = true;
  
              frequencyOf(line)
                .then(stdout => {
                    isProcessing = false;
                    writeToBuffer( getLeader() + lineBuffer );
                    lineBuffer = "";  
                  renderStdOut(stdout);
                  writeToBuffer(stdout);
                  renderTerm();
                })
                .catch(error =>{isProcessing = false; console.error(error)});
        }  
        else{
            writeToBuffer( getLeader() + lineBuffer );
            lineBuffer = "";  
        } 
      }
    
    function frequencyOf(text) { 
        return fetch("https://apilanguage.dachy.repl.co/?text="+text)
            .then(response => response.json())
            .then(data => {
                const lang_p = data["language"];
                const lang_alt1 = data["alternatives"][0];
                const lang_alt2 = data["alternatives"][1];
                return "This language appears to be " + lang_p + " , but could very well be " + lang_alt1 +" or " +lang_alt2+ ".\n";
            });
    }
    
    function isInputKey(keyCode) {
      var inputKeyMap = [32,190,192,189,187,220,221,219,222,186,188,191];
      if ( inputKeyMap.indexOf(keyCode) > -1 ) {
        return true;
      }
      return false;
    }
  
    function acceptInput(e) {
      e.preventDefault();
      
       fauxInput.value = "";
      
      if ( e.keyCode >= 48 && e.keyCode <= 90 || isInputKey(e.keyCode) ) {
        if (! e.ctrlKey ) {
          lineBuffer += e.key;
        } else {
        }
      } else if ( e.keyCode === 13 ) {
        processLine();
      } else if ( e.key === "Backspace" ) {
        lineBuffer = lineBuffer.substr(0, lineBuffer.length -1);
      }
  
      renderTerm();
    }
  
    term.addEventListener('click', function(e){
      fauxInput.focus({preventScroll:true});
      term.classList.add('term-focus');
    });
    fauxInput.addEventListener('keydown', acceptInput);
    fauxInput.addEventListener('blur', function(e){
      term.classList.remove('term-focus');
    });
    renderTerm();
    
  }
  var myTerm = new fauxTerm({
    el: document.getElementsByClassName("term")[0],
    cwd: "Enter your text :",
    initialMessage: "Welcome to language recognition !\n",
  });
