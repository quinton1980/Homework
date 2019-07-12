var lightmap = new L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}?" +
"access_token=pk.eyJ1IjoicXVpbnRvbjE5ODAiLCJhIjoiY2p3cjE0b2I2MWdrZTQ4bjM3OXVyZG1xMSJ9.MiTO8ooODM2yiraelPhVPA");

var myMap = new L.map("map", {
  center: [49.246292, -123.116226],
    zoom: 3.5,
  layers: [lightmap]
});

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", function(data) {
  function getStyle(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: chooseColor(feature.properties.mag),
      radius: getRadius(feature.properties.mag),
      weight: 0.5
    };
  }


var earthquakes = new L.LayerGroup();

function chooseColor(magnitude) {
  switch (true) {
  case magnitude>=5:
    return "yellow";
  case magnitude>=4:
    return "red";
  case magnitude>=3:
    return "orange";
  case magnitude>=2:
    return "green";
  case magnitude>=1:
    return "purple";
  default:
    return "black";
  }
}

function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 2.5;
}

var baseMaps = {
  Grayscale: lightmap
};

var overlayMaps = {
  "Earthquakes": earthquakes
};

// L.control
//   .layers(baseMaps, overlayMaps)
//   .addTo(map);
 


// L.geoJson(data, {
//   pointToLayer: function(feature, latlng) {
//     return L.circleMarker(latlng);
//   },
//   style: getStyle,
//   onEachFeature: function(feature, layer) {
//     layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
//   }
// })
});
