/*
*  Mobdule for 7-Segment 4 LCD display
* var piDisplay = require("./...")();
* piDisplay.clearDisplay()
* Displays E7 on the LED display.
*
* piDisplay.displayChars("1234");
* mvk@ca.ibm.com
* infos:
* http://raspi.tv/2015/how-to-drive-a-7-segment-display-directly-on-raspberry-pi-in-python
* https://github.com/amd940/piDisplay
* adjusted for pigpio
*/

var Gpio= require('pigpio').Gpio;
var sleep = require('system-sleep');

var cathodePins = {
	"digitOne": 2,
	"digitTwo": 3,
	"digitThree": 4,
	 "digitFour": 17
};
//18, 23,24,25, 8, 12, 7, 16,
/*
var configA = new Gpio(18, {mode: Gpio.output});
var configB = new Gpio(23, {mode: Gpio.output});
var configC = new Gpio(24, {mode: Gpio.output});

var configD = new Gpio(25, {mode: Gpio.output});
var configE = new Gpio(8, {mode: Gpio.output});
var configF = new Gpio(12, {mode: Gpio.output});
var configG = new Gpio(7, {mode: Gpio.output});
var configDP = new Gpio(16, {mode: Gpio.output});
*/
var ledPins = {
        "top": 18,
        "topLeft": 7,
        "topRight": 23,
        "middle": 12,
        "bottomLeft": 8,
        "bottomRight": 24,
        "bottom": 25,
	"decpoint":16
};


var Digitalnumber = [
['0'],
['1'],
['2'],
['3'],
['4'],
['5'],
['6'],
['7'],
['8'],
['9'],
['.'],
[' '],
['A'],
['B'],
['C'] ]

var Digitalcode = [
//a,b,c,d,e,f,g ,dp
[ 0,0,0,0,0,0,1,1], //0
[ 1,0,0,1,1,1,1,1], //1
[ 0,0,1,0,0,1,0,1],//2/
[ 0,0,0,0,1,1,0,1],//3
[ 1,0,0,1,1,0,0,1],//4
[ 0,1,0,0,1,0,0,1],//5
[ 0,1,0,0,0,0,0,1],//6
[ 0,0,0,1,1,1,1,1],//7
[ 0,0,0,0,0,0,0,1],//8
[ 0,0,0,1,1,0,0,1],//9
[ 1,1,1,1,1,1,1,0],//.
[ 1,1,1,1,1,1,1,1],//
[ 0,0,0,1,0,0,0,1],//A
[ 0,0,0,0,0,0,0,1],//B
[ 0,0,0,0,1,1,1,1]//C
];

var ledOn = 0;
var ledOff = 1;

module.exports = function(userLedPins, userCathodePins) {
	if (typeof userLedPins == 'object') {
		if (userLedPins.top != ledPins.top) {
			ledPins.top = userLedPins.top;
		}
		if (userLedPins.topLeft != ledPins.topLeft) {
			ledPins.topLeft = userLedPins.topLeft;
		}
		if (userLedPins.topRight != ledPins.topRight) {
			ledPins.topRight = userLedPins.topRight;
		}
		if (userLedPins.middle != ledPins.middle) {
			ledPins.middle = userLedPins.middle;
		}
		if (userLedPins.bottomLeft != ledPins.bottomLeft) {
			ledPins.bottomLeft = userLedPins.bottomLeft;
		}
		if (userLedPins.bottomRight != ledPins.bottomRight) {
			ledPins.bottomRight = userLedPins.bottomRight;
		}
		if (userLedPins.bottom != ledPins.bottom) {
			ledPins.bottom = userLedPins.bottom;
		}
              if (userLedPins.decpoint != ledPins.decpoint) {
                        ledPins.decpoint = userLedPins.decpoint;
                }	}
	if (typeof userCathodePins == 'object') {
		if (userCathodePins.digitOne != cathodePins.digitOne) {
			cathodePins.digitOne = userCathodePins.digitOne;
		}
		if (userCathodePins.digitTwo != cathodePins.digitTwo) {
			cathodePins.digitTwo = userCathodePins.digitTwo;
		}
                if (userCathodePins.digitThree != cathodePins.digitThree) {
                        cathodePins.digitThree = userCathodePins.digitThree;
                }
                if (userCathodePins.digitFour != cathodePins.digitFour) {
                        cathodePins.digitFour = userCathodePins.digitFour;
                }
	}
	this.displayChars = displayChars;
	this.scrollChars = scrollChars;
	this.reset = reset;
	this.count = count;
	this.cathodePins = cathodePins;
	this.ledPins = ledPins;
	this.clearDisplay = function() {
		clearInterval(clock);
		clearInterval(scrollTimer);
		clearInterval(countTimer);
		digitOne.digitalWrite( 0);
		digitTwo.digitalWrite( 0);
                digitThree.digitalWrite( 0);
		middle.digitalWrite(ledOff);
		bottomLeft.digitalWrite(ledOff);
		bottom.digitalWrite(ledOff);
		bottomRight.digitalWrite(ledOff);
		topRight.digitalWrite(ledOff);
		top.digitalWrite(ledOff);
		topLeft.digitalWrite(ledOff);
		decpoint.digitalWrite(ledOff);
	};
	return this;
};

// Common Cathodes
// Digit 1
var digitOne = new Gpio(cathodePins.digitOne, {mode: Gpio.output});
//Gpio.pinMode(cathodePins.digitOne, 1);
// Digit 2
//Gpio.pinMode(cathodePins.digitTwo, 1);
var digitTwo = new Gpio(cathodePins.digitTwo, {mode: Gpio.output});
var digitThree = new Gpio(cathodePins.digitThree, {mode: Gpio.output});
var digitFour = new Gpio(cathodePins.digitFour, {mode: Gpio.output});
// Display Pins
// Top
//Gpio.pinMode(ledPins.top, 1);
var top = new Gpio(ledPins.top, {mode: Gpio.output});
// Top Left
//Gpio.pinMode(ledPins.topLeft, 1);
var topLeft = new Gpio(ledPins.topLeft, {mode: Gpio.output});
// Top Right
//Gpio.pinMode(ledPins.topRight, 1);
var topRight = new Gpio(ledPins.topRight, {mode: Gpio.output});
// Middle
//Gpio.pinMode(ledPins.middle, 1);
var middle = new Gpio(ledPins.middle, {mode: Gpio.output});
// Bottom Left
//Gpio.pinMode(ledPins.bottomLeft, 1);
var bottomLeft = new Gpio(ledPins.bottomLeft, {mode: Gpio.output});
// Bottom Right
//Gpio.pinMode(ledPins.bottomRight, 1);
var bottomRight = new Gpio(ledPins.bottomRight, {mode: Gpio.output});
// Bottom
//Gpio.pinMode(ledPins.bottom, 1);
var bottom = new Gpio(ledPins.bottom, {mode: Gpio.output});
var decpoint = new Gpio(ledPins.decpoint, {mode: Gpio.output});


// A helper function for displayChars(). Selects the digit
// in which to display the character on.
function selectDigitNumber(x) {
sleep(4);
	if (x == 0) {
		digitOne.digitalWrite(1);
		digitTwo.digitalWrite(0);
	 	digitThree.digitalWrite(0);
 		digitFour.digitalWrite(0);
	}

	if (x ==1)
	{
		digitOne.digitalWrite(0);
		digitTwo.digitalWrite(1);
        	digitThree.digitalWrite(0);
		digitFour.digitalWrite(0);
	}

        if (x ==2)
        {
                digitOne.digitalWrite(0);
                digitTwo.digitalWrite(0);
 		digitThree.digitalWrite(1);
 		digitFour.digitalWrite(0);
        }

        if (x ==3)
        {
                digitOne.digitalWrite(0);
                digitTwo.digitalWrite(0);
		digitThree.digitalWrite(0);
        	digitFour.digitalWrite(1);
        }
}


// Displays one or two characters on the display. Only accepts
// strings (no symbols, spaces are fine) or numbers (0 to 99).
var clock, frequency = 6;
function displayChars(char) {

	if (typeof clock == 'object') {
		clearInterval(clock);
	}
	if (char === '' || char === undefined || char === null) {
		throw "You must enter a character to display.";
	}
	if (typeof char == 'number') {
		char += '';
	}
	if (char.length > 0 && char.length < 5) {
      if (char.length == 4) {
          var chars = [];
          chars[0] = char.charAt(0);
          chars[1] = char.charAt(1);
          chars[2] = char.charAt(2);
          chars[3] = char.charAt(3);
			}
    	if (char.length == 3) {
          var chars = [];
          chars[0] = char.charAt(0);
          chars[1] = char.charAt(1);
					chars[2] = char.charAt(2);
			}
		if (char.length == 2) {
					var chars = [];
					chars[0] = char.charAt(0);
					chars[1] = char.charAt(1);
		}
		if (char.length == 1)
		{
				var chars = [];
				chars[0] = char.charAt(0);
		}
		if (isNaN(char)) {
					if (chars[0].match(/[0-9 ]/) != null) {
					// First char is a number.
					chars[0] = parseInt(chars[0]);
			} else {
				//throw 'ONLY numbers are not allowed.';
			}
		} else {
			// Char is a number.
			var char = parseInt(char);
			if (char >= 0 && char < 100) {
				if (chars.length == 1) {
					chars[0] = parseInt(chars[0]);
					chars.unshift(0);
				} else {
					chars[0] = parseInt(chars[0]);
					chars[1] = parseInt(chars[1]);
				}
			}
		}
		var i = 0;
		clock = setInterval(function() {

for(ch=0;ch<chars.length;ch++)
  {
  char = chars[ch];

for(j=0;j<Digitalnumber.length;j++)
  {
      if (Digitalnumber[j] == char)
      {

//console.log("led = "+ch+" j = "+j +" my="+char)
//console.log(Digitalcode[j]);
        selectDigitNumber(ch);
//console.log("Digitalcode["+j+"][0] = "+Digitalcode[j][0]);
				top.digitalWrite(Digitalcode[j][0])
				topRight.digitalWrite(Digitalcode[j][1])
				bottomRight.digitalWrite(Digitalcode[j][2])
				bottom.digitalWrite(Digitalcode[j][3])
       	bottomLeft.digitalWrite(Digitalcode[j][4])
        topLeft.digitalWrite(Digitalcode[j][5])
        middle.digitalWrite(Digitalcode[j][6])


	j=12;

      }//if
  }//for
}//chars

		}, frequency);
	} else {
		throw "Character(s) to display must be 1 to 4 characters long.";
	}
}

// Scrolls a sentence across the display one letter at a time.
// Accepts the same values that displayChars() accepts.
var scrollTimer;
function scrollChars(sentence, speed) {
	var i = 0;
	if (!speed) {
		var speed = 400;
	}
	scrollTimer = setInterval(function() {
		var chars = sentence.substr(i, 2);
		displayChars(chars);
		i++;
		if (i == sentence.length-1) {
			i = 0;
		}
	}, speed);
}

// Counts up from 0 to 99 or down from 99 to 0 on the display.
var countTimer;
function count(upOrDown, num, speed) {
	if (!speed) {
		var speed = 200;
	}
	 if (!num) {
                var num=0;
        }

	if (upOrDown == 'up') {
		var i = num;
	} else if (upOrDown == 'down') {
		var i = num;
		if(num==0)
			i = 9999;
	}
	countTimer = setInterval(function() {
		if (upOrDown == 'up') {
			if (i > 9998) {
				i = 0;
			}
		} else if (upOrDown == 'down') {
			if (i < 0) {
				i = 9999;
			}
		}
		console.log("Counter = "+i)
		displayChars(""+i);
		if (upOrDown == 'up') {
			i++;
		} else if (upOrDown == 'down') {
			i--;
		}
	}, speed);
}

// Reset and release
function reset(){
	clearInterval(clock);
	clearInterval(scrollTimer);
	clearInterval(countTimer);
	digitOne.digitalWrite( 0);
	digitTwo.digitalWrite( 0);
							digitThree.digitalWrite( 0);
	middle.digitalWrite(ledOff);
	bottomLeft.digitalWrite(ledOff);
	bottom.digitalWrite(ledOff);
	bottomRight.digitalWrite(ledOff);
	topRight.digitalWrite(ledOff);
	top.digitalWrite(ledOff);
	topLeft.digitalWrite(ledOff);
	decpoint.digitalWrite(ledOff);
}
