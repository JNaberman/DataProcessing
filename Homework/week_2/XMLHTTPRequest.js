/* XMLHTTPRequest.js
*
* Jasper Naberman
* 10787224
* Data Processing Week 2
*
* A script for the XMLHTTP-request for the weather data assignment
*/

// initialize the request
var xhr = new XMLHttpRequest()

// if the request is done, save the response text in a html element
xhr.onreadystatechange = function () {
  if(xhr.readyState === 4 && xhr.status === 200) {
	var rawData = xhr.responseText
	makeGraph(rawData)
  }
}

// open the file and send request
xhr.open("GET", "KNMI_20161231.txt.tsv", true)
xhr.send()