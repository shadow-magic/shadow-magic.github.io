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
        featureGroup: drawnItems
    }
});
//map.addControl(drawControl);
map.on('draw:created', function (e) {
    layer = e.layer;
    layer.setStyle({ color: 'white', fillOpacity: 0.75 });
    drawnItems.addLayer(layer);
    layer.options.className = 'selected-area';
    CountdownTimer();
    // Perform actions with the selected area, e.g., get its coordinates for cookie
    var latLngs = layer.getLatLngs();
    //console.log(latLngs);
});

// Countdown timer logic
// Create a custom Leaflet control for the countdown timer
var countdownInterval;
var countdownElement = document.getElementById('countdown-timer');
let countdownSeconds; // Adjust the countdown duration as needed
// Initialize the countdown overlay
var countdownOverlay;
async function CountdownTimer() {
    countdownSeconds = await fetchCategory(currentMap);
    // Create a custom Leaflet overlay for the countdown timer
    var CountdownOverlay = L.Layer.extend({
        onAdd: function (map) {
            this._map = map;
            this._container = L.DomUtil.create('div', 'center');
            this._updatePosition();
            this._map.getPanes().overlayPane.appendChild(this._container);
            this._updateTimer();
            this._timerInterval = setInterval(this._updateTimer.bind(this), 1000);
        },

        onRemove: function (map) {
            map.getPanes().overlayPane.removeChild(this._container);
            clearInterval(this._timerInterval);
        },

        _updatePosition: function () {
            var bounds = this._layer.getBounds();
            var topLeft = this._map.latLngToLayerPoint(bounds.getNorthWest());
            L.DomUtil.setPosition(this._container, topLeft);
        },

        _updateTimer: function () {
            if (countdownSeconds > 0) {
                this._container.textContent = 'Time Remaining: ' + countdownSeconds + 's';
            } else {
                this._container.textContent = 'Countdown Finished!';
                //deleteSelectedAreaAndTimer(); write logic to delete specific regions
            }
        }
    });

    if (countdownOverlay) {
        map.removeLayer(countdownOverlay);
    }

    countdownOverlay = new CountdownOverlay();
    countdownOverlay._layer = layer;
    map.addLayer(countdownOverlay);
    map.on('move', function () {
        if (countdownOverlay && countdownOverlay._map) {
            countdownOverlay._updatePosition();
        }
    });

    function startCountdownTimer() {
        countdownInterval = setInterval(updateCountdownTimer, 1000);
    }

    function updateCountdownTimer() {
        if (countdownSeconds > 0) {
            countdownSeconds--;
            if (countdownOverlay) { // Check if countdownOverlay is defined
                countdownOverlay._updateTimer();
            }
        } else {
            clearInterval(countdownInterval);
            if (countdownOverlay) { // Check if countdownOverlay is defined
                countdownOverlay._updateTimer();
            }
        }
    }
    startCountdownTimer();
}
async function fetchCategory(stringToFind) {
    try {
        const response = await fetch('times.json'); // Fetch the JSON data from the file
        const jsonData = await response.json(); // Parse the JSON data

        // Loop through each category in the JSON data
        for (const category in jsonData) {
            if (jsonData.hasOwnProperty(category)) {
                // Check if the string is present in the current category
                if (jsonData[category].includes(stringToFind)) {
                    return category; // Return the category if found
                }
            }
        }

        // Return null if the string is not found in any category
        return null;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
