let hours;
async function e() {
    const times = await fetch('times.json');
    const obj = await times.json();
    searchBar.addEventListener("input", () => { if (searchBar.value !== '') { search(obj); } else { emptiedSearch(); } });
    clearButton.addEventListener("click", () => { searchBar.value = ''; emptiedSearch(); });
    buttonContainer.addEventListener("click", (e) => { if (e.target.textContent !== currentMap) { buttonClicked(e); } });
    map.on('draw:created', (e) => {
        const layer = e.layer;
        drawnItems.addLayer(layer);
        timerOverlay(dateIn(hours), layer);
        saveCookie(hours, layer, currentMap);

    });
    /*
    map.on('draw:edited', function (event) {
        let layers = event.layers;
        layers.eachLayer(function (layer) {
            let id = layer._leaflet_id;
            timers[id].tooltip.setLatLng(layer.getBounds().getCenter());
        });
    });
    */
}
function buttonClicked(e) {
    hours = parseInt(e.target.getAttribute('hours'));
    switchMap(e.target.textContent, hours);
    map.addControl(drawControl);
    const cookieData = Cookies.get();
    if (Object.keys(cookieData).length !== 0) {//need to change this logic
        arrayOfArrays = getCookie(cookieData);
        for (array in arrayOfArrays) {
            [layer, cookieMap, futureDate] = arrayOfArrays[array];
            if (cookieMap == currentMap) {
                drawnItems.addLayer(layer);
                timerOverlay(futureDate, layer);
            }
        }
    }
}
function emptiedSearch() {
    switchMap('teyvat.png', '');
    buttonContainer.innerHTML = '';
    map.removeControl(drawControl);
    drawnItems.clearLayers();
    // deletes timers
    for (let id in timers) {
        if (timers.hasOwnProperty(id)) {
            map.removeLayer(timers[id].tooltip);
            clearInterval(timers[id].interval);
            delete timers[id];
        }
    }
}
e();
