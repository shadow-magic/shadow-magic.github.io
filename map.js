//draws original layers if cookies exist. calls countdownOverlay()
let map = L.map('map', {
    crs: L.CRS.Simple
});
let timeToRespawnBox = document.getElementById('respawnHours');
let currentMap = 'teyvat.png';
const bounds = [[0, 0], [648, 790]];
const image = L.imageOverlay('maps/teyvat.png', bounds).addTo(map);
const drawnItems = new L.FeatureGroup().addTo(map);
const drawControl = new L.Control.Draw({
    draw: {
        polyline: false,
        polygon: true,
        circle: true,
        circlemarker: false,
        marker: false
    },
    edit: {
        featureGroup: drawnItems,
    }
});
map.fitBounds(bounds);
function switchMap(file) {

    currentMap = file;
    drawnItems.clearLayers();
    deleteTimers();
    const image = L.imageOverlay(`maps/${file}`, bounds).addTo(map);

}
function deleteTimers() {    // deletes timers
    for (let id in timers) {
        if (timers.hasOwnProperty(id)) {
            map.removeLayer(timers[id].tooltip);
            clearInterval(timers[id].interval);
            delete timers[id];
        }
    }
}
