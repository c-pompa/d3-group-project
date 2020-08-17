// Add Techtonic Plate Later as an option
var techtonicLayer = L.layerGroup();
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json", function(techtonicData) {
    L.geoJSON(techtonicData, {
        color: 'orange',
        weight: 2
    }).addTo(techtonicLayer);
});


// Clean box1 before loading new data. If not cleaned, info will overlap
function cleanBox() {
    var svgArea = d3.select("div.viz").selectAll("*").remove();
    if (!svgArea.empty()) {
        svgArea.remove();
    };
    console.log('cleaned.....')
};


function update_data(d_lat) {
    d3.json(`test/update/${d_lat}`, function(d) {
        console.log(d)
        var box1 = d3.select("div.viz");

        var tRow = box1.append("div").attr("class", "row");

        var tData = tRow.append("div").attr("class", "col").attr("id", "magnitude_info");
        tData.html(`<span class='mag_title'>MAGNITUDE</span><p class='mag-number'> ${d[3]['magnitude']} </p><div class='small_details'>City:  ${d[3]['city']}</div>`)

        var tData2 = tRow.append("div").attr("class", "col-7").attr("id", "weather_info");
        tData2.html(`<h3>Temperatures </h3>
        <ul> <li><p class='date'>${d[3]['date']['month_day_year']}</p>${d[3]['maxtemp']}° / ${d[3]['mintemp']}°    |    Avg: ${d[3]['avgtemp']}° <a href="#" class="tooltip-test" title="Day of Earthquake"><img src="../static/images/noun_Earthquake_709338.svg" width="20px" ></a></li>
        <li><p class='date'>${d[2]['date']['month_day_year']}</p>${d[2]['maxtemp']}° / ${d[2]['mintemp']}°    |    Avg: ${d[2]['avgtemp']}°</li>
        <li><p class='date'>${d[1]['date']['month_day_year']}</p>${d[1]['maxtemp']}° / ${d[1]['mintemp']}°    |    Avg: ${d[1]['avgtemp']}°</li>
        <li><p class='date'>${d[0]['date']['month_day_year']}</p>${d[0]['maxtemp']}° / ${d[0]['mintemp']}°    |    Avg: ${d[0]['avgtemp']}°</li></ul><span class='date'>(high/low)</span>
        `)


    });
};



// function analysisChart() {
//     d3.json(`test/update/${d_lat}`, function(d) {
//         console.log(d)
//         var box1 = d3.select("div.viz");

//         var tRow = box1.append("div").attr("class", "row");

//         var tData = tRow.append("div").attr("class", "col").attr("id", "magnitude_info");
//         tData.html(`<span class='mag_title'>MAGNITUDE</span><p class='mag-number'> ${d[3]['magnitude']} </p><div class='small_details'>City:  ${d[3]['city']}</div>`)

//         var tData2 = tRow.append("div").attr("class", "col-7").attr("id", "weather_info");
//         tData2.html(`<h3>Temperatures </h3>
//         <ul> <li><p class='date'>${d[3]['date']['month_day_year']}</p>${d[3]['maxtemp']}° / ${d[3]['mintemp']}°    |    Avg: ${d[3]['avgtemp']}° <a href="#" class="tooltip-test" title="Day of Earthquake"><img src="../static/images/noun_Earthquake_709338.svg" width="20px" ></a></li>
//         <li><p class='date'>${d[2]['date']['month_day_year']}</p>${d[2]['maxtemp']}° / ${d[2]['mintemp']}°    |    Avg: ${d[2]['avgtemp']}°</li>
//         <li><p class='date'>${d[1]['date']['month_day_year']}</p>${d[1]['maxtemp']}° / ${d[1]['mintemp']}°    |    Avg: ${d[1]['avgtemp']}°</li>
//         <li><p class='date'>${d[0]['date']['month_day_year']}</p>${d[0]['maxtemp']}° / ${d[0]['mintemp']}°    |    Avg: ${d[0]['avgtemp']}°</li></ul><span class='date'>(high/low)</span>
//         `)


//     });
// };




function factsRow() {
    d3.json(`test/facts`, function(d) {
        console.log(d)
        var box1 = d3.select("div#fact-boxes");

        var tRow = box1.append("div").attr("class", "row align-items-center");



        // ${d[0]['count']}
        var tData = tRow.append("td").attr("class", "facts1").attr("id", "above6");
        tData.html(`<h1 id='facts'>0</h1> <h4>earthquakes<br>above 6.0</h4> `)

        var tData2 = tRow.append("td").attr("class", "facts1").attr("id", "highest_recorded_eq");
        tData2.html(`<span class='small_details'>magnitude of</span> <h1>${d[0].highest_magnitude}</h1><h4>in ${d[0]['highest_location']}<br>on ${d[0]['date']['month_day']} is the<br>highest recorded
        `)


    });
};
factsRow();


function factsBoxesOpen() {
    d3.json(`test/factsLatestQuake`, function(d) {
        console.log(d)
            // from data.js
            // Assign a variable to retreive data from data.js
            // var tableData = d;

        // Table Body: Select the body of the table. We will add data to this area.
        // Call using d3.select()
        var tbody = d3.select("#target-table-display");

        var tRow = tbody.append("tr").attr("class", "tr-data").attr("id", "");
        tRow.html(`<td>${d[0]['date']['month_day']}</td><td>${d[0]['country']}</td><td>${d[0]['region']}</td><td>${d[0]['magnitude']}</td><td>${d[0]['maxtemp']}</td><td>${d[0]['mintemp']}</td><td>${d[0]['avgtemp']}</td>`)
        var tRow = tbody.append("tr").attr("class", "tr-data").attr("id", "");
        tRow.html(`<td>${d[1]['date']['month_day']}</td><td>${d[1]['country']}</td><td>${d[1]['region']}</td><td>${d[1]['magnitude']}</td><td>${d[1]['maxtemp']}</td><td>${d[1]['mintemp']}</td><td>${d[1]['avgtemp']}</td>`)
        var tRow = tbody.append("tr").attr("class", "tr-data").attr("id", "");
        tRow.html(`<td>${d[2]['date']['month_day']}</td><td>${d[2]['country']}</td><td>${d[2]['region']}</td><td>${d[2]['magnitude']}</td><td>${d[2]['maxtemp']}</td><td>${d[2]['mintemp']}</td><td>${d[2]['avgtemp']}</td>`)
        var tRow = tbody.append("tr").attr("class", "tr-data").attr("id", "");
        tRow.html(`<td>${d[3]['date']['month_day']}</td><td>${d[3]['country']}</td><td>${d[3]['region']}</td><td>${d[3]['magnitude']}</td><td>${d[3]['maxtemp']}</td><td>${d[3]['mintemp']}</td><td>${d[3]['avgtemp']}</td>`)
        var tRow = tbody.append("tr").attr("class", "tr-data").attr("id", "");
        tRow.html(`<td>${d[4]['date']['month_day']}</td><td>${d[4]['country']}</td><td>${d[4]['region']}</td><td>${d[4]['magnitude']}</td><td>${d[4]['maxtemp']}</td><td>${d[4]['mintemp']}</td><td>${d[4]['avgtemp']}</td>`)




    });
};
factsBoxesOpen();



$(document).ready(function() {
    $('[data-toggle="tooltip"]').each(function() {
        new Tooltip($(this), {
            placement: 'top',
        });
    });
});

// API call for earthquake data
var data = d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson", function(data) {


    var features = data.features;
    var techtonicArray = [];
    var earthquakeMarkers = [];
    var heatArray = [];

    // // Convert date from unix to traditional
    // function timeConverter(UNIX_timestamp) {
    //     var a = new Date(UNIX_timestamp * 1000);
    //     (a.toGMTString() + "<br>" + a.toLocaleString());
    //     var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    //     var year = new_time.getFullYear();
    //     var month = months[new_time.getMonth()];
    //     var date = new_time.getDate();
    //     var time = month + ' ' + date;
    //     return time;
    // }


    for (var i = 0; i < features.length; i++) {
        // create custom icon
        var earthquakeIcon = L.icon({
            iconUrl: '../static/images/noun_Earthquake_709338.svg',
            iconSize: [features[i].properties.mag * 6, features[i].properties.mag * 14], // size of the icon
            popupAnchor: [0, -15]
        });



        // create popup contents
        var customPopup = `<b>Location:</b> <context id='location'> ${features[i].properties.place} </context> <br> <b>Magnitude:</b>  <context id='magnitude'> ${features[i].properties.mag} </context> <hr> <p class='littledetails'>Lat: <context id='lat'>${features[i].geometry.coordinates[1]} </context>, Long:<context id='long'>${features[i].geometry.coordinates[0]}</context>, 
    
        <p>`;
        // Date: <context id='date'> ${timeConverter(features[i].properties.time)}, ${features[i].properties.time} </context>
        // specify popup options 
        var customOptions = {
            'maxWidth': '500',
            'className': getStyle(features[i].properties.mag)
        }

        function getStyle(d) {
            if (4.9 > d) {
                return 'custom';
            } else if (5.5 > d) {
                return 'custom2';
            } else if (d > 5.6) {
                return 'custom3';
            }
        };

        // loop through the cities array, create a new marker, push it to the cityMarkers array
        earthquakeMarkers.push(
            L.marker([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], { icon: earthquakeIcon })
            .bindPopup(customPopup, customOptions)

            .on('click', function(d, i) {
                d = d3.select("div.leaflet-popup-content > #location").html();
                d2 = d3.select("div.leaflet-popup-content > #magnitude").html();
                d_lat = d3.select("p.littledetails > #lat").html();
                console.log(d_lat);
                cleanBox();
                update_data(d_lat);
                // analysisChart(d2);

            })
        )


        if (location) {
            techtonicArray.push([]);
        }

        if (location) {
            heatArray.push([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]]);
        }
    };


    var earthquakeLayer = L.layerGroup(earthquakeMarkers);

    var heat = L.heatLayer(heatArray, {
        minOpacity: .20,
        radius: 55,
        blur: 20,
        max: 1.0
    });

    // Define variables for our tile layers
    var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 8,
        minZoom: 3,
        id: "light-v10",
        accessToken: API_KEY
    });

    var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 8,
        minZoom: 3,
        id: "dark-v10",
        accessToken: API_KEY
    });

    // Only one base layer can be shown at a time
    var baseMaps = {
        Light: light,
        Dark: dark
    };

    // Overlays that may be toggled on or off
    var overlayMaps = {
        'Earthquakes': earthquakeLayer,
        'Techtonic Plates': techtonicLayer,
        'Heat Map': heat
    };

    // Create map object and set default layers
    var myMap = L.map("map", {
        center: [34.0522, -118.2437],
        zoom: 4,
        zoomControl: false,
        layers: [light, earthquakeLayer]
    });

    // Pass our map layers into our layer control
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
    //Create SVG element



    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend ");


        var legendInfo = `<h2>${features.length}</h2> Earthquakes<br>/ 30 days`;

        div.innerHTML = legendInfo;

        div.innerHTML += " <br>Magnitude: <ul class='range1'> 4.5 - 4.9</ul><ul class='range2'> 5.0 - 5.5 </ul><ul class='range3'> 5.6+ </ul> ";
        return div;

    };

    // Adding legend to the map
    legend.addTo(myMap);

    L.control.zoom({
        position: 'bottomright'
    }).addTo(myMap);

    // ########################################
    // Water Mark
    // ##########################################
    L.Control.Watermark = L.Control.extend({
        onAdd: function(map) {
            var img = L.DomUtil.create('img');

            img.src = '../static/images/logo.png';
            img.style.width = '25px';

            return img;
        },
        onRemove: function(map) {
            // Nothing to do here
        }
    });
    L.control.watermark = function(opts) {
        return new L.Control.Watermark(opts);
    }
    L.control.watermark({ position: 'topleft' }).addTo(myMap);



});