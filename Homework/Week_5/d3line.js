/* d3line.js
*
* Jasper Naberman
* 10787224
* Data Processing Week 5
*
* A .js-script for the d3 line assignment
*/

// execute script when window is loaded
window.onload = function() {
	drawD3Line();
}

// initialize and draw the multiseries line graph
function drawD3Line(){
	// set the dimensions of the canvas
	var margin = {top: 60, right: 50, bottom: 50, left: 50},
			width = 1200 - margin.left - margin.right,
			height = 630 - margin.top - margin.bottom;
		
	var parseTime = d3.timeParse("%y-%m-%d");
	var bisectDate = d3.bisector(function(d) { return d.date; }).left;

	var xScale = d3.scaleTime().rangeRound([0, width])
	var yScale = d3.scaleLinear().rangeRound([height, 0]);
	
	var color = ["red", "black", "blue"]
	
	var line_maximum = d3.line()
		.curve(d3.curveCatmullRom)
	    .x(function(d) { return xScale(d.date); })
	    .y(function(d) { return yScale(d.maximum_temperature); });
	
	var line_average = d3.line()
		.curve(d3.curveCatmullRom)
	    .x(function(d) { return xScale(d.date); })
	    .y(function(d) { return yScale(d.average_temperature); });
		
	var line_minimum = d3.line()
		.curve(d3.curveCatmullRom)
	    .x(function(d) { return xScale(d.date); })
	    .y(function(d) { return yScale(d.minimum_temperature); });
		
	// add the SVG element
	svg = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	
	// load the data
	d3.json("dataMaastricht.json", function(data) { data.forEach(function(d) {
		d.average_temperature = +d.average_temperature / 10;
		d.minimum_temperature = +d.minimum_temperature / 10;
		d.maximum_temperature = +d.maximum_temperature / 10;
		d.date = parseTime(d.date.slice(2, 4) + "-" + 
			d.date.slice(4, 6) + "-" + d.date.slice(6, 8));
		});

		// initialize the axes domains
	    xScale.domain(d3.extent(data, function(d) { return d.date; }));
		
		yScale.domain([
			(d3.min(d3.extent(data, function(d) { return d.minimum_temperature; })) - 1),
			(d3.max(d3.extent(data, function(d) { return d.maximum_temperature; })) + 1)
		]);
		
		// add the axes
		svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(xScale))
			.append("text")
			.attr("fill", "#000")
			.attr("y", 30)
			.attr("x", width)
			.attr("dy", "0.71em")
			.attr("text-anchor", "end")
			.text("Dates");
		
		svg.append("g")
			.call(d3.axisLeft(yScale))
			.append("text")
			.attr("fill", "#000")
			.attr("transform", "rotate(-90)")
			.attr("y", -35)
			.attr("dy", "0.71em")
			.attr("text-anchor", "end")
			.text("Temperature (°C)");
	    
		// append the three temperature lines
		svg.append("path")
			.datum(data)
	        .attr("class", "line")
	        .attr("d", line_maximum)
			.style("stroke", "red");
	    
		svg.append("path")
			.datum(data)
	        .attr("class", "line")
	        .attr("d", line_average)
			.style("stroke", "black");
			
	    svg.append("path")
			.datum(data)
	        .attr("class", "line")
	        .attr("d", line_minimum)
			.style("stroke", "blue");
			
		// append a crosshair
	    var focus = svg.append("g")
	        .attr("class", "focus")
	        .style("display", "none");
		
		// x line crosshair
	    focus.append("line")
	        .attr("class", "x_hover_line hover-line")
	        .attr("y2", height);

	    var circles = focus.selectAll("circle")
			.data(["maximum_temperature", "minimum_temperature", "average_temperature"])
			.enter().append("circle")
			.attr("r", 4);
			
		var lines = focus.selectAll(".focuslines")
			.data(["maximum_temperature", "minimum_temperature", "average_temperature"])
			.enter().append("line")
			.attr("class", "y_hover_line hover-line")
			.attr("x1", 0)

	    focus.selectAll("text")
			.data(["maximum_temperature", "minimum_temperature", "average_temperature"])
			.enter().append("text")
			.attr("class", "crosshair_text")
			.attr("font-size", "10px")
			.attr("font-family", "sans-serif")
	      	.attr("dy", ".31em");

	    svg.append("rect")
	        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	        .attr("class", "overlay")
	        .attr("width", width)
	        .attr("height", height)
	        .on("mouseover", function() { focus.style("display", null); })
	        .on("mouseout", function() { focus.style("display", "none"); })
	        .on("mousemove", mousemove);

	    function mousemove() {
			var x0 = xScale.invert(d3.mouse(this)[0]),
				i = bisectDate(data, x0, 1),
				d0 = data[i - 1],
				d1 = data[i],
				d = x0 - d0.date > d1.date - x0 ? d1 : d0;
			focus.selectAll("circle")
				.data(["maximum_temperature", "minimum_temperature", "average_temperature"])
				.attr("cy", function(h) { return yScale(d[h])})
				.attr("cx", function() { return xScale(d.date)})
			
			focus.selectAll(".y_hover_line")
				.data(["maximum_temperature", "minimum_temperature", "average_temperature"])
				.attr("x2", function() { return xScale(d.date)})
				.attr("y2", function(h) { return yScale(d[h])})
				.attr("y1", function(h) { return yScale(d[h])})

			focus.select(".x_hover_line")
				.attr("y1", yScale(d.maximum_temperature))
				.attr("y2", height)
				.attr("x1", xScale(d.date))
				.attr("x2", xScale(d.date));

			focus.selectAll(".crosshair_text")
				.data(["maximum_temperature", "minimum_temperature", "average_temperature"])
		        .attr("x", function() { return xScale(d.date) + 7})
				.attr("y", function(h) { return yScale(d[h]) - 7})
				.text(function(h) { return d[h]});
	    }
	});
}