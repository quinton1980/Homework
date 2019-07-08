
    var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
    });

    L
    .control
    .layers(baseMaps, overlayMaps)
    .addTo(map);

    var earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

    var my_map = L.map("wicked_map", {
      center: [49.246292, -123.116226],
      zoom: 3.5
    });

    d3.json(earthquake_url, function(data) {
      // Creating a GeoJSON layer with the retrieved data
      L.geoJson(data,{
        style: function(features){
          return{
            fillColor: chooseColor(features.properties.mag),
            fillOpacity: 0.5,
            radius: getRadius(feature.properties.mag),
            weight: 1.5
          };
        }
      },
        function chooseColor(magnitude) {
          switch (true) {
          case magnitude>5:
            return "yellow";
          case magnitude>4:
            return "red";
          case magnitude>3:
            return "orange";
          case magnitude>2:
            return "green";
          case magnitude>1:
            return "purple";
          default:
            return "black";
          }
        },
        function getRadius(magnitude) {
          if (magnitude === 0) {
            return 1;
          }
          return magnitude * 2.5;
        },
        L.geoJson(data, {
          pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
          },
          style: getStyle,
          onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
          }
        }).addTo(earthquakes));
      
        earthquakes.addTo(map);

    // lightmap.addTo(my_map);

    // var overlayMaps = {
    //   "Earthquakes": earthquakes
    // };
  
    // function markerSize(magnitude) {
    //   return magnitude *2.5;
    // }

    
    
    
    //     onEachFeature: function(features, layer) {
    //       // Set mouse events to change map styling
    //       layer.on({
    //         mouseover: function(event) {
    //           layer = event.target;
    //           layer.setStyle({
    //             fillOpacity: 0.9
    //           });
    //         },
    //         mouseout: function(event) {
    //           layer = event.target;
    //           layer.setStyle({
    //             fillOpacity: 0.5
    //           });
    //         },
    //         click: function(event) {
    //           map.fitBounds(event.target.getBounds());
    //         }
    //       });
    //       // Giving each feature a pop-up with information pertinent to it
    //       layer.bindPopup("<h1>" + features.properties.place + "</h1> <hr> <h2>" + feature.properties.mag + "</h2>");
    
    //     }
    
    //   }).addTo(my_map);
    });
    








//     var layers = {
//       zero_plus: new L.LayerGroup(),
//       one_plus: new L.LayerGroup(),
//       two_plus: new L.LayerGroup(),
//       three_plus: new L.LayerGroup(),
//       four_plus: new L.LayerGroup(),
//       five_plus: new L.LayerGroup()
//     };
    
//     var my_map = L.map("wicked_map", {
//       center: [49.246292, -123.116226],
//       zoom: 3.5,
//       layers: [
//         layers.zero_plus,
//         layers.one_plus,
//         layers.two_plus,
//         layers.three_plus,
//         layers.four_plus,
//         layers.five_plus
//       ]
//     });
    
//     lightmap.addTo(my_map);

//     var overlays = {
//       "0-1": layers.zero_plus,
//       "1-2": layers.one_plus,
//       "2-3": layers.two_plus,
//       "3-4": layers.three_plus,
//       "4-5": layers.four_plus,
//       "5+": layers.five_plus
//     };
    
//     L.control.layers(null, overlays).addTo(my_map);

//     var info = L.control({
//       position: "bottomright"
//     });
    
//     info.onAdd = function() {
//       var div = L.DomUtil.create("div", "legend");
//       return div;
//     };

//     info.addTo(my_map);

//     var circles = {
//       zero_plus: L.circle({
//         color: "red",
//         radius: 50.0,
//         shape: "circle"
//       }),
//       one_plus: L.circle({
//         color: "red",
//         radius: 50.0,
//         shape: "circle"
//       }),
//       two_plus: L.circle({
//         color: "red",
//         radius: 50.0,
//         shape: "circle"
//       }),
//       three_plus: L.circle({
//         color: "red",
//         radius: 50.0,
//         shape: "circle"
//       }),
//       four_plus: L.circle({
//         color: "red",
//         radius: 50.0,
//         shape: "circle"
//       }),
//       five_plus: L.circle({
//         color: "red",
//         radius: 50.0,
//         shape: "circle"
//       }),
//     };
    
//     d3.json(earthquake_url,(data) => {
//       var features = data.features;

//       var quakeCount = {
//         zero_plus: 0,
//         one_plus: 0,
//         two_plus: 0,
//         three_plus: 0,
//         four_plus: 0,
//         five_plus: 0
//       };
  
//       var mag_level;

//       for (var i = 0; i < features.length; i++) {
//         var earthquake_data = features[i].properties
//         var earthquake_geo = features[i].geometry.coordinates

//         if (earthquake_data.mag<1){
//         mag_level = "0-1";
//         }
//         if (earthquake_data.mag<2){
//         mag_level = "1-2";
//         }
//         if (earthquake_data.mag<3){
//           mag_level = "2-3";
//         }
//         if (earthquake_data.mag<4){
//           mag_level = "3-4";
//         }
//         if (earthquake_data.mag<5){
//           mag_level = "4-5";
//         }
//         if (earthquake_data.mag<6){
//           mag_level = "5+";
//         }
//       }

//       quakeCount[mag_level]++;

//       var newMarker = L.marker([earthquake_geo[0], earthquake_geo[0]], {
//         icon: circles[mag_level]
//       });

//       newMarker.addTo(layers[mag_level]);
      
//       newMarker.bindPopup(earthquake_data.place + "<br> Time: " + earthquake_data.time + "<br>" + earthquake_data.mag + " was the magnitude");
//     },
//     updateLegend(updatedAt, stationCount));
  
  
//   function updateLegend(time, stationCount) {
//     document.querySelector(".legend").innerHTML = [
//       "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
//       "<p class='out-of-order'>Out of Order Stations: " + stationCount.OUT_OF_ORDER + "</p>",
//       "<p class='coming-soon'>Stations Coming Soon: " + stationCount.COMING_SOON + "</p>",
//       "<p class='empty'>Empty Stations: " + stationCount.EMPTY + "</p>",
//       "<p class='low'>Low Stations: " + stationCount.LOW + "</p>",
//       "<p class='healthy'>Healthy Stations: " + stationCount.NORMAL + "</p>"
//     ].join("");
  
// };

// var earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

// d3.json(earthquake_url, function(data) {
//   createFeatures(data.features);
// });
// console.log(data.features);
// function createFeatures(earthquakeData) {
//   function onEachFeature(feature, layer) {
//     layer.bindPopup("<h3>" + feature.properties.place +
//       "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
//   }
//   var earthquakes = L.geoJSON(earthquakeData, {
    
//     onEachFeature: onEachFeature
//   });
//   createMap(earthquakes);
// }

// function createMap(earthquakes) {


//   var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.light",
//     accessToken: API_KEY
//   });

//   // Define a baseMaps object to hold our base layers
//   var baseMaps = {
//     "Light Map": lightmap
//   };

//   // Create overlay object to hold our overlay layer
//   var overlayMaps = {
//     Earthquakes: earthquakes
//   };

//   // Create our map, giving it the lightmap and earthquakes layers to display on load
//   var myMap = L.map("wicked_map", {
//     center: [
//       37.09, -95.71
//     ],
//     zoom: 5,
//     layers: [lightmap, earthquakes]
//   });
// }
