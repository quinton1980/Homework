var earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

d3.json(earthquake_url,(data) => {
    createFeatures(data.features)
});

function createFeatures(earthquake_data){

    function onEachFeature(feature, layer){
        layer.bindPopup("<h3>"+feature.properties.place+"</h3><hr></p>"+new Date(feature.properties.time)+"<hr></p>Magnitude: "+feature.properties.mag+"</p>")
    }

    var knarly_earthquakes = L.geoJSON(earthquake_data,{
        onEachFeature: onEachFeature
    });

    createMap(knarly_earthquakes);

    function createMap(earthquakes) {
    
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
    });
    
    var baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap
      };

      var overlayMaps = {
        Earthquakes: earthquakes
      };
        
      var my_map = L.map("wicked_map").setView([49.246292, -123.116226],4.5)

      L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(my_map);
    

    }
}