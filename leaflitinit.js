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
//map.addControl(drawControl);
map.on('draw:created', function (e) {
    var layer = e.layer;
    drawnItems.addLayer(layer);
    drawnItems.clearLayers();
    layer.options.className = 'selected-area';
    startCountdownTimer();
    // Perform actions with the selected area, e.g., get its coordinates
    var latLngs = layer.getLatLngs();
    console.log(latLngs);
});

// Countdown timer logic
// Create a custom Leaflet control for the countdown timer
var countdownInterval;
var countdownElement = document.getElementById('countdown-timer');
var countdownSeconds = 60; // Adjust the countdown duration as needed

// Create a custom Leaflet overlay for the countdown timer
var CountdownOverlay = L.Layer.extend({
    onAdd: function (map) {
        this._map = map;
        this._container = L.DomUtil.create('div', 'countdown-overlay');
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
        }
    }
});

// Initialize the countdown overlay
var countdownOverlay;

map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    drawnItems.clearLayers();
    drawnItems.addLayer(layer);

    if (countdownOverlay) {
        map.removeLayer(countdownOverlay);
    }

    countdownOverlay = new CountdownOverlay();
    countdownOverlay._layer = layer;
    map.addLayer(countdownOverlay);
});

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
        countdownOverlay._updateTimer();
    } else {
        clearInterval(countdownInterval);
        countdownOverlay._updateTimer();
    }
}

// Set the initial countdown seconds
var countdownSeconds = 60;

// Define a function to delete the selected area and timer
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

