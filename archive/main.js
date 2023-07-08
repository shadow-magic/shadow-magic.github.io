// Initialize image map
let currentMap;
let layer;
function deleteSelectedAreaAndTimer() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    if (countdownOverlay) {
        map.removeLayer(countdownOverlay);
        countdownOverlay = null;
    }

    drawnItems.clearLayers();
}
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
        featureGroup: drawnItems,
        edit: true,
        remove: true
    }
});
//map.addControl(drawControl);
map.on('draw:created', function (e) {
    layer = e.layer;
    layer.setStyle({ color: 'white', fillOpacity: 0.75 });
    drawnItems.addLayer(layer);
    layer.options.className = 'selected-area';
    saveDrawnLayersToCookie(drawnItems);
    CountdownTimer();
    // Perform actions with the selected area, e.g., get its coordinates for cookie
    var latLngs = layer.getLatLngs();
    //console.log(latLngs);
});
// map.on('draw:edited', function (e) {
//     saveDrawnLayersToCookie(drawnItems);
// });

// map.on('draw:deleted', function (e) {
//     saveDrawnLayersToCookie(drawnItems);
// });