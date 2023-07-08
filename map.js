//draws original layers if cookies exist. calls countdownOverlay()
let map = L.map('map', {
    crs: L.CRS.Simple
});
let currentMap;
const bounds = [[0, 0], [648, 790]];
const image = L.imageOverlay('maps/teyvat.png', bounds).addTo(map);
const drawnItems = new L.FeatureGroup().addTo(map);
const drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
    }
});
map.fitBounds(bounds);
function switchMap(file) {
    if (currentMap !== file) {
        currentMap = file;
        //switch map
        const image = L.imageOverlay(`maps/${file}`, bounds).addTo(map);
        //check for existing cookies. if they do, draw layers. pass countdowns to countdownOverlay

        //show respawn time at top right

    } else { }
}
