/* test.js
*
* Jasper Naberman
* 10787224
* Data Processing Week 4
*
* A .js-script for the legend assignment
*/

d3.xml("test.svg", "image/svg+xml", function(error, xml) {
    if (error) throw error;
    document.body.appendChild(xml.documentElement);
	
	// retrieve color rectangle data from the svg file
	var x_color_rects = d3.select("#kleur1").attr("x")
	
	var color_rect_width = d3.select("#kleur1").attr("width")
	
	var color_rect_height = d3.select("#kleur1").attr("height")
	
	// append the necessary color rects
	var colors = ["#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#005824", "lightgrey"];
	
	d3.select("svg")
		.append("rect")
		.attr("id", "kleur4")
		.attr("class", "st1")
		.attr("x", x_color_rects)
		.attr("y", 138.7)
		.attr("width", color_rect_width)
		.attr("height", color_rect_height)
		.style("fill", colors[3]);
		
	d3.select("svg")
		.append("rect")
		.attr("id", "kleur5")
		.attr("class", "st1")
		.attr("x", x_color_rects)
		.attr("y", 178)
		.attr("width", color_rect_width)
		.attr("height", color_rect_height)
		.style("fill", colors[4]);
		
	d3.select("svg")
		.append("rect")
		.attr("id", "kleur6")
		.attr("class", "st1")
		.attr("x", x_color_rects)
		.attr("y", 218)
		.attr("width", color_rect_width)
		.attr("height", color_rect_height)
		.style("fill", colors[5]);
		
	d3.select("svg")
		.append("rect")
		.attr("id", "kleur7")
		.attr("class", "st1")
		.attr("x", x_color_rects)
		.attr("y", 255)
		.attr("width", color_rect_width)
		.attr("height", color_rect_height)
		.style("fill", colors[6]);
	
	// fill the leftover rects with colors	
	d3.select("#kleur1").style("fill", colors[0]);
	
	d3.select("#kleur2").style("fill", colors[1]);
		
	d3.select("#kleur3").style("fill", colors[2]);
	
	// retrieve text rectangle data from the svg file
	var x_text_rects = d3.select("#tekst1").attr("x")
	
	var text_rect_width = d3.select("#tekst1").attr("width")
	
	var text_rect_height = d3.select("#tekst1").attr("height")
	
	// append the necessary text rects
	d3.select("svg")
		.append("rect")
		.attr("id", "tekst5")
		.attr("class", "st2")
		.attr("x", x_text_rects)
		.attr("y", d3.select("#kleur5").attr("y"))
		.attr("width", text_rect_width)
		.attr("height", text_rect_height)
		
	d3.select("svg")
		.append("rect")
		.attr("id", "tekst6")
		.attr("class", "st2")
		.attr("x", x_text_rects)
		.attr("y", d3.select("#kleur6").attr("y"))
		.attr("width", text_rect_width)
		.attr("height", text_rect_height)
		
	d3.select("svg")
		.append("rect")
		.attr("id", "tekst7")
		.attr("class", "st2")
		.attr("x", x_text_rects)
		.attr("y", d3.select("#kleur7").attr("y"))
		.attr("width", text_rect_width)
		.attr("height", text_rect_height)
	
	// add value text in the text rects
	var values = ["100", "1000", "10000", "100000", "1000000", "10000000", "Unknow Data"]
	
	var x_text = 52
	
	d3.select("svg")
		.append("text")
		.style("fill", colors[5])
		.attr("x", x_text)
		.attr("y", 33)
		.text(values[0])
	
	d3.select("svg")
		.append("text")
		.style("fill", colors[5])
		.attr("x", x_text)
		.attr("y", 77)
		.text(values[1])
	
	d3.select("svg")
		.append("text")
		.style("fill", colors[5])
		.attr("x", x_text)
		.attr("y", 117)
		.text(values[2])
	
	d3.select("svg")
		.append("text")
		.style("fill", colors[5])
		.attr("x", x_text)
		.attr("y", 158)
		.text(values[3])
	
	d3.select("svg")
		.append("text")
		.style("fill", colors[5])
		.attr("x", x_text)
		.attr("y", 198)
		.text(values[4])
	
	d3.select("svg")
		.append("text")
		.style("fill", colors[5])
		.attr("x", x_text)
		.attr("y", 238)
		.text(values[5])
	
	d3.select("svg")
		.append("text")
		.style("fill", colors[5])
		.attr("x", x_text)
		.attr("y", 275)
		.text(values[6])
});
