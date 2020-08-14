var latitude = '53.42'

$.post("/hello", {
    javascript_data: latitude
});


// fetch('/hello')
//     .then(function(response) {
//         return response.text();
//     }).then(function(text) {
//         console.log('GET response text:');
//         console.log(text); // Print the greeting as text
//     });


// Send the same request
// fetch('/hello')
//     .then(function(response) {
//         return response.json(); // But parse it as JSON this time
//     })
//     .then(function(json) {
//         console.log('GET response as JSON:');
//         console.log(json); // Here’s our JSON object
//     })

// // POST

// var latitude = '53.42'
// fetch('/hello', {

//     // Specify the method
//     method: 'POST',

//     // A JSON payload
//     body: latitude,
// }).then(function(response) { // At this point, Flask has printed our JSON
//     return response.text();
// }).then(function(text) {

//     console.log('POST response: ');

//     // Should be 'OK' if everything was successful
//     console.log(text);
// });







// // Perform an API call to the Citi Bike Station Information endpoint
// var data = d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson", function(data) {

//     var features = data.features;

//     for (var i = 0; i < features.length; i++) {
//         // create custom icon
//         long = features[i].geometry.coordinates[1]
//         lat = features[i].geometry.coordinates[0]
//         console.log(long, lat)
//     }

// });