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
    var svgArea = d3.select("g.overallG").selectAll("*").remove();
    if (!svgArea.empty()) {
        svgArea.remove();
    };
    console.log('cleaned.....')
};


// Event handler to grab popup box info and paste to box1
function overallTeamViz(locationData, magnitudeData) {

    // svg params
    var svgHeight = window.innerHeight;
    var svgWidth = window.innerWidth;
    // margins
    var margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };
    // chart area minus margins
    var chartHeight = svgHeight - margin.top - margin.bottom;
    var chartWidth = svgWidth - margin.left - margin.right;


    // create svg container
    var svg = d3.select("div.viz").append("svg")
        .append("g")
        .attr("id", "teamsG")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    d3.select("svg")
        .append("g")
        .attr("id", "teamsG")
        .attr("transform", "translate(10,50)")
        .selectAll("g")
        .data(locationData)
        .enter()
        .append("g")
        .attr("class", "overallG")
        .attr("transform", function(d, i) { return "translate(" + (10 * 10) + ", 50%)" });

    var teamG = d3.select("g.overallG");

    console.log(locationData);
    console.log(magnitudeData);

    teamG
        .append("circle")
        .attr("r", 20);
    teamG
        .append("text")
        .html(` ${magnitudeData}`)
        .attr("transform", `translate(${margin.left}, ${margin.top})`);


    // .text(incomingData);

    // .html(function(d, i) { return d });
    // .text(function(d) { return d });

    // var dataKeys = d3.keys(incomingData[0])
    //     .filter(function(el) { return el != "team" && el != "region" })
    // d3.select("#controls").selectAll("button.teams").data(dataKeys).enter().append("button")
    //     .on("click", buttonClick)
    //     .html(function(d) { return d });

    // function buttonClick(d) {
    //     var maxValue = d3.max(incomingData, function(el) { return parseFloat(el[d]) });
    //     var colorQuantize = d3.scale.quantize().domain([0, maxValue]).range(colorbrewer.Reds[3]);
    //     var radiusScale = d3.scale.linear().domain([0, maxValue]).range([2, 20]);
    //     d3.selectAll("g.overallG").select("circle").transition().duration(1000).style("fill", function(p) { return colorQuantize(p[d]) }).attr("r", function(p) { return radiusScale(p[d]) })
    // }

    // teamG.on("mouseover", highlightRegion);
    // teamG.on("mouseout", unHighlight);

    // function highlightRegion(d, i) {
    //     var teamColor = d3.rgb("pink")
    //     d3.select(this).select("text").classed("highlight", true).attr("y", 10)
    //     d3.selectAll("g.overallG").select("circle").style("fill", function(p) { return p.region == d.region ? teamColor.darker(.75) : teamColor.brighter(.5) })
    //     this.parentElement.appendChild(this);

    // }

    // function unHighlight() {
    //     d3.selectAll("g.overallG").select("circle").style("fill", "pink");
    //     d3.selectAll("g.overallG").select("text").attr("y", 30).classed("highlight", false);
    // }


}
// #####################################################
// ### END TEST 
// #####################################################    

// Perform an API call to the Citi Bike Station Information endpoint
var data = d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson", function(data) {


    var features = data.features;
    var techtonicArray = [];
    var earthquakeMarkers = [];
    var heatArray = [];


    for (var i = 0; i < features.length; i++) {
        // create custom icon
        var earthquakeIcon = L.icon({
            iconUrl: '../static/images/noun_Earthquake_709338.svg',
            iconSize: [features[i].properties.mag * 6, features[i].properties.mag * 12], // size of the icon
            popupAnchor: [0, -15]
        });

        // create popup contents
        var customPopup = `<b>Location:</b> <context id='location'> ${features[i].properties.place} </context> <br> <b>Magnitude:</b>  <context id='magnitude'> ${features[i].properties.mag} </context> <hr> <p class='littledetails'>Lat: <context id='lat'> ${features[i].geometry.coordinates[1]} </context>, Lat: <context id='long'> ${features[i].geometry.coordinates[0]} </context>, Date: <context id='date'> ${features[i].properties.time} </context><p>`;

        // specify popup options 
        var customOptions = {
            'maxWidth': '500',
            'className': getStyle(features[i].properties.mag)
        }

        function getStyle(d) {
            if (2.49 > d) {
                return 'custom';
            } else if (3.0 > d) {
                return 'custom2';
            } else if (d > 3.1) {
                return 'custom3';
            }
        };
        // ###############################################################################
        //  LEFT OFF HERE


        // loop through the cities array, create a new marker, push it to the cityMarkers array
        earthquakeMarkers.push(
            L.marker([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], { icon: earthquakeIcon })
            .bindPopup(customPopup, customOptions)
            .on('click', function(d, i) {
                d = d3.select("div.leaflet-popup-content > #location").html();
                d2 = d3.select("div.leaflet-popup-content > #magnitude").html();
                cleanBox();
                overallTeamViz(d, d2);
                // d3.select("#box1").selectAll("div")
                //     .data([d])
                //     .enter() // creates placeholder for new data
                //     .append("div") // appends a div to placeholder
                //     .classed("col", true) // sets the class of the new div
                //     .html(function(d, i) {
                //         return ` <h2>${d}${i} </h2> `;
                //     }); // sets the html in the div to an image tag with the link
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
        blur: 15,
        max: 1.0
    });

    // Define variables for our tile layers
    var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 15,
        id: "light-v10",
        accessToken: API_KEY
    });

    var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 15,
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
        zoom: 8,
        layers: [light, earthquakeLayer]
    });


    // Pass our map layers into our layer control
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);

    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend ");


        var legendInfo = `<h2>${features.length}</h2> Earthquakes recorded <br>in the past 7 days`;

        div.innerHTML = legendInfo;

        div.innerHTML += " <br>Magnitude Ranges: <ul class='range1'> 2.5 & below</ul><ul class='range2'> 2.5 - 3.0 </ul><ul class='range3'> 3.1+ </ul> ";
        return div;

    };

    // Adding legend to the map
    legend.addTo(myMap);

    // ########################################
    // Water Mark
    // ##########################################
    L.Control.Watermark = L.Control.extend({
        onAdd: function(map) {
            var img = L.DomUtil.create('img');

            img.src = '../static/images/logo.png';
            img.style.width = '100px';

            return img;
        },
        onRemove: function(map) {
            // Nothing to do here
        }
    });
    L.control.watermark = function(opts) {
        return new L.Control.Watermark(opts);
    }
    L.control.watermark({ position: 'bottomleft' }).addTo(myMap);




});