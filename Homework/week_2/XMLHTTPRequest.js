/* XMLHTTPRequest.js
*
* Jasper Naberman
* 10787224
* Data Processing
*
* A script for the XMLHTTP-request for the weather data assignment
*/

// initialize the request and open the file
var xhr = new XMLHttpRequest()





// if the request is done, save the response text in a html element
xhr.onreadystatechange = function () {
  if(xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText);
	document.getElementById("raw_data").innerHTML = xhr.responseText
	var rawData = xhr.responseText
  }
}

xhr.open("GET", "KNMI_20161231.txt.tsv", true)
xhr.send()