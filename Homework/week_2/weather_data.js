/* Weather Data.js
*
* Jasper Naberman
* 10787224
* Data Processing
*
* A script for the weather data assignment of data processing week 2
*/

// get the data from the html, split it by enters and store it in a variable
var data = document.getElementById("raw_data").innerHTML.split("\n")

// format the data into JavaScript dates and numbers
for(i = 0; i < data.length; i++){
	data[i] = data[i].split(",")
	data[i][0] = data[i][0].slice(2, 6) + "-" + data[i][0].slice(6, 8) + "-" + data[i][0].slice(8, 10)
	data[i][0] = new Date(data[i][0])
	data[i][1] = Number(data[i][1])
}

var canvas = document.getElementById("my_canvas")
var ctx = canvas.getContext("2d")

console.log(data[0])