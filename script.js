var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -5
});
var bounds = [[0, 0], [1000, 1960]];
var image = L.imageOverlay('maps/map1.png', bounds).addTo(map);
map.fitBounds(bounds);


// Add the draw control to the map
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
    draw: {
        polygon: true,
        rectangle: true,
        circle: false, // You can enable other shapes if needed
        marker: false,
        polyline: false,
        circlemarker: false
    },
    edit: {
        featureGroup: drawnItems
    }
});
map.addControl(drawControl);

map.on('draw:created', function (e) {
    var layer = e.layer;
    drawnItems.addLayer(layer);
    // Perform actions with the selected area, e.g., get its coordinates
    var latLngs = layer.getLatLngs();
    console.log(latLngs);
});