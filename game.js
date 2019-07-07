var rows = 0;
var numberOfGuesses = 10;

document.getElementById('num').innerHTML = numberOfGuesses;

//Generate guessable value
var target = getRndInteger(100, 999);

// Convert to string
var checker =  target.toString();
var checkerLength = checker.length;

// Count each digit
var digits = [];
for (var i = 0; i < 10; i++){
  digits.push(0)
}
for (var i = 0; i < checkerLength; i++){
  digits[Number(checker[i])] += 1
}

function updateTable(){
  var input = document.getElementById('number').value;
  numberOfGuesses -= 1;
  document.getElementById('num').innerHTML = numberOfGuesses;


  try{
    if (input == ""){throw "No Input"};
    if(isNaN(input)) {throw "Please guess a number"};
    var x = Number(input);

    var ret = check(input.toString());
    var dig = ret[0];
    var plc = ret[1];

    appendRow(input, dig, plc);
    // Check for winner
    if(plc == checkerLength && input.length == checkerLength){
      window.location.href = "winner.html";
    }
    // Check for loser
    if (numberOfGuesses < 1){
      window.location.href = "loser.html";
    }
  }
  catch(err){
    alert(err)
  }
}

function appendRow(gss, dig, plc){
  var table = document.getElementById('data');
  rows += 1;
  var newRow = table.insertRow(rows);
  var newCell1 = newRow.insertCell(0);
  var newCell2 = newRow.insertCell(1);
  var newCell3 = newRow.insertCell(2);
  newCell1.innerHTML = gss;
  newCell2.innerHTML = dig;
  newCell3.innerHTML = plc;
}

function check(guess){
  var l = guess.length;
  var dig = 0;
  var plc = 0;

  // Init guess digit counts
  var guessDigits = [];
  for (var j = 0; j < 10; j++){
    guessDigits[j] = 0;
  }
  // Compute digit counts for guess
  for (var j = 0; j < l; j++){
    guessDigits[Number(guess[j])] += 1;
  }

  // Computer total correct digits
  for(var k = 0; k < 10; k++){
    if (guessDigits[k] > digits[k]){
      dig +=digits[k];
    }else{
      dig += guessDigits[k];
    }
  }
  if (checkerLength > l){
    for(var i = 0; i < l; i++){
      if(checker[i] == l[i]){
        plc += 1;
      }
    }
  }else{
    for (var i = 0; i < checkerLength; i ++ ){
      if(checker[i] == guess[i]){
        plc += 1;
      }
    }
  }
  return [dig, plc]
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
