
console.log("Array Test" )

var Gpio= require('pigpio').Gpio;
var configA = new Gpio(18, {mode: Gpio.output});
var configB = new Gpio(23, {mode: Gpio.output});
var configC = new Gpio(24, {mode: Gpio.output});

var configD = new Gpio(25, {mode: Gpio.output});
var configE = new Gpio(8, {mode: Gpio.output});
var configF = new Gpio(7, {mode: Gpio.output});
var configG = new Gpio(12, {mode: Gpio.output});
var configDP = new Gpio(16, {mode: Gpio.output});

var led0 = new Gpio(2, {mode: Gpio.output});
var led1 = new Gpio(3, {mode: Gpio.output});
var led2 = new Gpio(4, {mode: Gpio.output});
var led3 = new Gpio(17, {mode: Gpio.output});


Digitalnumber = [
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
]

Digitalcode = [
//a,b,c,d,e,f,g ,dp
[ 0,0,0,0,0,0,1,0], //0
[ 1,0,0,1,1,1,1,0], //1
[ 0,0,1,0,0,1,0,0],//2/
[ 0,0,0,0,1,1,0,0],//3
[ 1,0,0,1,1,0,0,0],//4
[ 0,1,0,0,1,0,0,0],//5
[ 0,1,0,0,0,0,0,0],
[ 0,0,0,1,1,1,1,0],
[ 0,0,0,0,0,0,0,0],
[ 0,0,0,1,1,0,0,0],
[ 0,0,0,0,0,0,0,1]
]

//var mydata ="1234"
led0.digitalWrite(0);
led1.digitalWrite(0);
led2.digitalWrite(0);
led3.digitalWrite(0);

function clearLeds()
{
led0.digitalWrite(0);
led1.digitalWrite(0);
led2.digitalWrite(0);
led3.digitalWrite(0);
}
function setLeds()
{
led0.digitalWrite(1);
led1.digitalWrite(1);
led2.digitalWrite(1);
led3.digitalWrite(1);
}

function selectLed(x) {
        waitFor(4, function(){})
	 if (x == 0) 
		{
//   led0.digitalWrite(0);
  // waitFor(15, function(){})
   //led0.digitalWrite(1);
                  led0.digitalWrite(1);
                  led1.digitalWrite(0);
                  led2.digitalWrite(0);
                  led3.digitalWrite(0);
		}
        if (x == 1)  
                {
                  led0.digitalWrite(0);
                  led1.digitalWrite(1);
                  led2.digitalWrite(0);
                  led3.digitalWrite(0);
                }
   	if (x == 2)
                {
                led0.digitalWrite(0);
                led1.digitalWrite(0);
                led2.digitalWrite(1);
                led3.digitalWrite(0);
                }
   	if (x == 3)
                {
               led0.digitalWrite(0);
               led1.digitalWrite(0);
               led2.digitalWrite(0);
                led3.digitalWrite(1);
                }
}
//exit();
var my=1000;
var cc=1;

//var mydata = "1234";




clock = setInterval(function(){
//clearLeds();
mydata = "123.";
for (s=0;s<4;s++) //for (s=0;s<mydata.length;s++)
{

 myc = mydata.slice(s, s+1)
 
 for(j=0;j<Digitalnumber.length;j++)
  {

      if (Digitalnumber[j] == myc)
      {
       // led0.digitalWrite(1);
	selectLed(s)	
//	console.log("led = "+s+" j = "+j +" my="+myc);
        configA.digitalWrite(Digitalcode[j][0])
        configB.digitalWrite(Digitalcode[j][1])
        configC.digitalWrite(Digitalcode[j][2])
        configD.digitalWrite(Digitalcode[j][3])
        configE.digitalWrite(Digitalcode[j][4])
        configF.digitalWrite(Digitalcode[j][5])
        configG.digitalWrite(Digitalcode[j][6])
	j=11;
 
      }
  }

}//for


my++;
if(my >9 )
	my=0;

//console.log("interval")
},5);

function display(mydata)
{
// 4 LED s
/*
clock = setInterval(function(){ 

 myc = 4 ;//mydata.slice(2, 3); 
 //led0.digitalWrite(0);

for (s=0;s<4;s++) //for (s=0;s<mydata.length;s++)
{

 myc = mydata.slice(s, 2+1)

 
 for(j=0;j<Digitalnumber.length;j++)
  {
   
      if (Digitalnumber[j] == myc)
      {
	 led0.digitalWrite(1);
 	configA.digitalWrite(Digitalcode[j][0])
        configB.digitalWrite(Digitalcode[j][1])
        configC.digitalWrite(Digitalcode[j][2])
        configD.digitalWrite(Digitalcode[j][3])
        configE.digitalWrite(Digitalcode[j][4])
 configF.digitalWrite(Digitalcode[j][5])
 configG.digitalWrite(Digitalcode[j][6])
	j=10;
	
      }
  }	
//               led0.digitalWrite(1);
//  waitFor(5, function(){})
//                led0.digitalWrite(0);

//console.log("interval")
},1);
*/
for (s=3;s<4;s++) //for (s=0;s<mydata.length;s++)
{
// console.log("SetLED "+s)
// console.log("ledpin = "+ledpin[s])

/*
waitFor(10, function(){})
// led0.digitalWrite(0);
// led1.digitalWrite(0);
// led2.digitalWrite(0);
 //led3.digitalWrite(0);
 if(s == 0)
 {
   led0.digitalWrite(0);
   waitFor(15, function(){})
   led0.digitalWrite(1);
 }  
 if(s == 1)
 {  
    led1.digitalWrite(0);
    led1.digitalWrite(1); 
 } 

  if(s == 2)
       led2.digitalWrite(1);
       if(s == 3)
         led3.digitalWrite(1);

//waitFor(5, function(){})
*/
  myc = mydata.slice(s, s+1);
//  console.log ("string = "+myc)
  for(j=0;j<Digitalnumber.length;j++)
  {
      if (Digitalnumber[j] == myc)
      {
//        console.log(">>> writeditial for number "+myc)
//        console.log(Digitalcode[j])

        //  console.log(Digitalcode[j][6])
//	if(s == 0)
        	led0.digitalWrite(0);
/*
          if(s == 1)
                led1.digitalWrite(0);
          if(s == 2)
                led2.digitalWrite(0);
          if(s == 3)
                led3.digitalWrite(0);
*/

        configA.digitalWrite(Digitalcode[j][0])
        configB.digitalWrite(Digitalcode[j][1])
        configC.digitalWrite(Digitalcode[j][2])
        configD.digitalWrite(Digitalcode[j][3])
        configE.digitalWrite(Digitalcode[j][4])
        configF.digitalWrite(Digitalcode[j][5])
        configG.digitalWrite(Digitalcode[j][6])
      

//       waitFor(300, function(){})
       

//	selectDigitNumber(s) 
 	//waitFor(5, function(){})
        if(s == 0)
	{
		 led0.digitalWrite(1);
  waitFor(5, function(){})
		led0.digitalWrite(0);
  	
	}

      if(s == 1)
        {
                 led1.digitalWrite(1);
  waitFor(5, function(){})
                led1.digitalWrite(0);

        }


      if(s == 2)
        {
                 led2.digitalWrite(1);
  waitFor(5, function(){})
                led2.digitalWrite(0);

        }

      if(s == 3)
        {
                 led3.digitalWrite(1);
  waitFor(5, function(){})
                led3.digitalWrite(0);

        }
/*
	if(s == 1)
                led1.digitalWrite(1); 	
	if(s == 2)
                led2.digitalWrite(1);
        if(s == 3)
                led3.digitalWrite(1);
*/
//	j=8
      }else{
      //  console.log("<<< nofound ="+myc)
      }
  }
}

//console.log("interval")
//},10);
}//function

function selectDigitNumber(x) {
	if (x == 0) {
		led0.digitalWrite(1);
waitFor(5, function(){})
		led1.digitalWrite(0);
                led2.digitalWrite(0);
                led3.digitalWrite(0);
// waitFor(5, function(){})
	} else {
	//	digitOne.digitalWrite(1);
	//	digitTwo.digitalWrite(0);
	}
}

/*
cc=0;
num=1000;
while(true)
{
if (cc > 50)
{
	cc=0;
	num++;
}
//display(""+num);
cc++;
mydata = ""+num;

}
*/

function waitFor(ms, cb) {
  var waitTill = new Date(new Date().getTime() + ms);
  while(waitTill > new Date()){};
  if (cb) {
    cb()
  } else {
   return true
  }
}

/*
while(true)
{
waitFor(5,
  function(){
    display("1200");

})
}
*/

/*
Digitalcode.forEach(function(item, index)
{
console.log("digit key= "+index);
console.log(item)

item.forEach(function(item, index){
  console.log("Digital Write = "+item)
})

})

*/
/*
for (i=0;i<2;i++)
{
console.log(Digitalcode[i])

}



digits.forEach(function(item, index)
{
  console.log("Set Didit to zero item ="+item +" index="+index);
});


segments.forEach(function(item, index)
{
  console.log("item ="+item +" index="+index);
});
*/


/*

<button onclick="numbers.forEach(myFunction)">Try it</button>
<p id="demo"></p>

<script>
demoP = document.getElementById("demo");
var numbers = [4, 9, 16, 25];

function myFunction(item, index) {
   demoP.innerHTML = demoP.innerHTML + "index[" + index + "]: " + item + "<br>";
}
</script>

*/

