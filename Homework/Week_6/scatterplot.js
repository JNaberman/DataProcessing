/* scatterplot.js
*
* Jasper Naberman
* 10787224
* Data Processing Week 4
*
* A .js-script for the scatterplot assignment
*/

// execute script when window is loaded
window.onload = function() {
	drawScatterplot();
}

// initialize and draw the scatterplot
function drawScatterplot(){
	// set the dimensions of the canvas
	margin = {top: 30, right: 260, bottom: 50, left: 70},
		width = 1200 - margin.left - margin.right,
		height = 600 - margin.top - margin.bottom;

	// initialize the axes
	var xValue = function(d) { return d.alcohol;};
	var yValue = function(d) { return d.tobacco;};
	
	var xScale = d3.scale.linear().range([30, width]);
	var yScale = d3.scale.linear().range([height - 30, 0]);
	
	var xMap = function(d) { return xScale(xValue(d));};
	var yMap = function(d) { return yScale(yValue(d));};
	
	var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
	var yAxis = d3.svg.axis().scale(yScale).orient("left");

	// initialize continent colors
	var cValue = function(d) { return d.continent;};
	var color = d3.scale.category10();
	
	// add the SVG element
	svg = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

	// add the tooltip area to the webpage
	var tooltip = d3.select("body").append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);

	// load the data
	d3.json("data.json", function(error, data){
		if (error) throw error;
	
		data.forEach(function(d){
			d.Alcohol = +d.alcohol;
			d.Smoking = +d.tobacco;
		});
	
		// add in buffer to data domain
		xScale.domain([d3.min(data, xValue), d3.max(data, xValue)]);
		yScale.domain([d3.min(data, yValue), d3.max(data, yValue)]);

		// append x-axis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.append("text")
			.attr("class", "label")
			.attr("x", width)
			.attr("y", 40)
			.style("text-anchor", "end")
			.text("Average Alcohol Consumption per Adult (Aged 15+) in 2005, Litres");

		// append y-axis
	    svg.append("g")
	        .attr("class", "y axis")
	        .call(yAxis)
			.append("text")
	        .attr("class", "label")
	        .attr("transform", "rotate(-90)")
	        .attr("y", -45)
	        .attr("dy", ".71em")
	        .style("text-anchor", "end")
	        .text("Prevalence of Tobacco Use Among Adults (Aged 15+) in 2005, %");

		// draw dots
		svg.selectAll(".dot")
			.data(data)
			.enter().append("circle")
			.attr("class", "dot")
			.attr("r", function(d) {return (Math.pow(d.population, 1 / 4)) / 5;})
			.attr("cx", xMap)
			.attr("cy", yMap)
			.attr("fill", function(d) { return color(cValue(d));})
			.on("mouseover", function(d) {
				tooltip.transition()
					.style("opacity", .9);
				tooltip.html("Country: " + d.country + "<br/>" + "Alcohol consumption: " + xValue(d) + " Litres" + "<br/>" 
						+ "Tobacco use: " + yValue(d) + "%" + "<br/>" + "Population: " + d.population + "<br/>" + 
						"Continent: " + d.continent)
					.style("font-size", "10px")
					.style("font-family", "sans-serif")
					.style("left", (d3.event.pageX + 5) + "px")
					.style("top", (d3.event.pageY - 28) + "px")
				})
			.on("mousemove", function(d) {
				tooltip.transition()
					.duration(50)
					.style("opacity", .9);
				tooltip.html("Country: " + d.country + "<br/>" + "Alcohol consumption: " + xValue(d) + " Litres" + "<br/>" 
						+ "Tobacco use: " + yValue(d) + "%" + "<br/>" + "Population: " + d.population + "<br/>" + 
						"Continent: " + d.continent)
					.style("font-size", "10px")
					.style("font-family", "sans-serif")
					.style("left", (d3.event.pageX + 5) + "px")
					.style("top", (d3.event.pageY - 28) + "px");
				})
			.on("mouseout", function(d) {
				tooltip.transition()
					.duration(400)
					.style("opacity", 0);
			});
		
		// draw legend
	    var legend = svg.selectAll(".legend")
	        .data(color.domain())
	      	.enter().append("g")
	        .attr("class", "legend")
	        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")";});

	    // draw legend colored circles
	    legend.append("circle")
	        .attr("cx", width + 60)
			.attr("cy", 180)
	        .attr("r", 8)
	        .style("fill", color);

	    // draw legend text
	    legend.append("text")
	        .attr("x", width + 75)
	        .attr("y", 180)
	        .attr("dy", ".35em")
	        .style("text-anchor", "start")
			.style("font-size", "10")
			.style("font-family", "sans-serif")
	        .text(function(d) { return d;})
		
		// add world map legend
		var g = svg.append("g");
		var img = g.append("svg:image")
		    .attr("xlink:href", "Location_of_Continents.svg")
		    .attr("width", 345)
		    .attr("height", 180)
		    .attr("x", width - 50)
		    .attr("y", 0);
	})
}
