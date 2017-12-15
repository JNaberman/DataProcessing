/* LinkedViews.js
*
* Jasper Naberman
* 10787224
* Data Processing Week 6
*
* A .js-script for the LinkedViews assignment
*/

// execute script when window is loaded


queue()
	.defer(d3.json, "population_data.json")
	.await(drawMap)

function drawMap(error, data){
	
	var basic = new Datamap({
		element: document.getElementById("container"),
		projection: 'mercator',
		// make colors for filling the map to population size.
	    fills: {
	     	defaultFill: "#ABDDA4",
	     	big3: "#000033",
			big2: "#000066",
			big1: "#000099",
	     	medium3: "#0000cc",
			medium2: "#0000ff",
			medium1: "#3333ff",
	     	small3: "#6666ff",
			small2: "#9999ff",
			small1: "#ccccff"
	    },
	    data: {
			// RUS: { fillKey: "big3" },
			// KAZ: { fillKey: "big2" },
			// MNG: { fillKey: "big1" },
			// CHN: { fillKey: "medium3" },
			// IND: { fillKey: "medium2" },
			// MMR: { fillKey: "medium1" },
			// THA: { fillKey: "small1" },
		}
	});
	
	var dict = {}
	var countries = d3.selectAll('.datamaps-subunit')
	
	// make a dictionaty for the country names and codes (e.g. Russia and RUS)
	for(i = 0; i < 177; i++){
		key = countries[0][i].__data__.id
		value = countries[0][i].__data__.properties.name
		dict[key] = value
	}
	
	var dictTest = {};
	var values = Object.values(dict);
	
	for (i = 0; i < data.length; i++){
		for (j = 0; j < values.length; j++) {
			if (data[i].country == values[j]) {
				dictTest["countryID"] = dict.key;
			}
		}
	}
}