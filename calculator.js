$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function calculate() {

    var inputSalario = document.getElementById("entradaSalario");
    var salMin = 1045.00;
    var tetoInss = 6101.06;
    var apoio1 = 2089.60;
    var apoio2 = 2089.61;
    var apoio3 = 3134.40;
    var apoio4 = 3134.41;
    var aliq1 = 0;
    var aliq2 = 0;
    var aliq3 = 0;
    var aliq4 = 0;
    var total = 0;
    var aliq1old = 0;
    var aliq2old = 0;
    var aliq3old = 0;    
	  var tetoOld = 5839.45;
    var diferenca = 0;
    
/* Aliquota 1 */
    if (inputSalario.value !== null && inputSalario.value > 0) {
        if (inputSalario.value.toLocaleString('pt-BR') >= salMin) {
            aliq1 = salMin * 0.075;
            document.getElementById("tdAliq1").innerHTML = "R$ " + (aliq1).toFixedNoRounding(2).replace(".", ",");
        } else {
            aliq1 = inputSalario.value * 0.075;
            document.getElementById("tdAliq1").innerHTML = "R$ " + (aliq1).toFixedNoRounding(2).replace(".", ",");
        }
    } else {
      document.getElementById("tdAliq1").innerHTML = "R$ 0,00";
    }
    //console.log(aliq1.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);
/* Aliquota 2 */
    if (inputSalario.value !== null && inputSalario.value > salMin) {
      if (inputSalario.value >= apoio1) {
          aliq2 = (apoio1 - salMin) * 0.09;
          document.getElementById("tdAliq2").innerHTML = "R$ " + (aliq2).toFixedNoRounding(2).replace(".", ",");
      } else {
          aliq2 = (inputSalario.value - salMin) * 0.09;
          document.getElementById("tdAliq2").innerHTML = "R$ " + (aliq2).toFixedNoRounding(2).replace(".", ",");
      }
    } else {
      document.getElementById("tdAliq2").innerHTML = "R$ 0,00";
    }
/* Aliquota 3 */
    if (inputSalario.value !== null && inputSalario.value > apoio1 ) {
      if (inputSalario.value >= apoio3) {
          aliq3 = (apoio3 - apoio2) * 0.12;
          document.getElementById("tdAliq3").innerHTML = "R$ " + (aliq3).toFixedNoRounding(2).replace(".", ",");
      } else {
          aliq3 = (inputSalario.value - apoio2) * 0.12;
          document.getElementById("tdAliq3").innerHTML = "R$ " + (aliq3).toFixedNoRounding(2).replace(".", ",");
      }
    } else {
      document.getElementById("tdAliq3").innerHTML = "R$ 0,00";
    }
/* Aliquota 4 */
    if (inputSalario.value !== null && inputSalario.value > apoio3) {
      if (inputSalario.value >= tetoInss) {
          aliq4 = (tetoInss - apoio4) * 0.14;
          document.getElementById("tdAliq4").innerHTML = "R$ " + (aliq4).toFixedNoRounding(2).replace(".", ",");
      } else {
          aliq4 = (inputSalario.value - apoio4) * 0.14;
          document.getElementById("tdAliq4").innerHTML = "R$ " + (aliq4).toFixedNoRounding(2).replace(".", ",");
      }
    } else {
      document.getElementById("tdAliq4").innerHTML = "R$ 0,00";
    }

/* aliq1old */
    if (inputSalario.value !== null && inputSalario.value > 0) {
        if (inputSalario.value.toLocaleString('pt-BR') <= 1751.81) {
            aliq1old = inputSalario.value * 0.08;
        } else {
            if (inputSalario.value.toLocaleString('pt-BR') <= 2919.72) {
                aliq2old = inputSalario.value * 0.09;
            } else {
                if (inputSalario.value.toLocaleString('pt-BR') <= tetoOld){
                  aliq3old = inputSalario.value * 0.11;
                } else {
                  aliq3old = tetoOld * 0.11;
                }
            }
        }
    }

aliq1 = (aliq1).toFixedNoRounding(2);
aliq2 = (aliq2).toFixedNoRounding(2);
aliq3 = (aliq3).toFixedNoRounding(2);
aliq4 = (aliq4).toFixedNoRounding(2);

/* Total */
    if (aliq1 > 0) {
      total = parseFloat(aliq1) + parseFloat(aliq2) + parseFloat(aliq3) + parseFloat(aliq4);
	  totalold = aliq1old + aliq2old + aliq3old;
	  diferenca = total - totalold;
	  if(total > totalold){
		document.getElementById("tdTotal").innerHTML = "R$ " + roundToTwo(total).toLocaleString('pt-BR') + " <i class='fas fa-caret-up' style='color: red; font-size: 1.5rem '><span class='diferenca'>" + (diferenca).toFixedNoRounding(2).replace(".", ",") + "<\span></i>";
	  } else {
		document.getElementById("tdTotal").innerHTML = "R$ " + roundToTwo(total).toLocaleString('pt-BR') + " <i class='fas fa-caret-down' style='color: green; font-size: 1.5rem '><span class='diferenca'>" + (diferenca).toFixedNoRounding(2).replace(".", ",") + "<\span></i>";
	  }      
    } else {
      document.getElementById("tdTotal").innerHTML = "R$ 0,00 ";
    }
    
/* totalold */

    
}

Number.prototype.toFixedNoRounding = function(n) {
  const reg = new RegExp("^-?\\d+(?:\\.\\d{0," + n + "})?", "g")
  const a = this.toString().match(reg)[0];
  const dot = a.indexOf(".");
  if (dot === -1) {
      return a + "." + "0".repeat(n);
  }
  const b = n - (a.length - dot) + 1;
  return b > 0 ? (a + "0".repeat(b)) : a;
}


function roundToTwo(num) {    
    //return +(Math.round(num + "e+2")  + "e-2");
    //return num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]

    //var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (2 || -1) + '})?');
    //return num.toString().match(re)[0];
    return num;

    //return console.log((num).toFixedNoRounding(2));
}

$(function(){
   $(".c_h").click(function(e) {
            if ($(".chat_container").is(":visible")) {
                $(".c_h .right_c .mini").text("+")
            } else {
                $(".c_h .right_c .mini").text("-")
            }
            $(".chat_container").slideToggle("slow");
            return false
        });
});

var $head = $("iframe").contents().find("head");                
$head.append($("<link/>", 
    { rel: "stylesheet", href: "file://style.css", type: "text/css" }));