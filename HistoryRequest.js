function loadWods() {
    let numDays = document.getElementById('numDays').value;
    let apiKey = document.getElementById('apiKey').value;
    loadMultipleFormattedWODs(apiKey, "CrossFit TurnPoint", "Crossfit", numDays)
}

function loadFormattedWOD(apiKey, date, location, program) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = proxyurl + "https://app.wodify.com/API/WODs_v1.aspx";
    let payload = "?apikey=" + apiKey + "&date=" + date + "&location=" + location + "&program=" + program + "&type=json";

    console.log("Sending request to API: " + url + payload);
    sendRequest(url + payload);

    return false;
}

function loadMultipleFormattedWODs(apiKey, location, program, numDays) {
    var date = new Date();
    dayCounter = 0;

    while (dayCounter < numDays) {
        date.setDate(date.getDate() - 1);
        var newDateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();
        console.log(newDateString);
        loadFormattedWOD(apiKey, newDateString, location, program);
        dayCounter++;
    }
}

/**
 * Create the XHR request
 *
 */
function createXHR() {
    try { return new XMLHttpRequest(); } catch(e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch (e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch (e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}
    try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}

    return null;
}

/**
 * Send XHR Request
 *
 */
function sendRequest(url) {
    var xhr = createXHR();

    if (xhr) {
        xhr.open("GET",url,true);
        xhr.onreadystatechange = function(){handleResponse(xhr);};
        xhr.send();
    }
}

/**
 * Handle XHR Response
 *
 */
function handleResponse(xhr) {
    if (xhr.readyState == 4  && xhr.status == 200) {
        document.getElementById('results').innerHTML = document.getElementById('results').innerHTML + "<br><br>" + JSON.parse(xhr.responseText).RecordList.APIWod.FormattedWOD;
    } else if (xhr.readyState == xhr.DONE && xhr.status == 401) {
        console.log("Wodify API query failed.");
        alert("Sorry, Query failed.  Please check your request payload and try again");
    }

    return;
}