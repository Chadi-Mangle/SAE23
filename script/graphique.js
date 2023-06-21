var zone_dessin = document.getElementById("graphique");
var graphe = zone_dessin.getContext("2d");

function LoadGraph() {
  graphe.strokeStyle = "#ff0000";
  graphe.lineWidth = 3;
  var input = document.querySelectorAll('input')

  var ampl = input[0].value != "" ? parseFloat(input[0].value) : 1
  var freq = input[1].value != "" ? parseFloat(input[1].value) : 1
  var phase = input[2].value != "" ? parseFloat(input[2].value) : 0

  graphe.clearRect(0, 0, zone_dessin.width, zone_dessin.height); // Effacer le graphique précédent
  graphe.beginPath();
  
  var compteur = -10; 
  
  while (compteur < 10) {
    graphe.lineTo(15 * (compteur - (-10)), 300 - (f(compteur, ampl, freq, phase) - (-1.5)) * 100);
    compteur = (compteur + 0.05);
  }
  
  graphe.stroke();
  graphe.beginPath();
  graphe.lineWidth = "2";
  graphe.strokeStyle = "black";
  graphe.moveTo(0, zone_dessin.height/2);
  graphe.lineTo(zone_dessin.width, zone_dessin.height/2);
  graphe.lineTo(zone_dessin.width - 5, (zone_dessin.height/2) - 5);
  graphe.moveTo(zone_dessin.width, zone_dessin.height/2);
  graphe.lineTo(zone_dessin.width - 5, (zone_dessin.height/2) + 5);
  graphe.moveTo(zone_dessin.width/2, zone_dessin.height);
  graphe.lineTo(zone_dessin.width/2, 0);
  graphe.lineTo((zone_dessin.width/2) - 5, 5);
  graphe.moveTo(zone_dessin.width/2, 0);
  graphe.lineTo((zone_dessin.width/2) + 5, 5);
  graphe.stroke();
  graphe.fillText("-10", 0, 10 + zone_dessin.height/2);
  graphe.fillText("10", zone_dessin.width - 20, 10 + zone_dessin.height/2);
  graphe.fillText("-1.5", 5 + zone_dessin.width/2, -8 + zone_dessin.height);
  graphe.fillText("1.5", 5 + zone_dessin.width/2, 8);

  var caption = document.getElementById('caption');

  var equation = "<p><math><mi>s</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><mi>" + ampl + "</mi><mo>sin</mo><mo>(</mo><mi>" + freq + "</mi><mi>t</mi><mo>+</mo><mi>" + phase + "</mi><mo>)</mo></math></p>";
  caption.innerHTML = equation;  
};

function f(x, ampl, freq, phase) {
  var y = ampl * Math.sin(x*freq + phase);
  return y;
};

LoadGraph();