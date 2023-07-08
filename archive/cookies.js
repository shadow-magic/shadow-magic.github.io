// Function to save the drawn layers to a cookie
function saveDrawnLayersToCookie(drawnItems) {
    var drawnLayersData = drawnItems.toGeoJSON();
    var drawnLayersJSON = JSON.stringify(drawnLayersData);
    document.cookie = 'drawnLayers=' + drawnLayersJSON;

}

// Function to load the drawn layers from the cookie
function loadDrawnLayersFromCookie() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith('drawnLayers=')) {
            var drawnLayersJSON = cookie.substring('drawnLayers='.length);
            var drawnLayersData = JSON.parse(drawnLayersJSON);
            L.geoJSON(drawnLayersData).addTo(drawnItems);
            break;
        }
    }
}