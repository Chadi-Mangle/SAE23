function convertDecimalToBinary(reste) {
    var ip = "";
    while (reste !== 0) {
      ip += (reste % 2).toString();
      reste = Math.floor(reste / 2);
    }
    return ip.split("").reverse().join("").padStart(8, "0");
  }
  
console.log(convertDecimalToBinary(17));
  
function convertBinaryToDecimal(ip) {
    ip = ip.split("").reverse().join("").padStart(8, "0");
    var nb = 0;
    for (var i = 0; i < ip.length; i++) {
        nb += Math.pow(2 * parseInt(ip[i]), i);
    }
    if (ip[0] === "0") {
        nb -= 1;
    }
    return nb;
};
  
console.log(convertBinaryToDecimal("00010000"));

  
function convertIPToBinary(ip) {
    var listIPInt = [];
    var listIPStr = ip.split(".");

    for (var i = 0; i < listIPStr.length; i++) {
        listIPInt.push(parseInt(listIPStr[i]));
    }

    var ipBinary = [];
    for (var i = 0; i < listIPInt.length; i++) {
        var reste = listIPInt[i];
        var ip = convertDecimalToBinary(reste)
        ipBinary.push(ip);
    }
    return ipBinary[0] + "." + ipBinary[1] + "." + ipBinary[2] + "." + ipBinary[3]
};

function convertIPToDecimal(ip) {
    var listIPStr = ip.split(".");
    var ipBinary = [];
    
    for (var i = 0; i < listIPStr.length; i++) {
        var reste = listIPStr[i];
        var ip = convertBinaryToDecimal(reste)
        ipBinary.push(ip);
    }
    return ipBinary[0] + "." + ipBinary[1] + "." + ipBinary[2] + "." + ipBinary[3]
};

// console.log(convertIPToDecimal("10000000.00000000.00000000.00000000"))

// var Ip = prompt("Donnez une adresse IP :");
// convertIPToBinary(Ip);

var input_d_to_b = document.getElementById("d_to_b")
input_d_to_b.addEventListener("keypress", function(event){
    if (event.key === "Enter") {
        var decimale = parseInt(input_d_to_b.value);
        var binary = convertDecimalToBinary(decimale);
        
        tableElem = [decimale, binary];
        var tr = document.createElement('tr')

        for (let i = 0; i< tableElem.length; i++){
            td = document.createElement('td');
            td.textContent = tableElem[i];
            console.log(td);
            tr.append(td);
        }; 

        var tbody = document.getElementById("tbody1");
        tbody.appendChild(tr);
        input_d_to_b.value = ""; 
    }
});  

var input_b_to_d = document.getElementById("b_to_d")
// console.log(input_b_to_d)
input_b_to_d.addEventListener("keypress", function(event){
    if (event.key === "Enter"){
        var binary = input_b_to_d.value.padStart(8, "0");
        var decimale = convertBinaryToDecimal(binary);
        
        // console.log(decimale, binary)
        tableElem = [decimale, binary];
        var tr = document.createElement('tr')

        for (let i = 0; i< tableElem.length; i++){
            td = document.createElement('td');
            td.textContent = tableElem[i];
            // console.log(td);
            tr.append(td);
        }; 

        var tbody = document.getElementById("tbody2");
        tbody.appendChild(tr);
        input_d_to_b.value = ""; 
    }
});  


var input_ip_d_to_b = document.getElementById("ip_d_to_b")
input_ip_d_to_b.addEventListener("keypress", function(event){
    if (event.key === "Enter") {
        var decimale = input_ip_d_to_b.value;
        var binary = convertIPToBinary(decimale);
        
        tableElem = [decimale, binary];
        var tr = document.createElement('tr')

        for (let i = 0; i< tableElem.length; i++){
            td = document.createElement('td');
            td.textContent = tableElem[i];
            // console.log(td);
            tr.append(td);
        }; 

        var tbody = document.getElementById("tbody3");
        tbody.appendChild(tr);
        input_d_to_b.value = ""; 
    }
});  

var input_ip_b_to_d = document.getElementById("ip_b_to_d")
input_ip_b_to_d.addEventListener("keypress", function(event){
    if (event.key === "Enter") {
        var binary = input_ip_b_to_d.value;
        var decimale = convertIPToDecimal(binary);
        
        tableElem = [decimale, binary];
        var tr = document.createElement('tr')

        for (let i = 0; i< tableElem.length; i++){
            td = document.createElement('td');
            td.textContent = tableElem[i];
            // console.log(td);
            tr.append(td);
        }; 

        var tbody = document.getElementById("tbody4");
        tbody.appendChild(tr);
        input_d_to_b.value = ""; 
    }
});  
