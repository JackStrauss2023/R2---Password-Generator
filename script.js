let words = new Map();

function preload() {
	loadStrings('beale.wordlist.asc.txt', createMap );
}
/**
 * This function goes through the word list line-by-line.
 * It then splits the line on any tab characters that appear, 
 *   recording only the first two as 'key' and 'value'
 * If the key is exactly five characters long, we assume the 
 *   line we are on is a line that contains a key/value pair
 *   then we store the word in the map with the key. 
 * 
 * This allows us to use the words Map later by simply using 
 *   a call to get, like so:
 * 
 * lookupKey = 12340
 * word = words.get(lookupKey)
 */

let lookupKey = "12341";
let dicewords = ["","","","",""];

function createMap(strings) {
	for( let line of strings ) {
		let [key, word] = line.split('\t');
		if( key.length === 5 ) {
			words.set( key, word );
		}
	}
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
}

function draw() {
  background(255);
  let TEXT = "Press the numbers on the screen to generate a word under the number you pressed.";
  let RESET = "Press r to reset the password.";
  let FULL_SCREEN = "Go to full screen in a new tab to see the whole password generator."
  textSize(15);
  text( "Instructions:", 0, 10);
  text(TEXT, 0, 30);
  text(RESET, 0, 50);
  text(FULL_SCREEN, 0, 70);

  for( let i = 0; i < 5; i++ ) {
    noFill();
    rect((width/4 - 230), height/2 - 30, width/2 - (width/4 - 825),40 );
    fill(0);
    textSize(30);
    text( `${i+1}`, width/2 - (width/4 - 200 * i), height/2 - 50);
    text( dicewords[i], width/2 - (width/4+15 - 200 * i), height/2 );
    text("PASSWORD:", (width/4 - 225), height/2);
  }
}

function keyPressed() {
  if( key === "1" || key === "2" || key === "3" || key === "4" || key === "5" ) {
    lookupKey = generateLookupKey()
    dicewords[int(key)-1] = words.get(lookupKey);
  }
  if( key === 'r' ) {
    dicewords = ["","","","",""]; 
  }
}

function generateLookupKey() {
  let key = "";
  const dieFaces = [1,2,3,4,5,6] 
  for( let i = 0; i < 5; i++ ) {
    key = `${key}${random(dieFaces)}`; 
  }
  return key;
}