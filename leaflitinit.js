// List of image file names
const imageFiles = ['jueyun chili.png', 'sea ganoderma.png', 'shrine of depths.png', 'treasure hoarder.png']; // Will add these to a JSON later

// Initialize image map
var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -5
});
var bounds = [[0, 0], [648, 790]];
var image = L.imageOverlay('maps/teyvat.png', bounds).addTo(map);
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

