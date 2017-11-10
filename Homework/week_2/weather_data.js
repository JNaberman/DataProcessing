/* weather_data.js
*
* Jasper Naberman
* 10787224
* Data Processing
*
* A .js-script for the weather data assignment of data processing week 2
*/

// get the data from the XMLHTTPRequest, split it by enters and store it in a variable


var data = document.getElementById("raw_data").innerHTML.split("\n")

var temperatures = []

// parse the data into JavaScript dates and numbers
for(i = 0; i < data.length - 1; i++){
	data[i] = data[i].split(",")
	data[i][0] = data[i][0].slice(2, 6) + "-" + data[i][0].slice(6, 8) + "-" + data[i][0].slice(8, 10)
	data[i][0] = new Date(data[i][0])
	data[i][1] = Number(data[i][1])
	temperatures.push(Number(data[i][1]))
}

// get the canvas element and set it's parameters
var canvas = document.getElementById("my_canvas")
var ctx = canvas.getContext("2d")
var width = canvas.width = 650
var height = canvas.height = 325
// var style = canvas.style = "border: 1px solid #000000;"

function createTransform(domain, range){
	// domain is a two-element array of the data bounds [domain_min, domain_max]
	// range is a two-element array of the screen bounds [range_min, range_max]
	// this gives you two equations to solve:
	// range_min = alpha * domain_min + beta
	// range_max = alpha * domain_max + beta
 		// a solution would be:

    var domain_min = domain[0]
    var domain_max = domain[1]
    var range_min = range[0]
    var range_max = range[1]

    // formulas to calculate the alpha and the beta
   	var alpha = (range_max - range_min) / (domain_max - domain_min)
    var beta = range_max - alpha * domain_max

    // returns the function for the linear transformation (y= a * x + b)
    return function(x){
      return alpha * x + beta;
    }
}

// define padding for both axes
var yAxisSpace = 5
var xAxisSpace = 2 * yAxisSpace

// make a new function with the function createTransform returns, but with the right parameters
var yTransform = createTransform([-50, 300], [height - height / yAxisSpace, height / yAxisSpace])
var xTransform = createTransform([0, 365], [width / xAxisSpace, width])

// initiate and draw the path
ctx.beginPath()
ctx.moveTo(xTransform(0), yTransform(temperatures[0]))

for(i = 0; i < temperatures.length; i++){
	ctx.lineTo(xTransform(i), yTransform(temperatures[i]))
}

// make graph and axis titles
ctx.font = "20px Arial"
ctx.textAlign = "center"
ctx.fillText("Average temperature in 2016 in De Bilt (NL)", width / 2, 3 * xAxisSpace)

ctx.font = "13px Arial"
ctx.fillText("Months", (width + 60) / 2, height - yAxisSpace)

ctx.save()
ctx.translate(3 * xAxisSpace, (height - 10 * yAxisSpace) / 1.7)
ctx.rotate(-Math.PI / 2)
ctx.fillText("Temperature", 0, 0)
ctx.restore()

var xOneTick = (width - width / xAxisSpace) / 11
var yOneTick = ((height - height / yAxisSpace) - (height / yAxisSpace)) / 7
var tickSize = 5

// draw x-axis
ctx.moveTo(width / xAxisSpace, height - height / yAxisSpace)
for(i = 0; i < 12; i++){
	ctx.lineTo(width / xAxisSpace + i * xOneTick, height - height / yAxisSpace)
	ctx.lineTo(width / xAxisSpace + i * xOneTick, (height - height / yAxisSpace) + tickSize)
	ctx.moveTo(width / xAxisSpace + i * xOneTick, height - height / yAxisSpace)
}

// draw y-axis with tick values
ctx.moveTo(width / xAxisSpace, height - height / yAxisSpace)
for(i = 0; i < 8; i++){
	ctx.lineTo(width / xAxisSpace, height - height / yAxisSpace - i * yOneTick)
	ctx.lineTo(width / xAxisSpace - tickSize, (height - height / yAxisSpace) - i * yOneTick)
	ctx.moveTo(width / xAxisSpace, height - height / yAxisSpace - i * yOneTick)
	ctx.fillText(-5 + 5 * i, width / xAxisSpace - 3 * tickSize, (height - height / yAxisSpace) - i * yOneTick + height / 90)
}

// make array with months
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

ctx.font = "10px Arial"
ctx.textAlign = "right"

// draw months names rotated on the x-axis
for(i = 0; i < 12; i++){
	ctx.save()
	ctx.translate(width / xAxisSpace + i * xOneTick, (height - height / yAxisSpace) + 2 * tickSize)
	ctx.rotate(-Math.PI / 4)
	ctx.fillText(months[i], 0, 0)
	ctx.restore()
}
ctx.stroke()