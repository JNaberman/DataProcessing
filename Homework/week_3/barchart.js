/* barchart.js
*
* Jasper Naberman
* 10787224
* Data Processing Week 3
*
* A .js-script for the barchart assignment
*/

// set the dimensions of the canvas
margin = {top: 80, right: 20, bottom: 70, left: 70}, width = 1000 - margin.left - margin.right,
	height = 600 - margin.top - margin.bottom;


// set the ranges
x = d3.scale.ordinal().rangeRoundBands([0, width], 0.1);

y = d3.scale.linear().range([height, 0]);

// define the x-axis
axisX = d3.svg.axis()
	.scale(x)
	.orient("bottom")

// define the y-axis
axisY = d3.svg.axis()
	.scale(y)
	.orient("left")
	.tickSize(-width)
	.ticks(10);

// add the SVG element
svg = d3.select("body").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

tip = d3.tip()
	.attr('class', 'd3-tip')
	.offset([-10, 0])
	.html(function(d) {
		return "<span style='color: lightblue'>" + d.maxTemp + " °C" + "</span>";
})

svg.call(tip);
	
// load the data
d3.json("data.json", function(data) { data.forEach(function(d) {
	d.date = d.date;
	d.maxTemp =+ d.maxTemp / 10;
});

	svg.append("text")
	        .attr("x", (width / 2))             
	        .attr("y", 0 - (margin.top / 2))
	        .attr("text-anchor", "middle")  
	        .style("font-size", "20px")
			.style("font-family", "sans-serif")
	        .text("Maximum Temperature in February 2014 in De Bilt, The Netherlands (in °C)");
		
	// scale chart
	x.domain(data.map(function(d) { return d.date; }));
	y.domain([0, d3.max(data, function(d) { return d.maxTemp; })]);

	// initialize x-axis
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(axisX)
		// append x-axis tick labels
		.selectAll("text")
        .style("font-size", "10px")
		.style("font-family", "sans-serif")
		.attr("dx", "-.8em")
		.attr("dy", "-.180em")
		.style("text-anchor", "end")
		.attr("transform", "rotate(-55)")
	
	// append x-axis title
	svg.append("text")
	    .attr("text-anchor", "end")
	    .attr("transform", "translate(" + (width) + "," + (height + margin.bottom) + ")")
        .style("font-size", "10px")
		.style("font-family", "sans-serif")
	    .text("Dates");

	// initialize-y axis
	svg.append("g")
		.attr("class", "y axis")
		.call(axisY)
		// append y-axis title
		.append("text")
		.attr("y", -36)
		.attr("dy", ".69em")
		.style("text-anchor", "end")
        .style("font-size", "10px")
		.style("font-family", "sans-serif")
		.attr("transform", "rotate(-90)")
		.text("Maximum Temperature");

	// add bars to chart
	svg.selectAll("bar")
		.data(data)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function(d) { return x(d.date); })
		.attr("width", x.rangeBand())
		.attr("y", function(d) { return y(d.maxTemp); })
		.attr("height", function(d) { return height - y(d.maxTemp); })
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide)

});