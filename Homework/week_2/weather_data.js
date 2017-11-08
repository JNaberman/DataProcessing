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
var temperatures = []

// format the data into JavaScript dates and numbers
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
var width = canvas.width = 500
var height = canvas.height = 300
var style = canvas.style = "border: 1px solid #000000;"

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

// compute the minimum temperature
function temperatureMin(temperatureArray){
	var n = temperatureArray.length
	min = Infinity
  	while (n--){
    	if (Number(temperatureArray[n]) < min){
      		min = Number(temperatureArray[n])
    	}
  	}
  	return min
}

// compute the maximum temperature
function temperatureMax(temperatureArray){
	var n = temperatureArray.length
	max = -Infinity
	while (n--){
    	if (Number(temperatureArray[n]) > max){
    		max = Number(temperatureArray[n])
  		}
  	}
	return max
}

var axisSpace = 10

// make a new function with the function createTransform returns, but with the right parameters
var yTransform = createTransform([temperatureMin(temperatures), temperatureMax(temperatures)], [height - height / axisSpace, height / axisSpace])
var xTransform = createTransform([0, 365], [width / axisSpace, width])

// initiate and draw the path
ctx.beginPath()
ctx.moveTo(xTransform(0), yTransform(temperatures[0]))

for(i = 0; i < temperatures.length; i++){
	ctx.lineTo(xTransform(i), yTransform(temperatures[i]))
}

ctx.stroke()

ctx.font = "20px Arial"
ctx.textAlign = "center"
ctx.fillText("Average temperature in 2016 in De Bilt (NL)", width / 2, height / axisSpace)