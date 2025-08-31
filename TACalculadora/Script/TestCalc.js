var CalculatorUteils = require("CalculadoraUtils");
var clickBut = CalculatorUteils.clickBut;
function test() {

  clickBut("1");
  clickBut("+");
  clickBut("2");
  clickBut("=");
  aqUtils.Delay(5000);
  
}
