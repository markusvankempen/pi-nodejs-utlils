/*
** Example for 7 Segment Display with 4 LCD
** mvk@ca.ibm.com
** http://raspi.tv/2015/how-to-drive-a-7-segment-display-directly-on-raspberry-pi-in-python
*/

var mysleep = require('system-sleep');

// Don't forget the extra parentheses to call the constructor function!
var piDisplay = require("./pi7segleddisplay")();
piDisplay.clearDisplay()
// Displays E7 on the LED display.
console.log("4x7Seg LCD example")
console.log("display numbers")
for (i=1000;i<9999;i++)
{
  i=i+1234
  if(i<9999){
    piDisplay.displayChars(""+i);
    mysleep(1000)
}
}
// Displays 85.
//piDisplay.displayChars(85);

//piDisplay.count('down',2000);
// Scrolls the given string across the display. It looks more natural to scroll
// if you have spaces at either end of the string, but they are not mandatory.
// The second argument is the milliseconds to display each character.
//piDisplay.scrollChars(" HI HELLO 1234567890 ", 400);
sentence="A 1 2 3 4 5 6 7 8 9 0 . A 1 2 3 4 5 6 7 8 9 0. "
console.log("Scroll Text = "+sentence)
for (i=0;i < sentence.length-2;i++)
{

  var chars = sentence.substr(i, 4);
  console.log("Subsctirng = "+chars+" i ="+i);
  piDisplay.displayChars(chars);
  mysleep(250)
}

piDisplay.reset();
console.log("done")
