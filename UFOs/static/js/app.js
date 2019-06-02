// from data.js
var tableData = data;

// Use D3 to select the table
var table = d3.select("table");

// Use D3 to select the table body
var tbody = d3.select("tbody");

data.forEach((ufoSighting) => {
    var row = tbody.append("tr");
    Object.entries(ufoSighting).forEach(([key, value]) => {
    var cell = row.append("td");
    cell.text(value);
    });
});

var button = d3.select("#filter-btn");
var inputField = d3.select("#datetime");


inputField.on("change", function() {
    var sightDate = d3.event.target.value;
    button.on("click", function() {
        function filterDate(sightingDate) {
            return sightingDate.datetime == sightDate;
          }
        var filteredTable = tableData.filter(filterDate);
        console.log(filteredTable);

        var table = d3.select("table");
        var tbody = d3.select("tbody");
        filteredTable.forEach((filteredSighting) => {
            var row = tbody.append("tr");
            Object.entries(filteredSighting).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
            });
        });

    });
  });