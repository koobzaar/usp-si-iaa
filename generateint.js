const fs = require('fs');
var data = [];
for(var i = 0; i < 500000; i++) {
data.push(i)
}
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
shuffle(data);
var datastring = "";
for(var i = 0; i < data.length; i++) {
    datastring += data[i] + "\n";
};
fs.writeFile('./seq500k.txt', datastring, function (err) {
    if (err) throw err;
    console.log('The file has been saved!');
});